import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCotacoesCards, getCotacaoItems, type CotacaoCard, type CotacaoItem } from '../../api/cotacoes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faFilter, faSort, faEnvelope, faFlag, faInfoCircle, faCheck, faTimes, faUpload, faEye, faMapMarkerAlt, faCalendarAlt, faBolt, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

// Helper para verificar se é "Novo" (menos de 30 dias)
// Formato esperado: "04/02/2026 12:24:21"
const isNew = (dateStr: string) => {
  try {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/');
    const date = new Date(`${year}-${month}-${day}T${timePart}`);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 30;
  } catch (e) {
    return false;
  }
};

const Quotes: React.FC = () => {
  const [allCotacoes, setAllCotacoes] = useState<CotacaoCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCotacoes, setSelectedCotacoes] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  
  // Estado para o Modal de Resposta Rápida
  const [quickReplyQuote, setQuickReplyQuote] = useState<CotacaoCard | null>(null);
  const [quoteItems, setQuoteItems] = useState<CotacaoItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [prices, setPrices] = useState<Record<number, string>>({});
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Filtros e Ordenação
  const [sortBy, setSortBy] = useState('data');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [visualizacao, setVisualizacao] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchId, setSearchId] = useState('');

  const navigate = useNavigate();

  // ID do fornecedor fixo conforme solicitado, idealmente viria do contexto de autenticação
  const ID_FORNECEDOR = 126; 
  const LIMIT = 30; // Itens por página

  const fetchCotacoes = async () => {
    setLoading(true);
    try {
      const response = await getCotacoesCards(ID_FORNECEDOR, { // Busca todos os itens
        sort_by: sortBy,
        sort_order: sortOrder,
        visualizacao: visualizacao,
        limit: 1000 // Garante que buscamos todos para filtrar no cliente
      });
      setAllCotacoes(response.items);
    } catch (error) {
      console.error("Erro ao carregar cotações", error);
    } finally {
      setLoading(false);
    }
  };

  // Busca os dados quando os filtros da API mudam
  useEffect(() => {
    fetchCotacoes();
  }, [sortBy, sortOrder, visualizacao]);

  useEffect(() => {
    setPage(1);
  }, [searchId, sortBy, sortOrder, visualizacao, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar busca por ID se a API suportar filtro por ID específico
    console.log("Buscar ID:", searchId);
  };

  const handleToggle = (id: number) => {
    setSelectedCotacoes(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleViewSelected = () => {
    if (selectedCotacoes.length > 0) {
      console.log("Navegando para detalhes das cotações:", selectedCotacoes);
      navigate(`/seller/quotes/details?ids=${selectedCotacoes.join(',')}`);
    }
  };

  const handleQuickReply = async (quote: CotacaoCard) => {
    setQuickReplyQuote(quote);
    setLoadingItems(true);
    setQuoteItems([]); // Limpa itens anteriores
    setPrices({});
    setValidationError(null);
    
    try {
      const items = await getCotacaoItems(quote.id_pacotinho);
      setQuoteItems(items);
    } catch (error) {
      console.error("Erro ao carregar itens", error);
    } finally {
      setLoadingItems(false);
    }
  };

  const handlePriceChange = (index: number, value: string) => {
    setPrices(prev => ({ ...prev, [index]: value }));
    if (validationError) setValidationError(null);
  };

  const handleSendReply = () => {
    const hasValidPrice = Object.values(prices).some(p => p && parseFloat(p) > 0);
    
    if (!hasValidPrice) {
        setValidationError("Por favor, preencha pelo menos um preço antes de enviar.");
        return;
    }

    alert("Funcionalidade de enviar resposta será implementada em breve!");
    setQuickReplyQuote(null);
  };

  // Filtro e paginação no lado do cliente
  const filteredCotacoes = useMemo(() => {
    let result: CotacaoCard[] = [];

    if (!searchId) {
      result = allCotacoes;
    } else {
      result = allCotacoes.filter(c =>
        c.id_pacotinho.toString().includes(searchId) ||
        c.Comprador.toLowerCase().includes(searchId.toLowerCase()) ||
        c.Resumo.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    if (statusFilter === 'respondidos') {
      result = result.filter(c => c.respondido_por_mim);
    } else if (statusFilter === 'nao_respondidos') {
      result = result.filter(c => !c.respondido_por_mim);
    }

    return result;
  }, [allCotacoes, searchId, statusFilter]);

  const paginatedCotacoes = useMemo(() => {
    return filteredCotacoes.slice(
      (page - 1) * LIMIT,
      page * LIMIT
    );
  }, [filteredCotacoes, page, LIMIT]);

  const totalPages = Math.ceil(filteredCotacoes.length / LIMIT);

  const isAllSelected = paginatedCotacoes.length > 0 && paginatedCotacoes.every(c => selectedCotacoes.includes(c.id_pacotinho));

  const handleToggleAll = () => {
    if (isAllSelected) {
      const pageIds = paginatedCotacoes.map(c => c.id_pacotinho);
      setSelectedCotacoes(prev => prev.filter(id => !pageIds.includes(id)));
    } else {
      const newIds = paginatedCotacoes.map(c => c.id_pacotinho);
      setSelectedCotacoes(prev => Array.from(new Set([...prev, ...newIds])));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cotações</h1>
          <nav className="flex text-sm text-gray-500 mt-1">
            <Link to="/seller" className="hover:text-blue-600 transition-colors flex items-center">
              <FontAwesomeIcon icon={faHome} className="mr-1" /> Sala de controle
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">Cotações</span>
          </nav>
        </div>
      </div>

      {/* Guidelines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Objetivo</h4>
            <p className="text-xs text-gray-500 mt-1">Entre em contato com Compradores e conheça suas necessidades.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="bg-green-50 p-2 rounded-lg text-green-600">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Dica</h4>
            <p className="text-xs text-gray-500 mt-1">Itens respondidos ficam <span className="font-bold text-green-600">verdes</span>. Clique na data para ver detalhes.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="bg-red-50 p-2 rounded-lg text-red-600">
            <FontAwesomeIcon icon={faFlag} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Atenção</h4>
            <p className="text-xs text-gray-500 mt-1">Bandeira vermelha indica itens de suas marcas de interesse.</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600">
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Novos Clientes</h4>
            <p className="text-xs text-gray-500 mt-1">Compradores destacados em <strong>negrito</strong> são novos.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Lista de Cotações</h2>
                <p className="text-sm text-gray-500">Finalizadas pelos compradores</p>
              </div>
              <div className="flex gap-2">
                <Link to="/excel/upload" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center shadow-sm">
                  <FontAwesomeIcon icon={faUpload} className="mr-2" /> Upload Excel
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 bg-gray-50 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  type="text"
                  placeholder="Pesquisar ID, Comprador, Resumo..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                >
                  <option value="data">Data</option>
                  <option value="comprador">Comprador</option>
                  <option value="localizacao">Localização</option>
                  <option value="resumo">Resumo</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                >
                  <option value="DESC">Desc</option>
                  <option value="ASC">Cresc</option>
                </select>
              </div>

              {/* Visualizacao */}
              <select
                value={visualizacao}
                onChange={(e) => setVisualizacao(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              >
                <option value="todos">Todas as Cotações</option>
                <option value="filtro">Região de Interesse</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
              >
                <option value="todos">Todos os Status</option>
                <option value="respondidos">Respondidos por mim</option>
                <option value="nao_respondidos">Não Respondidos</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4 border-b border-gray-100 w-10">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={isAllSelected}
                        onChange={handleToggleAll}
                      />
                    </th>
                    <th className="px-6 py-4 border-b border-gray-100">Entrada</th>
                    <th className="px-6 py-4 border-b border-gray-100">Comprador</th>
                    <th className="px-6 py-4 border-b border-gray-100 text-center">Resp.</th>
                    <th className="px-6 py-4 border-b border-gray-100">Localização</th>
                    <th className="px-6 py-4 border-b border-gray-100 text-right">Resumo</th>
                    <th className="px-6 py-4 border-b border-gray-100 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading && (
                    <tr><td colSpan={7} className="text-center p-8 text-gray-500">Carregando cotações...</td></tr>
                  )}
                  {!loading && paginatedCotacoes.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-red-500 font-medium">Nenhuma cotação em andamento</td>
                    </tr>
                  )}
                  {!loading && paginatedCotacoes.map((item) => {
                    const isItemNew = isNew(item.Entrada);
                    const rowClass = item.respondido_por_mim ? 'bg-green-50/60' : 'hover:bg-gray-50';
                    const textClass = isItemNew ? 'font-bold text-gray-900' : 'text-gray-600';
                    const badgeClass = item.Resp > 0 
                      ? "bg-green-100 text-green-800 border border-green-200" // Verde se tiver respostas
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"; // Amarelo se 0 respostas

                    return (
                      <tr key={item.id_pacotinho} className={`transition-colors ${rowClass}`}>
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            value={item.id_pacotinho} 
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedCotacoes.includes(item.id_pacotinho)}
                            onChange={() => handleToggle(item.id_pacotinho)}
                          />
                        </td>
                        <td className={`px-6 py-4 ${textClass}`}>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400 text-xs" />
                            {item.Entrada}
                          </div>
                        </td>
                        <td className={`px-6 py-4 ${textClass}`}>
                          {item.Comprador}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
                            title={`${item.Resp} respostas`}
                          >
                            {item.Resp} <FontAwesomeIcon icon={faEnvelope} className="ml-1" />
                          </div>
                        </td>
                        <td className={`px-6 py-4 ${textClass}`}>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />
                            {item.Localização}
                          </div>
                        </td>
                        <td className={`px-6 py-4 text-right ${textClass}`}>
                          {item.Resumo}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            {item.flag && <FontAwesomeIcon icon={faFlag} className="text-red-500 text-lg" title="Marca de interesse" />}
                            <button 
                              onClick={() => handleQuickReply(item)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
                              title="Responder Rápido"
                            >
                              <FontAwesomeIcon icon={faBolt} />
                            </button>
                            <Link 
                              to={`/seller/quotes/detail/${item.id_pacotinho}`}
                              className="text-gray-500 hover:text-blue-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                              title="Ver Detalhes"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <div className="p-4 border-t border-gray-100">
              <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={setPage} 
              />
            </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleViewSelected}
          disabled={selectedCotacoes.length === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faEye} className="mr-2" />
          Ver Cotações Selecionadas
        </button>
      </div>

      {/* Modal de Resposta Rápida */}
      {quickReplyQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Responder Cotação #{quickReplyQuote.id_pacotinho}</h3>
                <p className="text-sm text-gray-500 mt-1">{quickReplyQuote.Comprador}</p>
              </div>
              <button 
                onClick={() => setQuickReplyQuote(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>
            </div>
            
            {validationError && (
                <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                    <span>{validationError}</span>
                </div>
            )}

            <div className="p-6 overflow-y-auto flex-1">
              {loadingItems ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 rounded-l-lg">Item</th>
                      <th className="px-4 py-3">Qtd.</th>
                      <th className="px-4 py-3 rounded-r-lg text-right">Preço (R$)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quoteItems.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 font-medium text-gray-800">{item.ID_PECA_PEC}</td>
                        <td className="px-4 py-3">{item.NM_QUANTIDADE_PIP}</td>
                        <td className="px-4 py-3 text-right">
                          <input 
                            type="number" 
                            className="w-24 p-1 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 outline-none" 
                            placeholder="0,00" 
                            value={prices[idx] || ''}
                            onChange={(e) => handlePriceChange(idx, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                    {quoteItems.length === 0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-gray-500">Nenhum item encontrado.</td></tr>}
                  </tbody>
                </table>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
              <button 
                onClick={() => setQuickReplyQuote(null)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
                onClick={handleSendReply}
              >
                Enviar Resposta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center flex-wrap gap-1">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm font-semibold text-slate-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">&lt;</button>
      {pageNumbers.map((number, index) => (
        number === '...' ? <span key={`dots-${index}`} className="px-2 py-1 text-sm text-slate-500">...</span> : <button key={number} onClick={() => onPageChange(number as number)} className={`px-3 py-1 text-sm font-semibold rounded-lg shadow-sm ${currentPage === number ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border border-gray-200 hover:bg-gray-50'}`}>{number}</button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-sm font-semibold text-slate-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
    </div>
  );
}

export default Quotes;
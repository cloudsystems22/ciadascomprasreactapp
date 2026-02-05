import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowLeft, faFlag, faCheckCircle, faCalendarAlt, faMapMarkerAlt, faEnvelope, faBolt, faTimes, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { getCotacoesCards, getCotacaoItems, type CotacaoCard, type CotacaoItem } from '../../api/cotacoes';

const QuoteDetails: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [quoteIds, setQuoteIds] = useState<number[]>([]);
    const [quoteDetails, setQuoteDetails] = useState<CotacaoCard[]>([]);
    const [loading, setLoading] = useState(true);

    // Estado para o Modal de Resposta Rápida
    const [quickReplyQuote, setQuickReplyQuote] = useState<CotacaoCard | null>(null);
    const [quoteItems, setQuoteItems] = useState<CotacaoItem[]>([]);
    const [loadingItems, setLoadingItems] = useState(false);
    const [prices, setPrices] = useState<Record<number, string>>({});
    const [validationError, setValidationError] = useState<string | null>(null);

    // ID do fornecedor fixo conforme solicitado
    const ID_FORNECEDOR = 126;

    useEffect(() => {
        const idsParam = searchParams.get('ids');
        if (idsParam) {
            const ids = idsParam.split(',').map(id => parseInt(id, 10));
            setQuoteIds(ids);

            const fetchDetails = async () => {
                setLoading(true);
                try {
                    // Busca os detalhes das cotações usando a API real
                    // Passando ids como parâmetro para filtrar
                    const response: any = await getCotacoesCards(ID_FORNECEDOR, { ids: idsParam } as any);
                    
                    // Verifica se o retorno está em 'data' (conforme exemplo JSON) ou 'items' (padrão do Quotes.tsx)
                    const data = response.data || response.items || [];
                    setQuoteDetails(data);
                } catch (error) {
                    console.error("Erro ao buscar detalhes das cotações", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDetails();
        } else {
            setLoading(false);
        }
    }, [searchParams]);

    const handleQuickReply = async (quote: CotacaoCard) => {
        setQuickReplyQuote(quote);
        setLoadingItems(true);
        setQuoteItems([]); 
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

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Detalhes das Cotações Selecionadas</h1>
                <nav className="flex text-sm text-gray-500 mt-1">
                    <Link to="/seller" className="hover:text-blue-600 transition-colors flex items-center">
                        <FontAwesomeIcon icon={faHome} className="mr-1" /> Sala de controle
                    </Link>
                    <span className="mx-2">/</span>
                    <Link to="/seller/quotes" className="hover:text-blue-600 transition-colors">
                        Cotações
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-medium">Detalhes</span>
                </nav>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-800">
                        Cotações Selecionadas ({quoteIds.length})
                    </h2>
                    <Link to="/seller/quotes" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center shadow-sm">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Voltar
                    </Link>
                </div>

                {loading && (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {!loading && quoteDetails.length === 0 && (
                    <p className="text-center text-red-500 py-8">Nenhuma cotação encontrada para os IDs fornecidos.</p>
                )}

                {!loading && (
                    <div className="space-y-4">
                        {quoteDetails.map(detail => (
                            <div key={detail.id_pacotinho} className={`p-5 border rounded-lg transition-colors ${detail.respondido_por_mim ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-bold text-lg text-blue-600">#{detail.id_pacotinho}</h3>
                                            {detail.flag && (
                                                <span className="text-red-500" title="Marca de interesse">
                                                    <FontAwesomeIcon icon={faFlag} />
                                                </span>
                                            )}
                                            {detail.respondido_por_mim && (
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full border border-green-200 flex items-center">
                                                    <FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Respondido
                                                </span>
                                            )}
                                        </div>
                                        
                                        <p className="text-gray-800 font-medium mb-1">{detail.Comprador}</p>
                                        
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />
                                                {detail.Entrada}
                                            </div>
                                            <div className="flex items-center">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />
                                                {detail.Localização}
                                            </div>
                                        </div>

                                        {detail.Resumo && (
                                            <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700 border border-gray-100">
                                                <span className="font-semibold text-gray-500 text-xs uppercase block mb-1">Resumo</span>
                                                {detail.Resumo}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end justify-between min-w-[100px]">
                                        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${detail.Resp > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            <span className="mr-2">{detail.Resp}</span>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>
                                        <button 
                                            onClick={() => handleQuickReply(detail)}
                                            className="mt-2 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-blue-50"
                                            title="Responder Rápido"
                                        >
                                            <FontAwesomeIcon icon={faBolt} size="lg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default QuoteDetails;
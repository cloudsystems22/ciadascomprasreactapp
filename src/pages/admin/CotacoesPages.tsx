import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown, faSearch, faTrash, faCheck, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { getCotacoes } from "../../api/cotacoes";

interface Cotacao {
  id: number;
  data: string;
  lojista: string;
  respostas: number;
  status: 'Em andamento' | 'Finalizado' | 'Apagado';
  resumo: string;
}

export default function CotacoesPages() {
  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Cotacao; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Carregar dados da API
  useEffect(() => {
    const fetchCotacoes = async () => {
      setLoading(true);
      try {
        const data = await getCotacoes({
          page: currentPage,
          limit: itemsPerPage,
          expand: 'lojista'
        });

        // Mapeamento dos dados da API para o formato da interface Cotacao
        const mappedData: Cotacao[] = data.items.map((item: any) => {
          // Formatar data de YYYY-MM-DD HH:mm:ss para DD/MM/YYYY HH:mm:ss
          let dataFormatada = item.DT_ENTRADA_PCT;
          if (dataFormatada && typeof dataFormatada === 'string') {
             const [datePart, timePart] = dataFormatada.split(' ');
             if (datePart && timePart) {
                 const [year, month, day] = datePart.split('-');
                 dataFormatada = `${day}/${month}/${year} ${timePart}`;
             }
          }

          return {
            id: item.ID_PACOTINHO_PCT,
            data: dataFormatada || '',
            lojista: item.NM_NOME_CLI || 'Lojista Desconhecido',
            respostas: 0, // Campo não presente no JSON de exemplo
            status: item.FL_STATUS_PCT === 1 ? 'Em andamento' : 'Finalizado',
            resumo: item.ST_NOME_PCT || ''
          };
        });

        setCotacoes(mappedData);
        setTotalItems(data.totalCount);
      } catch (error) {
        console.error("Erro ao carregar cotações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCotacoes();
  }, [currentPage]); // Recarrega quando a página muda
  
  const handleSort = (key: keyof Cotacao) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return cotacoes.filter((item) => {
        const matchesSearch = 
        item.lojista.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.resumo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().includes(searchTerm);
        const matchesStatus = statusFilter ? item.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });
  }, [cotacoes, searchTerm, statusFilter]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aValue: any = a[sortConfig.key];
      let bValue: any = b[sortConfig.key];

      // Tratamento especial para data (DD/MM/YYYY HH:mm:ss)
      if (sortConfig.key === 'data') {
         const parseDate = (d: string) => {
             const [date, time] = d.split(' ');
             const [day, month, year] = date.split('/');
             return new Date(`${year}-${month}-${day}T${time}`).getTime();
         }
         aValue = parseDate(a.data);
         bValue = parseDate(b.data);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const getSortIcon = (key: keyof Cotacao) => {
    if (!sortConfig || sortConfig.key !== key) {
      return faSort;
    }
    return sortConfig.direction === 'asc' ? faSortUp : faSortDown;
  };

  // Reset page to 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const paginatedData = useMemo(() => {
    return sortedData;
  }, [sortedData]);

  const isAllPageSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.includes(item.id));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelected = new Set(selectedIds);
      paginatedData.forEach(item => newSelected.add(item.id));
      setSelectedIds(Array.from(newSelected));
    } else {
      const newSelected = selectedIds.filter(id => !paginatedData.find(item => item.id === id));
      setSelectedIds(newSelected);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const exportToCSV = () => {
    const headers = ["ID", "Data", "Lojista", "Respostas", "Status", "Resumo"];
    const csvContent = [
      headers.join(","),
      ...sortedData.map(item => 
        [
          item.id,
          `"${item.data}"`,
          `"${item.lojista.replace(/"/g, '""')}"`,
          item.respostas,
          `"${item.status}"`,
          `"${item.resumo.replace(/"/g, '""')}"`
        ].join(",")
      )
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "cotacoes.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap -mx-3">
        <div className="flex-none w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
            <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
              <div className="flex flex-wrap justify-between items-center">
                <h6 className="text-xl font-bold text-slate-700 mb-4 sm:mb-0">Administração das Cotações</h6>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                    <select
                      className="pl-3 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">Todos os Status</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="Apagado">Apagado</option>
                    </select>
                  </div>
                  <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                    <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input
                      type="text"
                      className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                      placeholder="Pesquisar lojista, resumo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={exportToCSV}
                    className="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center whitespace-nowrap"
                  >
                    <FontAwesomeIcon icon={faFileCsv} className="mr-2" /> CSV
                  </button>
                </div>
              </div>
              {selectedIds.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg flex flex-wrap items-center justify-between gap-4 border border-gray-200">
                  <span className="text-sm font-semibold text-slate-700">{selectedIds.length} item(s) selecionado(s)</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors shadow-sm" onClick={() => alert(`Excluir itens: ${selectedIds.join(', ')}`)}>
                      <FontAwesomeIcon icon={faTrash} className="mr-1" /> Apagar
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors shadow-sm" onClick={() => alert(`Finalizar itens: ${selectedIds.join(', ')}`)}>
                      <FontAwesomeIcon icon={faCheck} className="mr-1" /> Finalizar
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        <input type="checkbox" checked={isAllPageSelected} onChange={handleSelectAll} className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                      </th>
                      <th onClick={() => handleSort('data')} className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 cursor-pointer hover:opacity-100">Entrada <FontAwesomeIcon icon={getSortIcon('data')} className="ml-1" /></th>
                      <th onClick={() => handleSort('lojista')} className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 cursor-pointer hover:opacity-100">Lojista <FontAwesomeIcon icon={getSortIcon('lojista')} className="ml-1" /></th>
                      <th onClick={() => handleSort('respostas')} className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 cursor-pointer hover:opacity-100">Res. <FontAwesomeIcon icon={getSortIcon('respostas')} className="ml-1" /></th>
                      <th onClick={() => handleSort('status')} className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 cursor-pointer hover:opacity-100">Status <FontAwesomeIcon icon={getSortIcon('status')} className="ml-1" /></th>
                      <th onClick={() => handleSort('resumo')} className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70 cursor-pointer hover:opacity-100">Resumo <FontAwesomeIcon icon={getSortIcon('resumo')} className="ml-1" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((cotacao) => (
                      <tr key={cotacao.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(cotacao.id) ? 'bg-blue-50/50' : ''}`}>
                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.includes(cotacao.id)} 
                            onChange={() => handleSelectRow(cotacao.id)}
                            className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 text-sm leading-normal text-slate-700">{cotacao.data.split(' ')[0]}</h6>
                              <p className="mb-0 text-xs leading-tight text-slate-400">{cotacao.data.split(' ')[1]}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b shadow-transparent">
                          <p className="mb-0 text-sm font-semibold leading-tight text-slate-600">{cotacao.lojista}</p>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight text-slate-400">{cotacao.respostas}</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <StatusBadge status={cotacao.status} />
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b shadow-transparent">
                          <span className="text-xs font-semibold leading-tight text-slate-400">{cotacao.resumo}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="flex justify-center items-center mt-4 p-4 flex-wrap gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm font-semibold text-slate-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </button>
      {pageNumbers.map((number, index) => (
        number === '...' ? (
          <span key={`dots-${index}`} className="px-2 py-1 text-sm text-slate-500">...</span>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number as number)}
            className={`px-3 py-1 text-sm font-semibold rounded-lg shadow-sm ${
              currentPage === number
                ? 'bg-gradient-to-tl from-blue-600 to-cyan-400 text-white'
                : 'bg-white text-slate-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {number}
          </button>
        )
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm font-semibold text-slate-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </div>
  );
}

function StatusBadge({ status }: { status: Cotacao['status'] }) {
  let colorClasses = "";

  switch (status) {
    case "Finalizado":
      colorClasses = "bg-gradient-to-tl from-green-600 to-lime-400";
      break;
    case "Em andamento":
      colorClasses = "bg-gradient-to-tl from-blue-600 to-cyan-400";
      break;
    case "Apagado":
      colorClasses = "bg-gradient-to-tl from-slate-600 to-slate-300";
      break;
    default:
      colorClasses = "bg-gradient-to-tl from-gray-400 to-gray-200";
  }

  return (
    <span className={`${colorClasses} px-2.5 text-xs rounded-md py-1.5 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}>
      {status}
    </span>
  );
}
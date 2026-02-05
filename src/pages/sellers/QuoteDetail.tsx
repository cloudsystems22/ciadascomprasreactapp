import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome, faArrowLeft, faPrint, faDownload, faInfoCircle, 
    faCheck, faFlag, faCalendarAlt, faExclamationTriangle, 
    faSave, faCreditCard, faTimes, faLightbulb, faEdit, faFileExcel, faFileCsv
} from "@fortawesome/free-solid-svg-icons";
import { getCotacaoItems, getCotacaoDetail, type CotacaoItem, type CotacaoDetail } from '../../api/cotacoes';

// Componente para renderizar o formulário de uma única cotação
const QuoteResponseForm: React.FC<{ id: number }> = ({ id }) => {
    const [detail, setDetail] = useState<CotacaoDetail | null>(null);
    const [items, setItems] = useState<CotacaoItem[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Estados do formulário
    const [prices, setPrices] = useState<Record<string, string>>({});
    const [brands, setBrands] = useState<Record<string, string>>({});
    const [validityDate, setValidityDate] = useState("");
    const [observation, setObservation] = useState("");
    const [ciapagDiscount, setCiapagDiscount] = useState("");
    const [validationMsg, setValidationMsg] = useState<{msg: string, type: 'error' | 'success'} | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [detailData, itemsData] = await Promise.all([
                    getCotacaoDetail(id),
                    getCotacaoItems(id)
                ]);
                setDetail(detailData);
                setItems(itemsData);
                
                // Inicializar estados se houver dados prévios (mockado aqui como vazio/zeros)
                const initialPrices: Record<string, string> = {};
                const initialBrands: Record<string, string> = {};
                
                itemsData.forEach(item => {
                    initialPrices[item.ID_PECA_PEC] = item.VL_VALOR_PROPOSTO ? item.VL_VALOR_PROPOSTO.toString() : "0.00";
                    initialBrands[item.ID_PECA_PEC] = item.MARCA || "";
                });
                
                setPrices(initialPrices);
                setBrands(initialBrands);
                
            } catch (error) {
                console.error("Erro ao carregar detalhes da cotação", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleBrandSelect = (itemId: string, selectedBrand: string) => {
        if (selectedBrand) {
            setBrands(prev => ({ ...prev, [itemId]: selectedBrand }));
        }
    };

    const handlePriceChange = (itemId: string, value: string) => {
        // Permite apenas números e vírgula/ponto
        if (/^[\d.,]*$/.test(value)) {
            setPrices(prev => ({ ...prev, [itemId]: value }));
        }
    };

    const validateDate = () => {
        if (!validityDate) {
            setValidationMsg({ msg: "A data inserida não é válida.", type: 'error' });
            return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Assumindo input type="date" que retorna YYYY-MM-DD
        const [year, month, day] = validityDate.split('-').map(Number);
        const selectedDate = new Date(year, month - 1, day);

        if (selectedDate < today) {
            setValidationMsg({ msg: "A data de validade não pode ser anterior a hoje.", type: 'error' });
            return false;
        }

        setValidationMsg({ msg: "Data válida.", type: 'success' });
        return true;
    };

    const handleSubmit = () => {
        if (!validateDate()) return;

        // Lógica de envio aqui
        alert(`Cotação ${id} enviada com sucesso!`);
    };

    const handleSaveDraft = () => {
        alert(`Rascunho da cotação ${id} salvo com sucesso!`);
    };

    if (loading) {
        return <div className="p-8 text-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div></div>;
    }

    if (!detail) return <div className="p-4 text-red-500">Erro ao carregar cotação.</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden print:shadow-none print:border-0 print:mb-0 print:break-inside-avoid">
            {/* Cabeçalho da Cotação */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 print:bg-white print:border-b-2 print:border-black print:p-0 print:pb-4">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-shrink-0">
                        {detail.logo ? (
                            <img src={detail.logo} alt="Logo Comprador" className="w-16 h-16 object-contain border border-gray-200 rounded bg-white" />
                        ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 border border-gray-300">
                                <span className="text-xs text-center">Sem Logo</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-800">Cotação: #{detail.id_pacotinho}</h2>
                        <p className="text-gray-600">Comprador: <span className="font-semibold">{detail.comprador}</span></p>
                        <p className="text-gray-600">CNPJ: <span className="font-semibold">{detail.cnpj}</span></p>
                    </div>
                    
                    {/* Menu de Ações no Topo do Card */}
                    <div className="flex flex-wrap gap-2 items-start print:hidden">
                        <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center shadow-sm transition-colors">
                            <FontAwesomeIcon icon={faFileCsv} className="mr-2 text-green-600" /> CSV
                        </button>
                        <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center shadow-sm transition-colors">
                            <FontAwesomeIcon icon={faFileExcel} className="mr-2 text-green-600" /> XLS
                        </button>
                        <button 
                            onClick={() => window.print()} 
                            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center shadow-sm transition-colors"
                        >
                            <FontAwesomeIcon icon={faPrint} className="mr-2 text-gray-500" /> Imprimir
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid de Informações (Downloads e Requisitos lado a lado) */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 print:p-0 print:block">
                {/* Downloads Info */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 h-full print:hidden">
                    <div className="flex items-center gap-2 mb-2 font-bold text-blue-700">
                        <FontAwesomeIcon icon={faDownload} /> Download e Upload
                    </div>
                    <p className="mb-2">Deseja fazer o download desta lista em um arquivo do Excel para ser preenchido offline? <a href="#" className="font-bold underline">Clique aqui!</a></p>
                    <p className="text-xs opacity-80">Lembre-se: ao colocar os seus preços não mude o nome do arquivo. Você deverá enviar esse arquivo através do link na página de Cotações.</p>
                </div>

                {/* Requisitos */}
                <div className="print:mt-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 print:text-base">Requisitos para a Compra</h3>
                    <div className="text-center p-4 bg-red-50 border border-red-100 rounded-lg h-full print:bg-white print:border-red-500 print:border-2 print:p-2">
                        <p className="text-red-700 font-bold mb-2">{detail.requisitos}</p>
                        <p className="text-red-700 font-bold">
                            Data e Hora de Encerramento: {detail.data_fim} - {detail.hora_fim}
                        </p>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2">
                        Os requisitos para a compra são de responsabilidade do Comprador, e variam de cotação para cotação.
                    </p>
                </div>
            </div>

            {/* Tabela de Itens */}
            <div className="overflow-x-auto border-t border-gray-100 print:border-t-2 print:border-black">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 w-16">Qtd</th>
                            <th className="px-4 py-3">Peça</th>
                            <th className="px-4 py-3 w-32 text-center">Valor Unitário</th>
                            <th className="px-4 py-3 w-40 text-center">Marca/Obs</th>
                            <th className="px-4 py-3 w-48 text-right">Selecionar Marca</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-center font-medium">{item.NM_QUANTIDADE_PIP}</td>
                                <td className="px-4 py-3">
                                    <div className="font-medium text-gray-800">{item.ID_PECA_PEC}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <input 
                                        type="text" 
                                        className="w-full p-2 border border-gray-300 rounded text-right focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={prices[item.ID_PECA_PEC] || ""}
                                        onChange={(e) => handlePriceChange(item.ID_PECA_PEC, e.target.value)}
                                        placeholder="0,00"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input 
                                        type="text" 
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={brands[item.ID_PECA_PEC] || ""}
                                        onChange={(e) => setBrands(prev => ({ ...prev, [item.ID_PECA_PEC]: e.target.value }))}
                                    />
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        onChange={(e) => handleBrandSelect(item.ID_PECA_PEC, e.target.value)}
                                        value=""
                                    >
                                        <option value="">(Escolha um fabricante)</option>
                                        {detail.marcas_disponiveis.map(marca => (
                                            <option key={marca} value={marca}>{marca}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rodapé do Formulário */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-6 print:bg-white print:p-0 print:mt-4">
                
                {/* Termo de Aceite */}
                <div className="bg-red-500 text-white p-4 rounded-lg flex items-start gap-3 shadow-sm">
                    <FontAwesomeIcon icon={faInfoCircle} className="mt-1" />
                    <p className="font-bold text-sm">
                        Li e conheço os requisitos para compra estipulados pelo comprador e posso garantir os preços acima até o prazo determinado abaixo:
                    </p>
                </div>

                {/* CiaPag */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm print:border-0 print:p-0">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                            <FontAwesomeIcon icon={faCreditCard} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">CiaPag - Pagamento Facilitado</h4>
                            <p className="text-sm text-gray-600 mt-1">
                                Ofereça um desconto (%) e incentive seu cliente a usar o CiaPag. Receba suas vendas em até dois dias úteis.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">Desconto (%):</label>
                        <input 
                            type="text" 
                            className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="0,0%"
                            value={ciapagDiscount}
                            onChange={(e) => setCiapagDiscount(e.target.value)}
                        />
                    </div>
                </div>

                {/* Validade e Observação */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Data de validade destes preços:
                        </label>
                        <input 
                            type="date" 
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            value={validityDate}
                            onChange={(e) => {
                                setValidityDate(e.target.value);
                                setValidationMsg(null);
                            }}
                        />
                        {validationMsg && (
                            <p className={`text-sm mt-1 font-medium ${validationMsg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                {validationMsg.msg}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Observação para o Comprador:
                        </label>
                        <textarea 
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                            maxLength={500}
                            value={observation}
                            onChange={(e) => setObservation(e.target.value)}
                        ></textarea>
                        <p className="text-xs text-gray-500 text-right mt-1">
                            Restam {500 - observation.length} caracteres
                        </p>
                    </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end pt-4 gap-3 print:hidden">
                    <button 
                        onClick={handleSaveDraft}
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center"
                    >
                        <FontAwesomeIcon icon={faSave} className="mr-2 text-gray-500" />
                        Salvar Rascunho
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center"
                    >
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        Inserir Cotação
                    </button>
                </div>
            </div>
        </div>
    );
};

const QuoteDetails: React.FC = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const idsParam = searchParams.get('ids');
    
    let quoteIds: number[] = [];
    if (id) {
        quoteIds = [parseInt(id, 10)];
    } else if (idsParam) {
        quoteIds = idsParam.split(',').map(id => parseInt(id, 10));
    }

    const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans print:bg-white print:p-0">
            {/* Header Principal - Hide on print */}
            <div className="mb-8 print:hidden">
                <h1 className="text-2xl font-bold text-gray-800">Controle de Cotações</h1>
                <nav className="flex text-sm text-gray-500 mt-1">
                    <Link to="/seller" className="hover:text-blue-600 transition-colors flex items-center">
                        <FontAwesomeIcon icon={faHome} className="mr-1" /> Sala de controle
                    </Link>
                    <span className="mx-2">/</span>
                    <Link to="/seller/quotes" className="hover:text-blue-600 transition-colors">
                        Cotações
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-medium">Inserir cotação</span>
                </nav>
            </div>

            {/* Top Actions - Hide on print */}
            <div className="mb-6 print:hidden">
                <button onClick={() => navigate('/seller/quotes')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center shadow-sm w-fit">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Voltar para Cotações
                </button>
            </div>

            {/* Guidelines Grid - Top placement to save side space */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 print:hidden">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-2 font-bold text-blue-700">
                        <FontAwesomeIcon icon={faInfoCircle} /> Orientações
                    </div>
                    <p>Digite os valores de cada peça, selecione ou digite a MARCA/OBS e coloque a data de validade desses preços.</p>
                </div>

                <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-sm text-green-800 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-2 font-bold text-green-700">
                        <FontAwesomeIcon icon={faSave} /> Envio
                    </div>
                    <p>Ao pressionar 'Inserir' os preços serão enviados ao Comprador imediatamente.</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-sm text-yellow-800 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-2 font-bold text-yellow-700">
                        <FontAwesomeIcon icon={faLightbulb} /> Dica
                    </div>
                    <p>Digite 0 (zero) para apagar um preço caso não tenha a peça disponível.</p>
                </div>

                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl text-sm text-purple-800 shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 mb-2 font-bold text-purple-700">
                        <FontAwesomeIcon icon={faEdit} /> Edição
                    </div>
                    <p>Você poderá voltar e alterar estes valores enquanto esta cotação estiver ativa.</p>
                </div>
            </div>

            <div className="w-full">
                {/* Conteúdo Principal */}
                <main className="w-full">
                    <div className="flex items-center gap-2 mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Inserir <span className="text-blue-600">Cotação</span></h3>
                    </div>

                    {quoteIds.length === 0 ? (
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
                            Nenhuma cotação selecionada.
                            <br />
                            <Link to="/seller/quotes" className="text-blue-600 hover:underline mt-2 inline-block">Voltar para lista</Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {quoteIds.map(id => (
                                <QuoteResponseForm key={id} id={id} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default QuoteDetails;

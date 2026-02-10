import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHome, faArrowLeft, faPrint, faInfoCircle, 
    faCheck, faFlag, faCalendarAlt, faExclamationTriangle, 
    faSave, faCreditCard, faTimes, faLightbulb, faEdit, faFileExcel, faFileCsv, faEye, faTrash, faPaperPlane, faUser, faUserTie
} from "@fortawesome/free-solid-svg-icons";
import { 
    getCotacaoItems, getCotacaoDetail, getMensagensCotacao, createMensagemCotacao, updateMensagemCotacao, deleteMensagemCotacao,
    type CotacaoItem, type CotacaoDetail, type MensagemCotacao 
} from '../../api/cotacoes';
import { ID_FORNECEDOR } from '../../auth/auth';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoImg from '../../assets/LogociaSite.png';
import DOMPurify from 'dompurify';
import * as XLSX from 'xlsx';

// Componente Toast para notificações
const Toast: React.FC<{ message: string, type: 'success' | 'error' | 'info', onClose: () => void }> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgClass = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    const icon = type === 'success' ? faCheck : type === 'error' ? faTimes : faInfoCircle;

    return (
        <div className={`fixed top-4 right-4 z-50 ${bgClass} text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 transition-all transform animate-fade-in-down border border-white/10`}>
            <FontAwesomeIcon icon={icon} className="text-lg" />
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100 transition-opacity">
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
};

// Componente Modal de Confirmação
const ConfirmModal: React.FC<{ message: string, onConfirm: () => void, onCancel: () => void }> = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-scale-in">
            <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-4">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Confirmação</h3>
                <p className="text-gray-500 mt-2">{message}</p>
            </div>
            <div className="flex gap-3 justify-center">
                <button onClick={onCancel} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">Cancelar</button>
                <button onClick={onConfirm} className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm">Confirmar</button>
            </div>
        </div>
    </div>
);

// Componente de Comentários
const QuoteComments: React.FC<{ quoteId: number, senderId: number, recipientId: number }> = ({ quoteId, senderId, recipientId }) => {
    const [messages, setMessages] = useState<MensagemCotacao[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    const [loading, setLoading] = useState(false);
    const [newlyFetchedIds, setNewlyFetchedIds] = useState<Set<number>>(new Set());

    const fetchMessages = async (isPolling = false) => {
        if (!isPolling) setLoading(true);
        try {
            const data = await getMensagensCotacao(quoteId, senderId, recipientId);

            if (isPolling && data.length > messages.length) {
                const currentIds = new Set(messages.map(m => m.id));
                const newIds = data.filter(m => !currentIds.has(m.id)).map(m => m.id);
                if (newIds.length > 0) {
                    setNewlyFetchedIds(new Set(newIds));
                    // Remove o destaque após alguns segundos
                    setTimeout(() => setNewlyFetchedIds(new Set()), 3000);
                }
            }
            setMessages(data);
        } catch (error) {
            console.error("Erro ao carregar mensagens", error);
        } finally {
            if (!isPolling) setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages(); // Fetch inicial
        const intervalId = setInterval(() => fetchMessages(true), 15000); // Polling a cada 15 segundos

        return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
    }, [quoteId, senderId, recipientId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        
        try {
            await createMensagemCotacao({
                id_cotacao: quoteId,
                id_pedido: null,
                id_remetente: senderId,
                id_destinatario: recipientId,
                mensagem: newMessage,
                data: today
            });
            setNewMessage("");
            fetchMessages();
        } catch (error) {
            console.error("Erro ao enviar mensagem", error);
            alert("Erro ao enviar mensagem.");
        }
    };

    const handleDeleteMessage = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja excluir esta mensagem?")) return;
        try {
            await deleteMensagemCotacao(id);
            fetchMessages();
        } catch (error) {
            console.error("Erro ao excluir mensagem", error);
        }
    };

    const startEdit = (msg: MensagemCotacao) => {
        setEditingId(msg.id);
        setEditText(msg.mensagem);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    const handleUpdateMessage = async (msg: MensagemCotacao) => {
        if (!editText.trim()) return;
        try {
            await updateMensagemCotacao(msg.id, {
                ...msg,
                mensagem: editText
            });
            setEditingId(null);
            fetchMessages();
        } catch (error) {
            console.error("Erro ao atualizar mensagem", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h3 id="comments-heading" className="text-lg font-bold text-gray-900">
                    Comentários / Observações
                </h3>
                <button onClick={() => fetchMessages(false)} className="text-xs text-blue-600 hover:underline">Atualizar</button>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto -mr-6 pr-6">
                {loading && messages.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Carregando...</p>}
                {!loading && messages.length === 0 && <p className="text-sm text-gray-400 text-center italic py-4">Nenhuma observação registrada.</p>}
                
                {messages.map(msg => {
                    const isSender = msg.id_remetente === senderId;
                    const isNew = newlyFetchedIds.has(msg.id);
                    return (
                    <div key={msg.id} className={`py-5 flex gap-4 transition-colors duration-1000 ${isNew ? 'bg-blue-50' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${isSender ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                            <FontAwesomeIcon icon={isSender ? faUserTie : faUser} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm text-gray-800">
                                    {isSender ? 'Você' : 'Comprador'}
                                </span>
                                <span className="text-xs text-gray-400">{new Date(msg.data).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
                            </div>
                        
                        {editingId === msg.id ? (
                            <div className="mt-2">
                                <textarea 
                                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    rows={3}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={cancelEdit} className="text-xs text-gray-500 hover:text-gray-700">Cancelar</button>
                                    <button onClick={() => handleUpdateMessage(msg)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">Salvar</button>
                                </div>
                            </div>
                        ) : (
                            <div 
                                className="text-sm text-gray-700 prose prose-sm max-w-none whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.mensagem) }}
                            >
                            </div>
                        )}

                        {isSender && editingId !== msg.id && (
                            <div className="flex items-center gap-4 mt-2">
                                <button onClick={() => startEdit(msg)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                    <FontAwesomeIcon icon={faEdit} /> Editar
                                </button>
                                <button onClick={() => handleDeleteMessage(msg.id)} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                                    <FontAwesomeIcon icon={faTrash} /> Excluir
                                </button>
                            </div>
                        )}
                        </div>
                    </div>
                )})}
            </div>

            <div className="pt-4 border-t border-gray-200 -mx-6 px-6 -mb-6 pb-6 bg-gray-50 rounded-b-xl mt-4">
                <div className="relative">
                    <textarea 
                        className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
                        placeholder="Digite uma observação ou mensagem..."
                        rows={2}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="absolute right-2 bottom-2 p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-300 transition-colors"
                        title="Enviar"
                    >
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">Pressione Enter para enviar</p>
            </div>
        </>
    );
};

// Componente para renderizar o formulário de uma única cotação
const QuoteResponseForm: React.FC<{ id: number, children?: React.ReactNode }> = ({ id, children }) => {
    const navigate = useNavigate();
    const [detail, setDetail] = useState<CotacaoDetail | null>(null);
    const [items, setItems] = useState<CotacaoItem[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Estados do formulário
    const [prices, setPrices] = useState<Record<string, string>>({});
    const [brands, setBrands] = useState<Record<string, string>>({});
    const [validityDate, setValidityDate] = useState("");
    const [ciapagDiscount, setCiapagDiscount] = useState("");
    const [validationMsg, setValidationMsg] = useState<{msg: string, type: 'error' | 'success'} | null>(null);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    
    // Estados para UI e Controle
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [showConfirmDiscard, setShowConfirmDiscard] = useState(false);
    
    // Ref para rastrear alterações para o auto-save
    const hasChangesRef = useRef(false);
    const stateRef = useRef({ prices, brands, validityDate, ciapagDiscount });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [detailData, itemsData] = await Promise.all([
                    getCotacaoDetail(id, ID_FORNECEDOR),
                    getCotacaoItems(id)
                ]);
                setDetail(detailData);
                setItems(itemsData);
                
                // Verificar se existe rascunho salvo
                const savedDraft = localStorage.getItem(`quote_draft_${id}`);
                if (savedDraft) {
                    const draft = JSON.parse(savedDraft);
                    setPrices(draft.prices || {});
                    setBrands(draft.brands || {});
                    setValidityDate(draft.validityDate || "");
                    setCiapagDiscount(draft.ciapagDiscount || "");
                    if (draft.updatedAt) {
                        const date = new Date(draft.updatedAt);
                        setLastSaved(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                    }
                } else {
                    // Inicializar estados se houver dados prévios (mockado aqui como vazio/zeros)
                    const initialPrices: Record<string, string> = {};
                    const initialBrands: Record<string, string> = {};
                    
                    itemsData.forEach(item => {
                        initialPrices[item.ID_PECA_PEC] = item.VL_VALOR_PROPOSTO ? item.VL_VALOR_PROPOSTO.toString() : "0.00";
                        initialBrands[item.ID_PECA_PEC] = item.MARCA || "";
                    });
                    
                    setPrices(initialPrices);
                    setBrands(initialBrands);
                }
                
            } catch (error) {
                console.error("Erro ao carregar detalhes da cotação", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    // Atualiza a ref do estado para o auto-save acessar os valores mais recentes
    useEffect(() => {
        stateRef.current = { prices, brands, validityDate, ciapagDiscount };
    }, [prices, brands, validityDate, ciapagDiscount]);

    // Auto-save a cada 30 segundos se houver alterações
    useEffect(() => {
        const interval = setInterval(() => {
            if (hasChangesRef.current) {
                handleSaveDraft(true); // true para salvar silenciosamente
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [id]);

    const markAsChanged = () => {
        hasChangesRef.current = true;
    };

    const handleBrandChange = (itemId: string, newBrand: string) => {
        setBrands(prev => ({ ...prev, [itemId]: newBrand }));
        markAsChanged();
    };
    const handlePriceChange = (itemId: string, value: string) => {
        // Permite apenas números e vírgula/ponto
        if (/^[\d.,]*$/.test(value)) {
            setPrices(prev => ({ ...prev, [itemId]: value }));
            markAsChanged();
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
        localStorage.removeItem(`quote_draft_${id}`); // Limpa o rascunho ao enviar
        hasChangesRef.current = false;
        setToast({ message: `Cotação ${id} enviada com sucesso!`, type: 'success' });
        // Em produção, aqui você redirecionaria ou atualizaria a lista
    };

    const handleSaveDraft = (silent = false) => {
        const now = new Date();
        // Usa os valores da ref para garantir que o auto-save pegue o estado atual dentro do intervalo
        const currentData = silent ? stateRef.current : { prices, brands, validityDate, ciapagDiscount };
        
        const draftData = {
            ...currentData,
            updatedAt: now.toISOString()
        };
        localStorage.setItem(`quote_draft_${id}`, JSON.stringify(draftData));
        setLastSaved(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        hasChangesRef.current = false;
        
        if (!silent) {
            setToast({ message: `Rascunho da cotação ${id} salvo com sucesso!`, type: 'success' });
        }
    };

    const confirmDiscardDraft = () => {
        localStorage.removeItem(`quote_draft_${id}`);
        setLastSaved(null);
        hasChangesRef.current = false;

        // Restaurar valores originais
        const initialPrices: Record<string, string> = {};
        const initialBrands: Record<string, string> = {};
        
        items.forEach(item => {
            initialPrices[item.ID_PECA_PEC] = item.VL_VALOR_PROPOSTO ? item.VL_VALOR_PROPOSTO.toString() : "0.00";
            initialBrands[item.ID_PECA_PEC] = item.MARCA || "";
        });
        
        setPrices(initialPrices);
        setBrands(initialBrands);
        setValidityDate("");
        setCiapagDiscount("");
        setShowConfirmDiscard(false);
        setToast({ message: "Rascunho descartado.", type: 'info' });
    };

    const generatePDF = (action: 'save' | 'view') => {
        if (!detail) return;

        const doc = new jsPDF();
        const img = new Image();
        img.src = logoImg;

        img.onload = () => {
            // Logo
            doc.addImage(img, 'PNG', 14, 10, 40, 12);

            // Título
            doc.setFontSize(18);
            doc.text(`Cotação #${detail.id_pacotinho}`, 14, 30);

            // Dados da Cotação
            doc.setFontSize(10);
            doc.text(`Comprador: ${detail.comprador}`, 14, 40);
            doc.text(`CNPJ: ${detail.cnpj}`, 14, 45);
            doc.text(`Encerramento: ${detail.data_fim} - ${detail.hora_fim}`, 14, 50);

            // Requisitos (com quebra de linha automática)
            const splitReq = doc.splitTextToSize(`Requisitos: ${detail.requisitos}`, 180);
            doc.text(splitReq, 14, 60);

            // Tabela de Itens
            const tableColumn = ["Qtd", "Peça", "Marca", "Valor Unitário"];
            const tableRows = items.map(item => [
                item.NM_QUANTIDADE_PIP,
                item.ID_PECA_PEC,
                "", // Em branco para preenchimento
                ""  // Em branco para preenchimento
            ]);

            // Calcula a posição Y inicial baseada no tamanho do texto dos requisitos
            const startY = 65 + (splitReq.length * 4);

            autoTable(doc, {
                startY: startY,
                head: [tableColumn],
                body: tableRows,
                theme: 'striped',
                headStyles: { fillColor: [41, 128, 185] },
                styles: { fontSize: 10, cellPadding: 3 },
                columnStyles: {
                    0: { cellWidth: 20, halign: 'center' },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 50 },
                    3: { cellWidth: 40 }
                }
            });

            if (action === 'view') {
                window.open(doc.output('bloburl'), '_blank');
            } else {
                doc.save(`Cotacao_${detail.id_pacotinho}.pdf`);
            }
        };
    };

    const handleExportExcel = () => {
        if (!items.length) return;

        const data = items.map(item => ({
            'Qtd': item.NM_QUANTIDADE_PIP,
            'Peça': item.ID_PECA_PEC,
            'Marca': brands[item.ID_PECA_PEC] || '',
            'Valor Unitário': prices[item.ID_PECA_PEC] || ''
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Cotação");
        XLSX.writeFile(wb, `Cotacao_${detail?.id_pacotinho || id}.xlsx`);
    };

    if (loading) {
        return <div className="p-8 text-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div></div>;
    }

    if (!detail) return <div className="p-4 text-red-500">Erro ao carregar cotação.</div>;

    return (
        <>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {showConfirmDiscard && (
                <ConfirmModal message="Tem certeza que deseja descartar este rascunho? Todas as alterações não salvas serão perdidas." onConfirm={confirmDiscardDraft} onCancel={() => setShowConfirmDiscard(false)} />
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-6">
                    {/* Card 1: Dados da Cotação e Download */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 print:shadow-none print:border-0 print:p-0">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="flex-shrink-0">
                            {detail.logo ? (
                                <img src={detail.logo} alt="Logo Comprador" className="w-16 h-16 object-contain border border-gray-200 rounded bg-white" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 border border-gray-300">
                                    <span className="text-xs text-center">Sem Logo</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Cotação: #{detail.id_pacotinho}</h2>
                            <p className="text-gray-600">Comprador: <span className="font-semibold">{detail.comprador}</span></p>
                            <p className="text-gray-600">CNPJ: <span className="font-semibold">{detail.cnpj}</span></p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto print:hidden">
                         <button onClick={() => navigate('/seller/quotes')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm">
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Voltar
                        </button>
                        <button onClick={() => generatePDF('view')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm">
                            <FontAwesomeIcon icon={faEye} className="mr-2" /> Visualizar PDF
                        </button>
                        <button onClick={() => generatePDF('save')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center shadow-sm">
                            <FontAwesomeIcon icon={faPrint} className="mr-2" /> Baixar PDF
                        </button>
                    </div>
                </div>

                {/* Download e Upload */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 mt-6 print:hidden">
                    <div className="font-bold text-blue-700 mb-2">Download e Upload</div>
                    <p className="mb-4">Deseja fazer o download desta lista em um arquivo do Excel para ser preenchido offline? Utilize os botões abaixo.</p>
                    <p className="text-xs opacity-80 mb-4">Lembre-se: ao colocar os seus preços não mude o nome do arquivo. Você deverá enviar esse arquivo através do link na página de Cotações.</p>
                    <div className="flex flex-wrap gap-2 items-start">
                        <button 
                            onClick={handleExportExcel}
                            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center shadow-sm transition-colors"
                        >
                            <FontAwesomeIcon icon={faFileExcel} className="mr-2 text-green-600" /> XLS
                        </button>
                        <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center shadow-sm transition-colors">
                            <FontAwesomeIcon icon={faFileCsv} className="mr-2 text-green-600" /> CSV
                        </button>
                    </div>
                </div>
                    </div>

                    {/* Card 2: Atenção */}
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-xl shadow-sm print:hidden">
                <div className="flex">
                        <div className="py-1"><FontAwesomeIcon icon={faExclamationTriangle} className="mr-3" /></div>
                        <div>
                            <p className="font-bold">ATENÇÃO: {detail.requisitos}</p>
                            <p className="text-sm">Data e Hora de Encerramento: {detail.data_fim} - {detail.hora_fim}</p>
                        </div>
                </div>
                    </div>
                </div>
                {children}
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 mt-6">
                {/* Coluna Esquerda: Tabela de Itens */}
                <div className="w-full lg:w-2/3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm min-w-[800px]">
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
                                                    onChange={(e) => handleBrandChange(item.ID_PECA_PEC, e.target.value)}
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <select 
                                                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                                    onChange={(e) => handleBrandChange(item.ID_PECA_PEC, e.target.value)}
                                                    value={detail.marcas_disponiveis.includes(brands[item.ID_PECA_PEC] || '') ? brands[item.ID_PECA_PEC] : ""}
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
                    </div>
                </div>

                {/* Coluna Direita: Controles de Finalização */}
                <div className="w-full lg:w-1/3 space-y-6 print:hidden">
                    {/* Termo de Aceite */}
                    <div className="bg-red-500 text-white p-4 rounded-xl flex items-start gap-3 shadow-sm">
                    <FontAwesomeIcon icon={faInfoCircle} className="mt-1" />
                    <p className="font-bold text-sm">
                        Li e conheço os requisitos para compra estipulados pelo comprador e posso garantir os preços acima até o prazo determinado abaixo:
                    </p>
                </div>

                {/* CiaPag */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
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
                            onChange={(e) => {
                                setCiapagDiscount(e.target.value);
                                markAsChanged();
                            }}
                        />
                    </div>
                </div>

                {/* Validade */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
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
                            markAsChanged();
                        }}
                    />
                    {validationMsg && (
                        <p className={`text-sm mt-1 font-medium ${validationMsg.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                            {validationMsg.msg}
                        </p>
                    )}
                </div>

                {/* Seção de Comentários */}
                <section aria-labelledby="comments-heading" className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <QuoteComments 
                        quoteId={id} 
                        senderId={ID_FORNECEDOR} 
                        recipientId={detail.id_comprador} 
                    />
                </section>

                {/* Botões de Ação */}
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={handleSubmit}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                        >
                            <FontAwesomeIcon icon={faSave} className="mr-2" />
                            Inserir Cotação
                        </button>
                    <button 
                        onClick={() => handleSaveDraft(false)}
                            className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center"
                    >
                        <FontAwesomeIcon icon={faSave} className="mr-2 text-gray-500" />
                        Salvar Rascunho
                    </button>
                    {lastSaved && (
                        <>
                            <button 
                                onClick={() => setShowConfirmDiscard(true)}
                                className="w-full py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg font-bold shadow-sm hover:bg-red-100 transition-all flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                Descartar Rascunho
                            </button>
                            <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                                <FontAwesomeIcon icon={faCheck} className="text-green-500" /> Salvo às {lastSaved}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
        </>
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

            {quoteIds.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
                    Nenhuma cotação selecionada.
                    <br />
                    <Link to="/seller/quotes" className="text-blue-600 hover:underline mt-2 inline-block">Voltar para lista</Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {quoteIds.map(id => (
                        <QuoteResponseForm key={id} id={id}>
                            <aside className="w-full lg:w-1/3 print:hidden">
                                <div className="space-y-4">
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
                            </aside>
                        </QuoteResponseForm>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuoteDetails;

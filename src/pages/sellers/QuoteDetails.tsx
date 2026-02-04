import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Placeholder for quote detail data
interface QuoteDetail {
    id: number;
    comprador: string;
    // TODO: Adicionar outros campos detalhados da cotação
}

const QuoteDetails: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [quoteIds, setQuoteIds] = useState<number[]>([]);
    const [quoteDetails, setQuoteDetails] = useState<QuoteDetail[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const idsParam = searchParams.get('ids');
        if (idsParam) {
            const ids = idsParam.split(',').map(id => parseInt(id, 10));
            setQuoteIds(ids);

            // TODO: Substituir pela chamada real da API para buscar os detalhes dos IDs
            console.log("Buscando detalhes para os IDs:", ids);
            
            // Simulando uma chamada de API
            setTimeout(() => {
                const mockDetails: QuoteDetail[] = ids.map(id => ({
                    id: id,
                    comprador: `Comprador Exemplo para Cotação #${id}`,
                    // ... outros dados mockados
                }));
                setQuoteDetails(mockDetails);
                setLoading(false);
            }, 500);
        } else {
            setLoading(false);
        }
    }, [searchParams]);

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

                {loading && <p className="text-center text-gray-500 py-8">Carregando detalhes...</p>}

                {!loading && quoteDetails.length === 0 && (
                    <p className="text-center text-red-500 py-8">Nenhum ID de cotação foi fornecido ou os detalhes não puderam ser carregados.</p>
                )}

                {!loading && <div className="space-y-4">
                    {quoteDetails.map(detail => (
                        <div key={detail.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h3 className="font-bold text-blue-600">Cotação ID: {detail.id}</h3>
                            <p className="text-gray-700 mt-1">Comprador: {detail.comprador}</p>
                            {/* TODO: Renderizar outros detalhes da cotação aqui */}
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    );
};

export default QuoteDetails;
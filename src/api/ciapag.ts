import api from "./api";

export interface CiapagRecipient {
    id: string;
    name: string;
    email: string;
    document: string;
    type: string;
    payment_mode: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface CiapagSaldoResponse {
    currency: string;
    available_amount: number;
    waiting_funds_amount: number;
    transferred_amount: number;
    recipient: CiapagRecipient;
}

export const getCiapagSaldo = async (id: string): Promise<CiapagSaldoResponse> => {
    try {
        const response = await api.get('/ciapag/recebedores/saldo', { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar saldo CiaPag", error);
        throw error;
    }
};

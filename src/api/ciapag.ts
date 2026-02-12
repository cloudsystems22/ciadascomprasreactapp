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

export interface ExtratoItem {
    id: number;
    status: string;
    balance_amount: number;
    type: 'transfer' | 'payable' | 'refund' | 'chargeback' | string;
    amount: number;
    fee: number;
    created_at: string;
    movement_object: any;
}

export interface CiapagExtratoResponse {
    data: ExtratoItem[];
    paging?: any;
}

export interface CiapagReceivable {
    id: number;
    status: string;
    amount: number;
    fee: number;
    anticipation_fee: number;
    fraud_coverage_fee: number;
    installment: number;
    gateway_id: number;
    charge_id: string;
    split_id: string;
    bulk_anticipation_id: string;
    recipient_id: string;
    payment_date: string;
    original_payment_date: string;
    type: string;
    payment_method: string;
    accrual_at: string;
    created_at: string;
    liquidation_arrangement_id: string;
}

export interface CiapagInvoiceDetail {
    id: string;
    code: string;
    gateway_id: string;
    amount: number;
    paid_amount: number;
    status: string;
    currency: string;
    payment_method: string;
    paid_at: string;
    created_at: string;
    updated_at: string;
    order: {
        id: string;
        code: string;
        amount: number;
        closed: boolean;
        created_at: string;
        updated_at: string;
        closed_at: string;
        currency: string;
        status: string;
        customer_id: string;
        metadata: any;
    };
    customer: {
        id: string;
        name: string;
        email: string;
        document: string;
        type: string;
        delinquent: boolean;
        address: any;
        created_at: string;
        updated_at: string;
        phones: {
            mobile_phone: {
                country_code: string;
                number: string;
                area_code: string;
            }
        };
    };
    last_transaction: {
        brand_id: string;
        id: string;
        transaction_type: string;
        gateway_id: string;
        amount: number;
        status: string;
        success: boolean;
        installments: number;
        acquirer_name: string;
        acquirer_tid: string;
        acquirer_nsu: string;
        acquirer_auth_code: string;
        acquirer_message: string;
        acquirer_return_code: string;
        operation_type: string;
        card: {
            id: string;
            first_six_digits: string;
            last_four_digits: string;
            brand: string;
            holder_name: string;
            exp_month: number;
            exp_year: number;
            status: string;
            type: string;
            created_at: string;
            updated_at: string;
            billing_address: any;
        };
        funding_source: string;
        created_at: string;
        updated_at: string;
        gateway_response: {
            code: string;
            errors: any[];
        };
        antifraud_response: {
            status: string;
            score: string;
            provider_name: string;
        };
        split: Array<{
            id: string;
            type: string;
            gateway_id: string;
            amount: number;
            recipient: {
                id: string;
                name: string;
                email?: string;
                document: string;
                type: string;
                payment_mode: string;
                status: string;
                created_at: string;
                updated_at: string;
            };
            options: {
                liable: boolean;
                charge_processing_fee: boolean;
                charge_remainder_fee: boolean;
            };
        }>;
        metadata: any;
    };
    metadata: any;
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

export const getCiapagCobranca = async (id: string): Promise<CiapagInvoiceDetail> => {
    try {
        const response = await api.get('/ciapag/pagamentos/cobrancas', { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes da cobrança CiaPag", error);
        throw error;
    }
};

export const getCiapagRecebiveis = async (recipient_id: string, created_since: string): Promise<CiapagReceivable[]> => {
    try {
        const params = {
            recipient_id,
            created_since
        };
        const response = await api.get('/ciapag/recebedores/recebiveis', { params });
        const responseData = response.data;

        // A API pode retornar o array dentro de um objeto { data: [...] } ou diretamente.
        // Esta lógica garante que sempre retornemos o array.
        return Array.isArray(responseData?.data) ? responseData.data : Array.isArray(responseData) ? responseData : [];
    } catch (error) {
        console.error("Erro ao buscar recebíveis CiaPag", error);
        throw error;
    }
};

export const getCiapagExtrato = async (recipient_id: string, created_since: string, created_until: string, status: string = 'available'): Promise<CiapagExtratoResponse> => {
    try {
        const params = {
            recipient_id,
            created_since,
            created_until,
            status
        };

        const response = await api.get('/ciapag/recebedores/extrato', { params });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar extrato CiaPag", error);
        throw error;
    }
};

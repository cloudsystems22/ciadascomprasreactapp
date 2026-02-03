import api from "./api";

export interface PedidoParams {
  page?: number;
  limit?: number;
  id_fornecedor_cli: number;
  status_ped?: number;
  sort_by?: string;
  sort_order?: string;
}

export interface Pedido {
    id_pedido_ped: string;
    id_fornecedor_cli: number;
    id_lojista_cli: number;
    dt_data_ped: string;
    fl_status_ped: number;
    tx_observacoes_ped: string;
    vl_valor_ped: number;
    NM_ITENS_PED: number;
    rep_com: string;
    info_ad: string;
    faturado: number;
    INDICE: number;
    total_cotado: number;
    desp_acess: number;
    total_cartao: number;
    parcelas: any;
    NM_NOME_LOJISTA: string;
}

export interface PedidoResponse {
  items: Pedido[];
  totalCount: number;
}

export const getPedidos = async (params: PedidoParams): Promise<PedidoResponse> => {
  const { page = 1, limit = 10, id_fornecedor_cli, status_ped, sort_by = 'dt_data_ped', sort_order = 'DESC' } = params;
  const offset = (page - 1) * limit;

  try {
    const queryParams: any = { id_fornecedor_cli, limit, offset, sort_by, sort_order };
    
    if (status_ped !== undefined) {
      queryParams.status_ped = status_ped;
    }

    const response = await api.get('/pedidos', { params: queryParams });

    // Adaptação para o formato { data: [...], total: number } que parece ser o padrão da sua API
    if (response.data && Array.isArray(response.data.data)) {
      return { items: response.data.data, totalCount: response.data.total || 0 };
    }

    // Fallback para um array direto
    return { items: response.data || [], totalCount: response.data?.length || 0 };
  } catch (error) {
    console.error("Erro ao buscar pedidos", error);
    throw error;
  }
};
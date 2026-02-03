import api from "./api";

export interface PedidoParams {
  page?: number;
  limit?: number;
  id_fornecedor_cli: number;
  status_ped?: number;
  sort_by?: string;
  dt_ini?: string;
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

export interface FaturamentoData {
    mes: string;
    total: number;
}

export interface PedidoDetalhe {
    id_pedido_ped: string;
    id_fornecedor_cli: number;
    id_lojista_cli: number;
    dt_data_ped: string;
    fl_status_ped: number;
    tx_observacoes_ped: string | null;
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
}

export interface PedidoItem {
    ID_PEDIDO_PED: string;
    NM_QUANTIDADE_PIP: number;
    ID_PECA_PEC: string;
    MARCA: string;
    VL_VALOR: number;
    id_pacotinho_ped: number;
    id_origem_ped: number;
}

export const getPedidos = async (params: PedidoParams): Promise<PedidoResponse> => {
  const { page = 1, limit = 30, id_fornecedor_cli, dt_ini, status_ped, sort_by, sort_order } = params;
  const offset = (page - 1) * limit;

  try {
    const queryParams: any = { 
        id_fornecedor_cli, 
        limit, 
        offset 
    };

    if (dt_ini) {
        queryParams.dt_ini = dt_ini;
    }
    
    if (status_ped !== undefined) {
      queryParams.status_ped = status_ped;
    }

    if (sort_by) {
      queryParams.sort_by = sort_by;
    }

    if (sort_order) {
      queryParams.sort_order = sort_order;
    }

    const response = await api.get('/pedidos', { params: queryParams });

    // Tenta obter o total de registros de várias fontes possíveis (headers ou corpo)
    const totalCount = response.data.total || 
                       parseInt(response.headers['x-pagination-total-count'] || '0', 10) || 
                       (response.data.data ? response.data.data.length : response.data.length) || 0;

    // Adaptação para o formato { data: [...], total: number } que parece ser o padrão da sua API
    if (response.data && Array.isArray(response.data.data)) {
      return { items: response.data.data, totalCount: totalCount };
    }

    if (response.data && Array.isArray(response.data.items)) {
      return { items: response.data.items, totalCount: totalCount };
    }

    // Fallback para um array direto
    return { items: response.data || [], totalCount: totalCount };
  } catch (error) {
    console.error("Erro ao buscar pedidos", error);
    throw error;
  }
};

export const getFaturamento = async (id_fornecedor_cli: number): Promise<FaturamentoData[]> => {
    try {
        const response = await api.get('/pedidos/faturamento', { params: { id_fornecedor_cli } });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar faturamento", error);
        // Fallback com os dados fornecidos para contornar erro de rede (CORS/AdBlock) em desenvolvimento
        return [];
    }
};

export const getPedido = async (id: string): Promise<PedidoDetalhe> => {
    const response = await api.get('/pedidos', { params: { id } });
    return response.data;
};

export const getItensPedido = async (id_pedido: string): Promise<PedidoItem[]> => {
    const response = await api.get('/pedidos/itens', { params: { id_pedido } });
    
    if (Array.isArray(response.data)) {
        return response.data;
    }

    // Suporte para respostas envelopadas (ex: { itens: [...] }, { items: [...] } ou { data: [...] })
    return response.data.itens || response.data.items || response.data.data || [];
};
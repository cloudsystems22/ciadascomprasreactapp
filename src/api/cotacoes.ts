import api from "./api";

export interface CotacaoParams {
  page?: number;
  limit?: number;
  expand?: string;
  sort_by?: string;
  sort_order?: string;
  // Adicione outros filtros aqui se a API suportar (ex: search, status)
}

export interface CotacaoResponse {
  items: any[]; // Usamos any aqui pois não tenho o formato exato da resposta da API, ajuste conforme necessário
  totalCount: number;
}

export const getCotacoes = async (params: CotacaoParams = {}): Promise<CotacaoResponse> => {
  const { page = 1, limit = 10, expand = 'lojista', sort_by = 'DT_ENTRADA_PCT', sort_order = 'DESC' } = params;
  const offset = (page - 1) * limit;

  try {
    const response = await api.get('/pacotinhos', {
      params: {
        expand,
        limit,
        offset,
        sort_by,
        sort_order
      }
    });

    // Adaptação para o formato { data: [...], total: number }
    if (response.data && Array.isArray(response.data.data)) {
      return { 
        items: response.data.data, 
        totalCount: response.data.total || 0 
      };
    }

    // Tenta extrair o total de itens. 
    // Muitas APIs retornam o total no header 'x-pagination-total-count' ou em uma propriedade meta.
    // Ajuste esta lógica conforme o retorno real da sua API.
    const totalCount = parseInt(response.headers['x-pagination-total-count'] || '0', 10) || response.data.length;

    // Se a API retornar um array direto:
    if (Array.isArray(response.data)) {
      return { items: response.data, totalCount: totalCount || response.data.length };
    }
    
    // Se a API retornar um objeto com items (ex: { items: [...], _meta: {...} })
    return { 
      items: response.data.items || [], 
      totalCount: response.data._meta?.totalCount || totalCount 
    };

  } catch (error) {
    console.error("Erro ao buscar cotações", error);
    throw error;
  }
};

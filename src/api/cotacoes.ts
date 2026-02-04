import api from "./api";

export interface CotacaoParams {
  page?: number;
  limit?: number;
  expand?: string;
  sort_by?: string;
  sort_order?: string;
  visualizacao?: string;
  // Adicione outros filtros aqui se a API suportar (ex: search, status)
}

export interface CotacaoResponse {
  items: any[]; // Usamos any aqui pois não tenho o formato exato da resposta da API, ajuste conforme necessário
  totalCount: number;
}

export interface CotacaoCard {
  Entrada: string;
  Comprador: string;
  Localização: string;
  Resp: number;
  Resumo: string;
  flag: boolean;
  id_pacotinho: number;
  respondido_por_mim: boolean;
}

export interface CotacaoItem {
  id_item: number;
  descricao: string;
  quantidade: number;
  unidade: string;
  observacao?: string;
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

export const getCotacaoItems = async (id_pacotinho: number): Promise<CotacaoItem[]> => {
  try {
    // Endpoint hipotético para buscar itens. Ajuste conforme a rota real da sua API.
    // Se a API ainda não existir, isso retornará um erro 404 ou similar.
    const response = await api.get('/pacotinhos/itens', { params: { id_pacotinho } });
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return response.data.items || [];
  } catch (error) {
    console.error(`Erro ao buscar itens da cotação ${id_pacotinho}`, error);
    return []; // Retorna array vazio em caso de erro para não quebrar a UI
  }
};

export interface CotacaoCardResponse {
  items: CotacaoCard[];
  totalCount: number;
}

export const getCotacoesCards = async (id_fornecedor: number, params: CotacaoParams = {}): Promise<CotacaoCardResponse> => {
  const { page = 1, limit = 30, ...rest } = params;
  const offset = (page - 1) * limit;

  try {
    const queryParams: any = {
      id_fornecedor,
      limit,
      offset,
      ...rest
    };

    const response = await api.get('/pacotinhos/cards', { params: queryParams });

    let items: CotacaoCard[] = [];
    let totalCount = 0;

    // Verifica se a resposta é um objeto com a propriedade 'total' (novo formato)
    if (response.data && typeof response.data === 'object' && 'total' in response.data) {
      totalCount = response.data.total;
      
      // Tenta encontrar a propriedade que contém o array de itens (data, items ou a primeira propriedade array encontrada)
      if (Array.isArray(response.data.data)) {
        items = response.data.data;
      } else if (Array.isArray(response.data.items)) {
        items = response.data.items;
      } else {
        const arrayKey = Object.keys(response.data).find(key => Array.isArray(response.data[key]));
        if (arrayKey) items = response.data[arrayKey];
      }
    } else if (Array.isArray(response.data)) {
      // Fallback para o formato antigo (array direto)
      items = response.data;
      totalCount = parseInt(response.headers['x-pagination-total-count'] || '0', 10) || items.length;
    }

    return { items, totalCount };
  } catch (error) {
    console.error("Erro ao buscar cartões de cotações", error);
    throw error;
  }
};

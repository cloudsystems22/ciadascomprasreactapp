import api from "./api";
import { getFabricantes } from "./fabricantes";

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
  ID_PACOTINHO_PCT: number;
  ID_PECA_PEC: string;
  NM_QUANTIDADE_PIP: number;
  MARCA: string;
  FL_STATUS: number;
  // Campos opcionais para quando já houver resposta
  VL_VALOR_PROPOSTO?: number;
  OBS_PROPOSTA?: string;
}

export interface CotacaoDetail {
  id_pacotinho: number;
  comprador: string;
  id_comprador: number; // Adicionado para identificar o destinatário das mensagens
  cnpj: string;
  logo: string | null;
  requisitos: string;
  data_fim: string;
  hora_fim: string;
  marcas_disponiveis: string[];
}

export interface MensagemCotacao {
    id: number;
    id_cotacao: number;
    id_pedido: number | null;
    id_remetente: number;
    id_destinatario: number;
    mensagem: string;
    data: string;
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
    const response = await api.get('/pctinhopecas', { params: { id_pacotinho } });
    
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return response.data.items || [];
  } catch (error) {
    console.error(`Erro ao buscar itens da cotação ${id_pacotinho}`, error);
    return []; // Retorna array vazio em caso de erro para não quebrar a UI
  }
};

export const getCotacaoDetail = async (id_pacotinho: number, id_fornecedor: number): Promise<CotacaoDetail> => {
  try {
    const response = await api.get('/pacotinhos/detalhes', { params: { id: id_pacotinho, id_fornecedor } });
    const data = response.data;

    // Correção da URL da logo se for relativa
    if (data.logo && !data.logo.startsWith('http')) {
      data.logo = `https://www.ciadascompras.com.br/sys/${data.logo}`;
    }

    // Se não houver marcas disponíveis, busca do endpoint /fabricantes
    if (!data.marcas_disponiveis || data.marcas_disponiveis.length === 0) {
      data.marcas_disponiveis = await getFabricantes(id_fornecedor);
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar detalhes da cotação", error);
    throw error;
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

// Métodos para Mensagens da Cotação
export const getMensagensCotacao = async (id_cotacao: number, id_remetente: number, id_destinatario: number): Promise<MensagemCotacao[]> => {
    try {
        const response = await api.get('/mensagemcotacao', { params: { id_cotacao, id_remetente, id_destinatario } });
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Erro ao buscar mensagens", error);
        return [];
    }
};

export const createMensagemCotacao = async (data: Omit<MensagemCotacao, 'id'>): Promise<MensagemCotacao> => {
    const response = await api.post('/mensagemcotacao', data);
    return response.data;
};

export const updateMensagemCotacao = async (id: number, data: Partial<MensagemCotacao>): Promise<MensagemCotacao> => {
    const response = await api.put(`/mensagemcotacao`, data, { params: { id } });
    return response.data;
};

export const deleteMensagemCotacao = async (id: number): Promise<void> => {
    await api.delete(`/mensagemcotacao`, { params: { id } });
};

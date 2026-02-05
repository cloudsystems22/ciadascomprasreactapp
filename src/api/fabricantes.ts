import api from "./api";

export interface Fabricante {
  ID_CLIENTE_CLI?: number;
  ID_FABRICANTE_FAB: number;
  ST_NOME_FAB: string;
  SEGC: number;
}

const CACHE_KEY_PREFIX = 'fabricantes_cache_';

// Cache para armazenar as promessas das listas de fabricantes por fornecedor.
// A chave é o id_fornecedor e o valor é a Promise que resolve para a lista de nomes.
const fabricantesCache = new Map<number, Promise<string[]>>();

/**
 * Busca e processa a lista de fabricantes para um fornecedor específico.
 * Esta função não deve ser chamada diretamente de fora, use getFabricantes.
 */
async function fetchAndProcessFabricantes(id_fornecedor: number): Promise<string[]> {
  try {
    const response = await api.get<Fabricante[]>('/fornecedorfabricante', { params: { id_fornecedor } });

    const fabricantesData = Array.isArray(response.data) 
      ? response.data 
      : (response.data as any).data || (response.data as any).items || [];

    const result = fabricantesData
      .map((f: Fabricante) => f.ST_NOME_FAB)
      .filter((nome: string) => nome && nome.trim() !== '');

    // Salva no localStorage para persistência entre sessões
    try {
      localStorage.setItem(`${CACHE_KEY_PREFIX}${id_fornecedor}`, JSON.stringify(result));
    } catch (e) {
      console.warn("Erro ao salvar cache de fabricantes no localStorage", e);
    }

    return result;
  } catch (error) {
    console.error("Erro ao buscar fabricantes", error);
    // Em caso de erro, remove a promessa com falha do cache para permitir uma nova tentativa na próxima chamada.
    fabricantesCache.delete(id_fornecedor);
    return [];
  }
}

export const getFabricantes = (id_fornecedor: number): Promise<string[]> => {
  if (fabricantesCache.has(id_fornecedor)) {
    return fabricantesCache.get(id_fornecedor)!;
  }

  // Tenta recuperar do localStorage antes de fazer a requisição
  const storedData = localStorage.getItem(`${CACHE_KEY_PREFIX}${id_fornecedor}`);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        const promise = Promise.resolve(parsedData);
        fabricantesCache.set(id_fornecedor, promise);
        return promise;
      }
    } catch (e) {
      localStorage.removeItem(`${CACHE_KEY_PREFIX}${id_fornecedor}`);
    }
  }

  // Se não estiver no cache nem no localStorage, inicia a busca
  const promise = fetchAndProcessFabricantes(id_fornecedor);
  fabricantesCache.set(id_fornecedor, promise);
  return promise;
};
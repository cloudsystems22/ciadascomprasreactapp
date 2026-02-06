import api from "./api";

export interface BannerForn {
  ID_BANNER_BAN: number;
  LINK_EMPRESA: string;
  LOGO_GRANDE: string;
  // Adicione outras propriedades que possam existir na sua API
}

export const getBannersForn = async (): Promise<BannerForn[]> => {
  try {
    const response = await api.get('/bannersforn?tipo=logo');
    
    // A API pode retornar os dados diretamente ou dentro de uma propriedade 'data'
    return response.data.data || response.data || [];
  } catch (error) {
    console.error("Erro ao buscar banners de fornecedores:", error);
    // Em caso de erro (como CORS em desenvolvimento), retorna uma lista vazia.
    // Você pode adicionar dados mocados aqui para facilitar os testes.
    return [];
  }
};
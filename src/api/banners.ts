import api from "./api";

export interface BannerForn {
  ID_BANNER_BAN: number;
  LINK_EMPRESA: string;
  LOGO_GRANDE: string | null;
  TITULO: string;
  SUBTITULO: string;
  FONE1: string;
  FONE2: string;
}

export const getBannersForn = async (tipo?: string): Promise<BannerForn[]> => {
  try {
    const url = tipo ? `/bannersforn?tipo=${tipo}` : '/bannersforn';
    const response = await api.get(url);
    
    // A API pode retornar os dados diretamente ou dentro de uma propriedade 'data'
    return response.data.data || response.data || [];
  } catch (error) {
    console.error("Erro ao buscar banners de fornecedores:", error);
    return [];
  }
};

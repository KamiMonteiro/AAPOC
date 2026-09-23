/**
 * Cliente HTTP e Tipagens para a API Django da AAPOC
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export type VoluntarioInput = {
  nome_completo: string;
  data_nascimento: string; // Formato YYYY-MM-DD
  telefone: string;
  instagram?: string;
  endereco: string;
  como_deseja_ajudar: string;
  termo_lgpd_aceito: boolean;
};

export type VoluntarioResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    nome_completo: string;
    data_nascimento: string;
    telefone: string;
    instagram?: string;
    endereco: string;
    como_deseja_ajudar: string;
    criado_em: string;
  };
};

export class ApiError extends Error {
  errors?: Record<string, string[] | string>;

  constructor(message: string, errors?: Record<string, string[] | string>) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}

/**
 * Envia uma nova inscrição de voluntário para o backend Django
 */
export async function cadastrarVoluntario(
  dados: VoluntarioInput
): Promise<VoluntarioResponse> {
  const url = `${API_BASE_URL}/voluntarios/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dados),
    });

    const data = await response.json();

    if (!response.ok) {
      // Monta mensagem de erro legível a partir das validações do Django
      let errorMsg = "Não foi possível registrar o voluntário.";
      if (typeof data === "object" && data !== null) {
        const firstKey = Object.keys(data)[0];
        if (firstKey && data[firstKey]) {
          const val = data[firstKey];
          errorMsg = Array.isArray(val) ? val[0] : String(val);
        }
      }
      throw new ApiError(errorMsg, data);
    }

    return data as VoluntarioResponse;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      "Erro de conexão com o servidor. Verifique se o backend está em execução ou tente novamente."
    );
  }
}

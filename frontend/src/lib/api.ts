const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function request(path: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Erro desconhecido' }));
    const msg = typeof err.detail === 'object' ? JSON.stringify(err.detail) : (err.detail || `HTTP ${res.status}`);
    throw new Error(msg);
  }
  return res.json();
}

export const api = {
  login: (email: string, senha: string) =>
    request('/api/auth/login', {
      method: 'POST',
      body: new URLSearchParams({ username: email, password: senha }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }),

  register: (data: any) =>
    request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => request('/api/auth/me'),

  getRegistros: (tabela: string, data_base?: string) => {
    const query = data_base ? `?data_base=${data_base}` : '';
    return request(`/api/cadoc/${tabela}${query}`);
  },

  criarRegistro: (tabela: string, dados: any) =>
    request(`/api/cadoc/${tabela}`, {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  gerarArquivos: (ano: number, mes: number) =>
    request(`/api/cadoc/gerar/${ano}/${mes}`, { method: 'POST' }),

  listarEnvios: () => request('/api/cadoc/envios/listar'),

  health: () => request('/api/health'),
};

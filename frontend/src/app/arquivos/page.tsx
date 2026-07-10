'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { FileText, Download, CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

export default function ArquivosPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [envios, setEnvios] = useState<any[]>([]);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [gerando, setGerando] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.getMe().then(setUser).catch(() => router.push('/login'));
    carregarEnvios();
  }, [router]);

  const carregarEnvios = async () => {
    try {
      const data = await api.listarEnvios();
      setEnvios(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGerar = async () => {
    setGerando(true);
    setResultado(null);
    try {
      const res = await api.gerarArquivos(ano, mes);
      setResultado(res);
      carregarEnvios();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setGerando(false);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'gerado': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'erro': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pendente': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  if (!user) return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-800 font-medium">&larr; Voltar</button>
          <h1 className="text-xl font-bold text-gray-900">Geração de Arquivos</h1>
          <span className="text-sm text-gray-500">{user.instituicao}</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gerar Arquivos CADOC 6209</h2>
          <p className="text-gray-600 mb-6">Selecione o período de referência e clique em gerar para produzir os arquivos no formato exigido pelo BACEN.</p>

          <div className="flex gap-4 items-end mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
              <input type="number" value={ano} onChange={(e) => setAno(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
              <select value={mes} onChange={(e) => setMes(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGerar}
              disabled={gerando}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {gerando ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              {gerando ? 'Gerando...' : 'Gerar Arquivos'}
            </button>
          </div>

          {resultado && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-3">Resultado:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {resultado.arquivos.map((arq: any) => (
                  <div key={arq.arquivo} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    {statusIcon(arq.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{arq.arquivo}</p>
                      <p className="text-xs text-gray-500">{arq.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Envios</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Arquivo</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Data Base</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Hash</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {envios.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-500">Nenhum envio encontrado</td></tr>
                ) : (
                  envios.map((envio: any) => (
                    <tr key={envio.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{envio.arquivo}</td>
                      <td className="px-4 py-3">{envio.data_base}</td>
                      <td className="px-4 py-3">{statusIcon(envio.status)}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">{envio.hash_arquivo || '-'}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(envio.created_at).toLocaleString('pt-BR')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

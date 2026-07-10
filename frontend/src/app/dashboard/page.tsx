'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

const tabelas = [
  { key: 'conglome', label: 'Conglomerado', campos: ['codigo_instituicao', 'nome_instituicao', 'cnpj', 'possui_conglomerado', 'tipo_conglomerado'] },
  { key: 'usuremot', label: 'Usuários Remotos', campos: ['codigo_instituicao', 'qtd_usuarios_internet', 'qtd_usuarios_mobile', 'qtd_usuarios_telefone', 'qtd_usuarios_correspondente', 'qtd_transacoes_internet', 'qtd_transacoes_mobile', 'qtd_transacoes_telefone', 'qtd_transacoes_correspondente'] },
  { key: 'estatcrt', label: 'Estatísticas Cartão', campos: ['codigo_instituicao', 'tipo_cartao', 'bandeira', 'qtd_emitidos', 'qtd_ativas', 'qtd_transacoes_credito', 'valor_transacoes_credito', 'qtd_transacoes_debito', 'valor_transacoes_debito', 'qtd_saque', 'valor_saque'] },
  { key: 'estatatm', label: 'Estatísticas ATM', campos: ['codigo_instituicao', 'tipo_local', 'qtd_terminais', 'qtd_transacoes', 'valor_transacoes', 'qtd_saques', 'valor_saques', 'qtd_consultas', 'qtd_extratos'] },
  { key: 'transopa', label: 'Transações Pagamento', campos: ['codigo_instituicao', 'tipo_pagamento', 'canal_acesso', 'qtd_transacoes', 'valor_transacoes', 'qtd_transacoes_remoto', 'valor_transacoes_remoto'] },
  { key: 'opeintra', label: 'Operações Intrabancárias', campos: ['codigo_instituicao', 'tipo_operacao', 'qtd_transferencias', 'valor_transferencias', 'qtd_pagamentos', 'valor_pagamentos', 'qtd_agendamentos'] },
  { key: 'contatos', label: 'Canais de Atendimento', campos: ['codigo_instituicao', 'tipo_canal', 'qtd_total', 'qtd_presencial', 'qtd_remoto', 'qtd_cidades_atendidas'] },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'conglome';

  const [user, setUser] = useState<any>(null);
  const [registros, setRegistros] = useState<any[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({ data_base: new Date().toISOString().slice(0, 10) });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const currentTabela = tabelas.find((t) => t.key === tab) || tabelas[0];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.getMe().then(setUser).catch(() => router.push('/login'));
  }, [router]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    api.getRegistros(tab)
      .then(setRegistros)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tab, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await api.criarRegistro(tab, formData);
      setShowForm(false);
      setFormData({ data_base: new Date().toISOString().slice(0, 10) });
      const data = await api.getRegistros(tab);
      setRegistros(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const formatValor = (v: any) => {
    if (v === null || v === undefined || v === '') return '-';
    if (typeof v === 'number') return v.toLocaleString('pt-BR');
    return v;
  };

  if (!user) return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="text-blue-600 hover:text-blue-800 font-medium">&larr; Voltar</button>
          <h1 className="text-xl font-bold text-gray-900">Dashboard - Dados</h1>
          <span className="text-sm text-gray-500">{user.instituicao}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabelas.map((t) => (
            <button
              key={t.key}
              onClick={() => router.push(`/dashboard?tab=${t.key}`)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{currentTabela.label}</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            {showForm ? 'Cancelar' : '+ Novo Registro'}
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Base</label>
                <input type="date" value={formData.data_base || ''} onChange={(e) => setFormData({ ...formData, data_base: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código Instituição</label>
                <input type="text" value={formData.codigo_instituicao || ''} onChange={(e) => setFormData({ ...formData, codigo_instituicao: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTabela.campos.filter(c => c !== 'codigo_instituicao').map((campo) => (
                <div key={campo}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{campo}</label>
                  <input type="text" value={formData[campo] || ''} onChange={(e) => setFormData({ ...formData, [campo]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              ))}
            </div>
            <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-green-700">
              Salvar
            </button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">#</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Data Base</th>
                  {currentTabela.campos.map((c) => (
                    <th key={c} className="text-left px-4 py-3 font-medium text-gray-600">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={currentTabela.campos.length + 2} className="text-center py-8 text-gray-500">Carregando...</td></tr>
                ) : registros.length === 0 ? (
                  <tr><td colSpan={currentTabela.campos.length + 2} className="text-center py-8 text-gray-500">Nenhum registro encontrado</td></tr>
                ) : (
                  registros.map((reg: any) => (
                    <tr key={reg.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">{reg.id}</td>
                      <td className="px-4 py-3">{reg.data_base}</td>
                      {currentTabela.campos.map((c) => (
                        <td key={c} className="px-4 py-3">{formatValor(reg[c])}</td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-white">Carregando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

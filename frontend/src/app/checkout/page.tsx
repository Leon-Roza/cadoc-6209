'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Database, ArrowLeft, CheckCircle2 } from 'lucide-react';

const planos: Record<string, { nome: string; preco: string; valor: number }> = {
  manual: { nome: 'Manual', preco: 'R$ 997/mês', valor: 997 },
  automation: { nome: 'Automation', preco: 'R$ 4.997/mês', valor: 4997 },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planoKey = searchParams.get('plano') || 'manual';
  const plano = planos[planoKey] || planos.manual;
  const [tab, setTab] = useState<'pix' | 'card'>('pix');
  const [enviado, setEnviado] = useState(false);

  if (enviado) return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h1>
        <p className="text-gray-600 mb-6">Recebemos sua solicitação. Em até 24h úteis enviaremos o acesso.</p>
        <a href="/cadoc-6209" className="text-blue-600 hover:text-blue-800 font-medium">Voltar</a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <a href="/cadoc-6209" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </a>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <h1 className="text-2xl font-bold">Plano {plano.nome}</h1>
              <p className="text-blue-200 text-lg">{plano.preco}</p>
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
                <button onClick={() => setTab('pix')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${tab === 'pix' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>Pix</button>
                <button onClick={() => setTab('card')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${tab === 'card' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>Cartão</button>
              </div>

              {tab === 'pix' ? (
                <div className="text-center py-8">
                  <div className="w-48 h-48 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center text-4xl text-gray-300">⎔</div>
                  <p className="text-sm text-gray-600 mb-2">Pague com Pix usando a chave abaixo:</p>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border">
                    <code className="text-sm text-blue-600">cadoc6209@pix.com.br</code>
                    <button onClick={() => { navigator.clipboard.writeText('cadoc6209@pix.com.br'); alert('Copiado!'); }} className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700">Copiar</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome no Cartão</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="Como impresso no cartão" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="0000 0000 0000 0000" maxLength={19} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Validade</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="MM/AA" maxLength={5} /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">CVV</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="123" maxLength={4} /></div>
                  </div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">CPF</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm" placeholder="000.000.000-00" /></div>
                  <button onClick={() => setEnviado(true)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">Pagar R$ {plano.valor}</button>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-8">
            <h3 className="font-semibold text-gray-900 mb-4 pb-4 border-b">Resumo</h3>
            <div className="flex justify-between mb-4"><span className="text-gray-600">Plano</span><span className="font-semibold">{plano.nome}</span></div>
            <div className="flex justify-between mb-4"><span className="text-gray-600">Valor</span><span className="text-2xl font-bold text-blue-600">{plano.preco}</span></div>
            <hr className="my-4" />
            <div className="text-xs text-gray-400 space-y-2">
              <p>🛡️ 7 dias de garantia</p>
              <p>🔒 Ambiente seguro</p>
              <p>📧 Acesso enviado por e-mail</p>
            </div>
            {tab === 'pix' && (
              <button onClick={() => setEnviado(true)} className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">Pagar com Pix</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}><CheckoutContent /></Suspense>;
}

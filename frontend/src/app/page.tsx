'use client';

import { CheckCircle2, MousePointerClick, Bot, ArrowRight, Shield, Clock, FileText, Building2, BarChart3, Database } from 'lucide-react';

const beneficios = [
  { icon: Shield, text: 'Conformidade total com o leiaute v2.0.4 do BACEN' },
  { icon: Clock, text: 'Redução de 90% no tempo de preparação dos arquivos' },
  { icon: FileText, text: 'Geração automática dos 7 arquivos (CONGLOME, USUREMOT, ESTATCRT, ESTATATM, TRANSOPA, OPEINTRA, CONTATOS)' },
  { icon: Building2, text: 'Multitenancy - uma plataforma para todo o conglomerado' },
  { icon: BarChart3, text: 'Dashboard completo para auditoria e acompanhamento' },
];

const planos = [
  {
    nome: 'Manual',
    subtitle: 'Autoatendimento',
    price: 'R$ 997',
    period: '/mês',
    icon: MousePointerClick,
    color: 'blue',
    features: [
      'Interface web para inserção manual dos dados',
      'Validação automática conforme layout BACEN',
      'Geração dos arquivos .txt no formato correto',
      'Dashboard de acompanhamento',
      'Histórico de envios com hash de integridade',
      'Suporte por email e chat',
      'Atualizações automáticas de layout',
    ],
    desafio: 'A instituição precisa ter os dados organizados internamente para alimentar o sistema manualmente a cada trimestre.',
    ideal: 'Ideal para instituições de pequeno porte (< 50 mil transações/mês)',
    cta: 'Começar Agora',
  },
  {
    nome: 'Automation',
    subtitle: 'Implementação Completa',
    price: 'R$ 4.997',
    period: '/mês',
    icon: Bot,
    color: 'green',
    featured: true,
    features: [
      'Tudo do plano Manual',
      'Equipe dedicada para mapeamento das bases internas',
      'Integração direta com sistemas legados (core bancário)',
      'Automação completa da coleta e formatação dos dados',
      'Importação de planilhas, CSVs e APIs',
      'Validação cruzada automática entre fontes',
      'Gerente de conta dedicado',
      'Suporte prioritário 24h',
      'Garantia de conformidade na primeira entrega',
    ],
    desafio: 'Nosso time técnico é alocado para entender a arquitetura de dados da sua instituição e automatizar todo o fluxo — você só acompanha o dashboard.',
    ideal: 'Ideal para médias e grandes instituições (> 50 mil transações/mês)',
    cta: 'Solicitar Proposta',
  },
];

const FAQ = [
  { q: 'Precisa instalar algo na minha infraestrutura?', a: 'Não. O sistema é 100% cloud (SaaS). Acesso via navegador. No plano Automation podemos conectar via API ou VPN.' },
  { q: 'O layout é atualizado automaticamente?', a: 'Sim. Quando o BACEN altera o leiaute (como fez com a IN BCB 622/2025), atualizamos o sistema sem custo adicional.' },
  { q: 'Quanto tempo leva a implementação do plano Automation?', a: 'Entre 15 a 45 dias, dependendo da complexidade dos sistemas internos.' },
  { q: 'E se eu errar algum dado na entrega?', a: 'O sistema valida todos os campos antes da geração. No plano Automation, a validação cruzada compara dados de múltiplas fontes.' },
  { q: 'Posso testar antes de assinar?', a: 'Sim. Oferecemos 15 dias de trial gratuito no plano Manual.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">Sistema de Conformidade BACEN</span>
          <div className="flex gap-3">
            <a href="/cadoc-6209/login" className="text-blue-300 hover:text-white transition font-medium">Entrar</a>
            <span className="text-gray-600">|</span>
            <a href="/cadoc-6209/login?register=1" className="text-blue-300 hover:text-white transition font-medium">Criar Conta</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Database className="w-6 h-6 text-blue-300" />
              <span className="text-blue-200 text-sm font-medium tracking-wide uppercase">CADOC 6209 - BACEN</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Sua conformidade com o{' '}
              <span className="text-blue-300">BACEN</span> entregue em dias,
              não em meses
            </h1>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Sistema completo para geração do Documento 6209 — Pagamentos de Varejo e Canais de Atendimento.
              Do plano manual à automação total com integração aos seus sistemas.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#planos" className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg">
                Ver Planos
              </a>
              <a href="#faq" className="text-blue-200 hover:text-white px-4 py-3 transition">
                Dúvidas Frequentes
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: FileText, label: 'Arquivos Gerados', value: 'CONGLOME, USUREMOT, ESTATCRT, ESTATATM, TRANSOPA, OPEINTRA, CONTATOS' },
              { icon: Clock, label: 'Periodicidade', value: 'Trimestral (até último dia útil do mês subsequente)' },
              { icon: Shield, label: 'Conformidade', value: 'Leiaute v2.0.4 - IN BCB 335/2022 e IN BCB 622/2025' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <item.icon className="w-8 h-8 text-blue-300 mb-3" />
                <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                <p className="text-sm text-blue-200">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Beneficios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Por que escolher nossa plataforma?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {beneficios.map((item) => (
              <div key={item.text} className="flex items-start gap-3 p-4">
                <item.icon className="w-6 h-6 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Escolha o plano ideal</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Do preenchimento manual à automação completa. Evolua conforme sua necessidade.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {planos.map((plano) => {
              const Icon = plano.icon;
              return (
                <div
                  key={plano.nome}
                  className={`rounded-2xl border-2 p-8 relative transition-all hover:shadow-xl ${
                    plano.featured
                      ? 'border-green-500 bg-white shadow-lg scale-[1.02]'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {plano.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plano.featured ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <Icon className={`w-6 h-6 ${plano.featured ? 'text-green-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plano.nome}</h3>
                      <p className="text-sm text-gray-500">{plano.subtitle}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plano.price}</span>
                    <span className="text-gray-500">{plano.period}</span>
                  </div>

                  {/* Desafio */}
                  <div className={`rounded-xl p-4 mb-6 text-sm ${
                    plano.featured ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'
                  }`}>
                    <strong className="block mb-1">⚡ O desafio:</strong>
                    {plano.desafio}
                  </div>

                  <p className="text-sm text-gray-500 mb-6 italic">{plano.ideal}</p>

                  <ul className="space-y-3 mb-8">
                    {plano.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${
                          plano.featured ? 'text-green-500' : 'text-blue-500'
                        }`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/cadoc-6209/checkout?plano=${plano.nome.toLowerCase()}`}
                    className={`block w-full text-center py-3 rounded-xl font-semibold text-white transition shadow-lg ${
                      plano.featured
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {plano.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Dúvidas Frequentes</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="bg-white rounded-xl border border-gray-200 p-6 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition" />
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para simplificar sua entrega ao BACEN?</h2>
          <p className="text-xl text-blue-200 mb-8">
            N\u00e3o deixe para a \u00faltima semana do trimestre. Automatize agora.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#planos" className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg">
              Ver Planos
            </a>
            <a href="mailto:contato@cadoc6209.com.br" className="text-blue-200 hover:text-white px-4 py-3 transition border border-blue-400 rounded-xl">
              Falar com Consultor
            </a>
            <a href="/deck" className="text-blue-200 hover:text-white px-4 py-3 transition border border-blue-400 rounded-xl">
              Ver Deck Comercial
            </a>
          </div>
          <p className="mt-6 text-sm text-blue-300">
            Baixe o deck em PowerPoint: <a href="/Deck_CADOC_6209.pptx" className="underline hover:text-white" download>Deck_CADOC_6209.pptx</a>
          </p>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>CADOC 6209 - Sistema de Conformidade BACEN</p>
        <p className="mt-1">Conforme IN BCB nº 335/2022 e IN BCB nº 622/2025 - Leiaute v2.0.4</p>
      </footer>
    </div>
  );
}

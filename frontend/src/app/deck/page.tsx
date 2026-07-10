'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Database, AlertTriangle, BarChart3, CheckCircle2, Rocket, X } from 'lucide-react';

const slides = [
  {
    title: 'CADOC 6209',
    subtitle: 'Conformidade BACEN simplificada',
    icon: Database,
    content: [
      'Sistema completo para geração do Documento 6209',
      'Pagamentos de Varejo e Canais de Atendimento',
      'Conforme IN BCB nº 335/2022 e IN BCB nº 622/2025',
      'Leiaute v2.0.4',
    ],
    color: 'from-blue-900 via-blue-800 to-indigo-900',
    textColor: 'text-white',
  },
  {
    title: 'O Problema',
    subtitle: 'Por que as instituições sofrem?',
    icon: AlertTriangle,
    content: [
      'Processo manual em planilhas -> erro e retrabalho',
      'Layout muda sem aviso (IN BCB 622/2025)',
      'Prazo trimestral apertado',
      'Multa por não entrega ou dados incorretos',
      'Departamento de compliance sobrecarregado',
    ],
    color: 'from-red-600 to-red-800',
    textColor: 'text-white',
  },
  {
    title: 'Nossa Solução',
    subtitle: 'Duas formas de resolver',
    icon: CheckCircle2,
    content: [
      '🔵 Plano Manual — R$ 997/mês',
      '  Interface web para inserção dos dados',
      '  Validação automática conforme layout',
      '  Geração dos 7 arquivos .txt',
      '',
      '🟢 Plano Automation — R$ 4.997/mês',
      '  Equipe alocada para automatizar tudo',
      '  Integração direta com core bancário e APIs',
      '  Você só acompanha o dashboard',
    ],
    color: 'from-green-600 to-green-800',
    textColor: 'text-white',
  },
  {
    title: 'Diferenciais',
    subtitle: 'Por que escolher a gente?',
    icon: BarChart3,
    content: [
      '✅ Atualização automática quando o BACEN altera o layout',
      '✅ Validação cruzada entre fontes de dados',
      '✅ Hash SHA-256 para integridade dos arquivos',
      '✅ Histórico completo de entregas',
      '✅ Suporte especializado em regulatório BACEN',
      '✅ Multi-tenant: todo o conglomerado em uma plataforma',
    ],
    color: 'from-blue-600 to-blue-800',
    textColor: 'text-white',
  },
  {
    title: 'Próximos Passos',
    subtitle: 'Comece hoje',
    icon: Rocket,
    content: [
      '📅 Agendar demonstração de 20 minutos',
      '🎁 Degustação gratuita por 15 dias',
      '📋 Onboarding em até 48h (plano Manual)',
      '🔧 Implementação em 15-45 dias (plano Automation)',
      '',
      'Chega de planilha. Chega de risco.',
      'Compliance que funciona.',
    ],
    color: 'from-purple-600 to-purple-800',
    textColor: 'text-white',
  },
];

export default function DeckPage() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl">
        <div className={`rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br ${slide.color} ${slide.textColor}`}>
          <div className="p-12 sm:p-16 min-h-[500px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold opacity-80">{slide.title}</h2>
                  <p className="text-sm opacity-60">{slide.subtitle}</p>
                </div>
              </div>

              <div className="space-y-4 text-lg leading-relaxed">
                {slide.content.map((line, i) => (
                  <p key={i} className={line === '' ? 'h-4' : 'opacity-90'}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
              <span className="text-sm opacity-50">{current + 1} / {slides.length}</span>
              <div className="flex gap-2">
                <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 disabled:opacity-30">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))} disabled={current === slides.length - 1}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 disabled:opacity-30">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

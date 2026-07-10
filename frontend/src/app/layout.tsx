import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CADOC 6209 - BACEN',
  description: 'Sistema de compliance para Pagamentos de Varejo e Canais de Atendimento - BACEN',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

# CADOC 6209 - Sistema de Compliance BACEN

Sistema completo para geração e gestão do **Documento 6209** do Banco Central do Brasil, referente a **Informações de Pagamentos de Varejo e Canais de Atendimento**, conforme Instrução Normativa BCB nº 335/2022 e alterações da IN BCB nº 622/2025.

---

## Sobre o CADOC 6209

O **Documento 6209** (CADOC 6209) é uma obrigação acessória exigida pelo Banco Central do Brasil (BACEN) das instituições financeiras autorizadas a funcionar, incluindo:

- Bancos Múltiplos
- Bancos Comerciais
- Caixas Econômicas
- Bancos Cooperativos
- Sociedades de Crédito, Financiamento e Investimento
- Sociedades de Crédito Direto (SCD)
- Sociedades de Crédito ao Microempreendedor (SCMEPP)
- Sociedades de Empréstimo entre Pessoas (SEP)
- Instituições de Pagamento autorizadas

### Arquivos do Leiaute

| Arquivo | Descrição |
|---------|-----------|
| **CONGLOME.txt** | Informações do Conglomerado |
| **USUREMOT.txt** | Usuários de Canais Remotos (Internet, Mobile, Telefone, Correspondente) |
| **ESTATCRT.txt** | Estatísticas de Cartões (Crédito, Débito) |
| **ESTATATM.txt** | Estatísticas de Terminais de Autoatendimento (ATM) |
| **TRANSOPA.txt** | Transações de Pagamento por Canal de Acesso |
| **OPEINTRA.txt** | Operações Intrabancárias (Transferências, Pagamentos) |
| **CONTATOS.txt** | Canais de Atendimento (Agências, Postos, Correspondentes) |
| **DATABASE.txt** | Metadados do arquivo gerado |

### Periodicidade

- **Frequência:** Trimestral (dados referentes ao trimestre anterior)
- **Prazo de entrega:** Até o último dia útil do mês subsequente ao trimestre de referência
- **Prazo de adequação (v2.0.4):** 31 de julho de 2025

---

## Funcionalidades

### 📊 Gestão de Dados
- Cadastro e edição de registros para todas as 7 tabelas do leiaute
- Interface intuitiva para entrada de dados quantitativos
- Visualização em tabela com todos os campos

### 📁 Geração de Arquivos
- Geração automática dos arquivos no formato TXT (delimitado por pipe `|`)
- Cálculo de hash SHA-256 para integridade
- Organização por ano/mês de referência

### 🔐 Multi-Tenant
- Cadastro de múltiplas instituições financeiras
- Isolamento completo de dados por instituição
- Controle de acesso via JWT

### 📋 Histórico e Auditoria
- Registro completo de todas as gerações de arquivos
- Rastreabilidade com hash criptográfico
- Status de cada envio

---

## Tecnologias

### Backend
- **Python 3.11** + **FastAPI**
- **SQLAlchemy** (ORM)
- **PostgreSQL** (Banco de dados)
- **JWT** (Autenticação)
- **Alembic** (Migrações)

### Frontend
- **Next.js 14** (React)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (Gráficos)
- **Lucide React** (Ícones)

### Infraestrutura
- **Docker** + **Docker Compose**
- Estrutura pronta para deploy em nuvem (Azure, AWS, GCP)

---

## Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Ou Python 3.11+ e Node.js 20+ (para execução local)

### Com Docker (Recomendado)

```bash
# Clone o repositório
git clone <seu-repositorio>
cd cadoc-6209

# Inicie os serviços
docker compose up -d

# Acesse:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Documentação API: http://localhost:8000/docs
```

### Execução Local

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
.\venv\Scripts\Activate  # Windows

pip install -r requirements.txt

# Configure o banco PostgreSQL e ajuste o .env
uvicorn app.main:app --reload --port 8000
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Cadastro de instituição |
| POST | `/api/auth/login` | Login (retorna JWT) |
| GET | `/api/auth/me` | Dados do usuário logado |
| POST | `/api/cadoc/{tabela}` | Criar registro em uma tabela |
| GET | `/api/cadoc/{tabela}` | Listar registros de uma tabela |
| POST | `/api/cadoc/gerar/{ano}/{mes}` | Gerar arquivos do período |
| GET | `/api/cadoc/envios/listar` | Histórico de envios |
| GET | `/api/health` | Health check |

### Tabelas disponíveis:
- `conglome` - Conglomerado
- `usuremot` - Usuários Remotos
- `estatcrt` - Estatísticas de Cartão
- `estatatm` - Estatísticas de ATM
- `transopa` - Transações de Pagamento
- `opeintra` - Operações Intrabancárias
- `contatos` - Canais de Atendimento

---

## Estrutura do Projeto

```
cadoc-6209/
├── backend/
│   ├── app/
│   │   ├── core/          # Config, database, security
│   │   ├── models/        # SQLAlchemy models (10 tabelas)
│   │   ├── routers/       # FastAPI routers
│   │   ├── schemas/       # Pydantic schemas
│   │   └── services/      # Lógica de negócio (geração de arquivos)
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # React components
│   │   └── lib/           # API client
│   ├── Dockerfile
│   └── package.json
├── migrations/            # Alembic migrations
├── docker-compose.yml
└── README.md
```

---

## Layout dos Arquivos

### CONGLOME.txt
```
1|CÓDIGO|NOME|CNPJ|POSSUI_CONGLOMERADO|TIPO_CONGLOMERADO
```

### USUREMOT.txt
```
1|CÓDIGO|QTD_USR_INTERNET|QTD_USR_MOBILE|QTD_USR_TEL|QTD_USR_CORRESP|...transações...
```

### TRANSOPA.txt
```
1|CÓDIGO|TIPO_PAGAMENTO|CANAL_ACESSO|QTD_TRANSACOES|VALOR|QTD_REMOTO|VALOR_REMOTO
```

> **Nota:** A IN BCB 622/2025 alterou o código 08 do campo CANAL_ACESSO para incluir transações via API, Open Finance, Banking as a Service e Iniciador de Transações de Pagamento.

---

## Licença

Este é um software proprietário para distribuição comercial a instituições financeiras.

---

## Contato

Para suporte ou demonstração, entre em contato.

---

*Conforme Instrução Normativa BCB nº 335/2022 e IN BCB nº 622/2025*
*Versão do leiaute: 2.0.4*

---

## Deploy

### Frontend (GitHub Pages)
```
https://leon-roza.github.io/cadoc-6209
```
Para atualizar:
```bash
cd frontend
NEXT_PUBLIC_API_URL=https://seu-backend.com npm run build
# Push out/ para gh-pages
```

### Backend (Local + Cloudflare Tunnel)
```powershell
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Em outro terminal:
cloudflared tunnel --url http://localhost:8000 --protocol http2
```

### Stack
- **Frontend:** Next.js 14 (TypeScript, Tailwind)
- **Backend:** FastAPI (Python 3.11)
- **Banco:** SQLite / PostgreSQL
- **Auth:** JWT
- **Tunnel:** Cloudflare

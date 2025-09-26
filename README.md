# Lucid - AI Document Reader

Uma aplicação moderna de leitura inteligente de documentos multimodais com IA, construída com React + TypeScript (frontend) e FastAPI + SQLite (backend).

## 🚀 Funcionalidades

- **Upload de Documentos**: Suporte para PDF, DOCX, TXT e imagens
- **Processamento Inteligente**: Extração de texto com OCR para imagens
- **Resumo Automático**: Geração de resumos baseados em objetivos
- **FAQ Inteligente**: Criação automática de perguntas frequentes
- **Chat Interativo**: Conversa com o documento usando IA
- **Banco de Dados**: Armazenamento local com SQLite

## 🛠️ Tecnologias

### Frontend
- React 18 + TypeScript
- Tailwind CSS para estilização
- Vite para build e desenvolvimento
- Axios para requisições HTTP

### Backend
- FastAPI (Python)
- SQLite para banco de dados
- OpenAI GPT para IA
- EasyOCR para reconhecimento de texto em imagens
- PyPDF2 para processamento de PDFs
- python-docx para documentos Word

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- Python 3.8+
- Chave da API OpenAI

### 1. Configurar Backend

```bash
cd lucid-backend

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp config_example.env .env
# Editar .env com sua chave da OpenAI:
# OPENAI_API_KEY=sua_chave_aqui
# OPENAI_MODEL=gpt-3.5-turbo

# Iniciar backend
python api_sqlite.py
```

O backend estará disponível em: http://localhost:8000
Documentação da API: http://localhost:8000/docs

### 2. Configurar Frontend

```bash
cd lucid

# Instalar dependências
npm install

# Iniciar frontend
npm run dev
```

O frontend estará disponível em: http://localhost:5173

## 🗄️ Estrutura do Banco de Dados

### Tabelas SQLite

**arquivos**
- `id` (TEXT): ID único do arquivo
- `nome` (TEXT): Nome do arquivo
- `tipo` (TEXT): Tipo/extensão do arquivo
- `tamanho_mb` (REAL): Tamanho em MB
- `paginas` (INTEGER): Número de páginas (opcional)
- `criado_em` (TIMESTAMP): Data de criação

**chats**
- `id` (TEXT): ID único da conversa
- `arquivo_id` (TEXT): Referência ao arquivo
- `pergunta` (TEXT): Pergunta do usuário
- `resposta` (TEXT): Resposta da IA
- `tokens_usados` (INTEGER): Tokens consumidos
- `criado_em` (TIMESTAMP): Data da conversa

**resumos**
- `id` (TEXT): ID único do resumo
- `arquivo_id` (TEXT): Referência ao arquivo
- `resumo` (TEXT): Texto do resumo
- `tokens_usados` (INTEGER): Tokens consumidos
- `criado_em` (TIMESTAMP): Data de criação

## 🔧 Configuração Avançada

### Supabase (Opcional)

Para usar Supabase em vez de SQLite:

1. Crie um projeto no Supabase
2. Execute o SQL em `lucid-backend/supabase_schema.sql`
3. Configure as variáveis de ambiente:
   ```
   SUPABASE_URL=sua_url_do_supabase
   SUPABASE_KEY=sua_chave_do_supabase
   ```

### Variáveis de Ambiente

**Backend (.env)**
```
OPENAI_API_KEY=sua_chave_da_openai
OPENAI_MODEL=gpt-3.5-turbo
SUPABASE_URL=sua_url_do_supabase (opcional)
SUPABASE_KEY=sua_chave_do_supabase (opcional)
```

## 📱 Como Usar

1. **Acesse a aplicação** em http://localhost:5173
2. **Faça upload** de um documento (PDF, DOCX, TXT ou imagem)
3. **Selecione um objetivo** para análise
4. **Visualize o resumo** e FAQ gerados automaticamente
5. **Inicie um chat** para fazer perguntas sobre o documento

## 🧪 Testes

```bash
# Testar backend
cd lucid-backend
python test_backend.py

# Testar upload de arquivo
curl -X POST "http://localhost:8000/upload" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@exemplo.pdf"
```

## 📁 Estrutura do Projeto

```
lucid/
├── src/
│   ├── components/          # Componentes React
│   │   ├── LandingPage.tsx
│   │   ├── UploadPage.tsx
│   │   ├── SummaryPage.tsx
│   │   └── ChatPage.tsx
│   ├── services/
│   │   └── api.ts          # Serviço de API
│   └── App.tsx             # Componente principal
├── package.json
└── tailwind.config.js

lucid-backend/
├── core/
│   ├── database_sqlite.py  # Serviço SQLite
│   ├── utils.py           # Utilitários de processamento
│   ├── summarizer.py      # Geração de resumos
│   ├── faq_generator.py   # Geração de FAQ
│   └── chat_engine.py     # Motor de chat
├── api_sqlite.py          # API FastAPI
├── requirements.txt
└── supabase_schema.sql    # Schema para Supabase
```

## 🐛 Solução de Problemas

### Backend não inicia
- Verifique se a porta 8000 está livre
- Confirme se as dependências estão instaladas
- Verifique se o arquivo .env está configurado

### Frontend não carrega
- Verifique se o backend está rodando
- Confirme se a porta 5173 está livre
- Execute `npm install` se houver erros de dependências

### Erro de API OpenAI
- Verifique se a chave da API está correta
- Confirme se há créditos disponíveis na conta OpenAI

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

**Desenvolvido com ❤️ para transformar documentos em conhecimento útil!**
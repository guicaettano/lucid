# Lucid - Transforme documentos em conhecimento

Uma aplicação de inteligência artificial que permite fazer upload de documentos, gerar resumos automáticos, FAQ e conversar com o conteúdo usando IA.

## 🏗️ Arquitetura

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python
- **IA**: OpenAI GPT-4o-mini

## 🚀 Como executar

### 1. Configurar o Backend

```bash
cd lucid-backend

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp config_example.env .env
# Edite o arquivo .env e adicione sua chave da OpenAI

# Iniciar o backend
python start_backend.py
```

O backend estará disponível em `http://localhost:8000`

### 2. Configurar o Frontend

```bash
cd lucid

# Instalar dependências
npm install

# Iniciar o frontend
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📋 Funcionalidades

### ✅ Implementadas
- Landing page moderna e responsiva
- Upload de documentos (PDF, DOC, DOCX, TXT, imagens)
- Processamento de texto via OCR
- Geração de resumos automáticos
- Geração de FAQ inteligente
- Chat conversacional com o documento
- Interface elegante inspirada no design da Apple

### 🔧 APIs Disponíveis

- `POST /upload` - Upload de arquivos
- `POST /process-text` - Processar texto digitado
- `POST /generate-summary` - Gerar resumo e FAQ
- `POST /chat` - Enviar mensagem no chat
- `GET /document/{id}` - Obter documento
- `GET /health` - Health check

## 🎨 Design

O projeto segue os princípios de design da Apple:
- Tipografia Inter e Roboto
- Espaçamento generoso
- Cores suaves e gradientes
- Interface limpa e intuitiva
- Responsivo para todos os dispositivos

## 🔑 Configuração da API

1. Obtenha uma chave da OpenAI em [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Crie um arquivo `.env` no diretório `lucid-backend`:
```
OPENAI_API_KEY=sua_chave_aqui
OPENAI_MODEL=gpt-4o-mini
```

## 📁 Estrutura do Projeto

```
Lucid1/
├── lucid/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── services/      # Serviços de API
│   │   └── ...
│   └── ...
├── lucid-backend/         # Backend FastAPI
│   ├── core/             # Módulos principais
│   ├── api.py            # API REST
│   └── ...
└── README.md
```

## 🚀 Deploy

### Backend (FastAPI)
```bash
# Usando uvicorn diretamente
uvicorn api:app --host 0.0.0.0 --port 8000

# Ou usando o script
python start_backend.py
```

### Frontend (Vite)
```bash
# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

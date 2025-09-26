const API_BASE_URL = 'http://localhost:8000'

export interface ProcessedDocument {
  document_id: string
  filename: string
  extracted_text: string
  suggested_objectives: string[]
}

export interface SummaryResponse {
  summary: string
  faqs: string[]
}

export interface ChatResponse {
  response: string
}

export interface TextInput {
  text: string
}

export interface ChatMessage {
  message: string
  session_id?: string
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      let error
      try {
        error = await response.json()
      } catch {
        error = { detail: await response.text() }
      }
      throw new Error(error.detail || 'Erro na requisição')
    }

    return response.json()
  }

  async uploadFile(file: File): Promise<ProcessedDocument> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      let error
      try {
        error = await response.json()
      } catch {
        error = { detail: 'Erro no upload' }
      }
      throw new Error(error.detail || 'Erro no upload do arquivo')
    }

    return response.json()
  }

  async processText(text: string): Promise<ProcessedDocument> {
    // Usar FormData para compatibilidade com a API que espera Form
    const formData = new FormData()
    formData.append('text', text)

    const response = await fetch(`${API_BASE_URL}/process-text`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      let error
      try {
        error = await response.json()
      } catch {
        error = { detail: 'Erro ao processar texto' }
      }
      throw new Error(error.detail || 'Erro ao processar texto')
    }

    return response.json()
  }

  async generateSummary(documentId: string, objective: string): Promise<SummaryResponse> {
    console.log('Enviando dados para generate-summary:', { 
      document_id: documentId, 
      objective: objective,
      objective_type: typeof objective 
    })

    // CORREÇÃO: Usar JSON ao invés de FormData
    const response = await fetch(`${API_BASE_URL}/generate-summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document_id: documentId,
        objective: objective || "" // Garantir string vazia se undefined/null
      }),
    })

    if (!response.ok) {
      let error
      try {
        error = await response.json()
        console.error('Erro JSON da API:', error)
      } catch {
        const errorText = await response.text()
        console.error('Erro texto da API:', errorText)
        error = { detail: errorText }
      }
      throw new Error(error.detail || `Erro HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()
    console.log('Resultado recebido do generate-summary:', result)
    return result
  }

  async sendChatMessage(message: string, sessionId: string): Promise<ChatResponse> {
    console.log('Enviando mensagem de chat:', { message: message.substring(0, 50) + '...', session_id: sessionId })
    
    return this.request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, session_id: sessionId }),
    })
  }

  async getDocument(documentId: string): Promise<ProcessedDocument> {
    return this.request<ProcessedDocument>(`/arquivos/${documentId}`)
  }

  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health')
  }

  // Métodos adicionais para listar arquivos, chats, etc.
  async getFiles(): Promise<any> {
    return this.request('/arquivos')
  }

  async getChats(fileId: string): Promise<any> {
    return this.request(`/arquivos/${fileId}/chats`)
  }

  async getSummaries(fileId: string): Promise<any> {
    return this.request(`/arquivos/${fileId}/resumos`)
  }
}

export const apiService = new ApiService()
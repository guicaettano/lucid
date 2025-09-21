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
      const error = await response.json().catch(() => ({ detail: 'Erro desconhecido' }))
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
      const error = await response.json().catch(() => ({ detail: 'Erro no upload' }))
      throw new Error(error.detail || 'Erro no upload do arquivo')
    }

    return response.json()
  }

  async processText(text: string): Promise<ProcessedDocument> {
    return this.request<ProcessedDocument>('/process-text', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
  }

  async generateSummary(documentId: string, objective: string): Promise<SummaryResponse> {
    const formData = new FormData()
    formData.append('document_id', documentId)
    formData.append('objective', objective)

    const response = await fetch(`${API_BASE_URL}/generate-summary`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Erro ao gerar resumo' }))
      throw new Error(error.detail || 'Erro ao gerar resumo')
    }

    return response.json()
  }

  async sendChatMessage(message: string, sessionId: string): Promise<ChatResponse> {
    return this.request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, session_id: sessionId }),
    })
  }

  async getDocument(documentId: string): Promise<ProcessedDocument> {
    return this.request<ProcessedDocument>(`/document/${documentId}`)
  }

  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health')
  }
}

export const apiService = new ApiService()

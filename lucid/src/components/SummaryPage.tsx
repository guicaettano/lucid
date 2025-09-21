import { useState, useEffect } from 'react'
import { apiService } from '../services/api'
import type { ProcessedDocument, SummaryResponse } from '../services/api'

interface SummaryPageProps {
  document: ProcessedDocument
  onStartChat: () => void
  onBack: () => void
}

export default function SummaryPage({ document, onStartChat, onBack }: SummaryPageProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'faq'>('summary')
  const [summaryData, setSummaryData] = useState<SummaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedObjective, setSelectedObjective] = useState<string>('')

  // Gerar resumo e FAQ quando o componente montar
  useEffect(() => {
    if (document.suggested_objectives.length > 0) {
      setSelectedObjective(document.suggested_objectives[0])
      generateSummaryAndFAQ(document.suggested_objectives[0])
    }
  }, [document])

  const generateSummaryAndFAQ = async (objective: string) => {
    setIsLoading(true)
    try {
      const result = await apiService.generateSummary(document.document_id, objective)
      setSummaryData(result)
    } catch (error) {
      alert(`Erro ao gerar resumo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleObjectiveChange = (objective: string) => {
    setSelectedObjective(objective)
    generateSummaryAndFAQ(objective)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aqui você poderia adicionar uma notificação de sucesso
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="text-2xl font-bold text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lucid
                </span>
              </div>
            </div>
            
            <button
              onClick={onStartChat}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Iniciar Chat
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        {/* Document Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{document.filename}</h1>
              <p className="text-gray-600">Processado com sucesso • Pronto para análise</p>
            </div>
          </div>
        </div>

        {/* Objective Selection */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecione o objetivo para análise:</h3>
          <div className="flex flex-wrap gap-2">
            {document.suggested_objectives.map((objective, index) => (
              <button
                key={index}
                onClick={() => handleObjectiveChange(objective)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedObjective === objective
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {objective}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('summary')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resumo Automático
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'faq'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                FAQ Inteligente
              </button>
            </nav>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-3">
                  <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-600">Gerando resumo e FAQ...</span>
                </div>
              </div>
            ) : summaryData ? (
              activeTab === 'summary' ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Resumo do Documento</h2>
                    <button
                      onClick={() => copyToClipboard(summaryData.summary)}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copiar</span>
                    </button>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                        {summaryData.summary}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Perguntas Frequentes</h2>
                    <button
                      onClick={() => copyToClipboard(summaryData.faqs.join('\n\n'))}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copiar FAQ</span>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {summaryData.faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6">
                        <p className="text-gray-800 leading-relaxed">
                          {faq}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Selecione um objetivo para gerar o resumo e FAQ</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStartChat}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Conversar com o Documento
          </button>
          
          <button
            onClick={() => window.print()}
            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            Imprimir Resumo
          </button>
        </div>
      </div>
    </div>
  )
}

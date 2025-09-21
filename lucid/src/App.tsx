import { useState } from 'react'
import LandingPage from './components/LandingPage'
import UploadPage from './components/UploadPage'
import SummaryPage from './components/SummaryPage'
import ChatPage from './components/ChatPage'
import type { ProcessedDocument } from './services/api'

type Page = 'landing' | 'upload' | 'summary' | 'chat'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [processedDocument, setProcessedDocument] = useState<ProcessedDocument | null>(null)

  const handleGetStarted = () => {
    setCurrentPage('upload')
  }

  const handleFileUploaded = (document: ProcessedDocument) => {
    setProcessedDocument(document)
    setCurrentPage('summary')
  }

  const handleStartChat = () => {
    setCurrentPage('chat')
  }

  const handleBack = () => {
    if (currentPage === 'upload') {
      setCurrentPage('landing')
    } else if (currentPage === 'summary') {
      setCurrentPage('upload')
    } else if (currentPage === 'chat') {
      setCurrentPage('summary')
    }
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />
      case 'upload':
        return <UploadPage onFileUploaded={handleFileUploaded} onBack={handleBack} />
      case 'summary':
        return processedDocument ? (
          <SummaryPage
            document={processedDocument}
            onStartChat={handleStartChat}
            onBack={handleBack}
          />
        ) : (
          <div>Erro: Documento não encontrado</div>
        )
      case 'chat':
        return processedDocument ? (
          <ChatPage
            document={processedDocument}
            onBack={handleBack}
          />
        ) : (
          <div>Erro: Documento não encontrado</div>
        )
      default:
        return <LandingPage onGetStarted={handleGetStarted} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {renderCurrentPage()}
    </div>
  )
}

export default App

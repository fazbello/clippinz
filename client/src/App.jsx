import { useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState(null)

  const checkServerHealth = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({ error: 'Server not reachable' })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ClipAI</h1>
        <h2>TikTok + Azure OpenAI Prototype</h2>
        <p>This is a demo UI scaffold for the ClipAI project</p>
        
        <div className="features">
          <h3>Planned Features (Placeholders):</h3>
          <ul>
            <li>📹 Video upload and clipping with FFmpeg</li>
            <li>🎙️ Transcription via Azure OpenAI Whisper</li>
            <li>✍️ AI-powered script generation</li>
            <li>📱 TikTok integration (requires developer app)</li>
          </ul>
        </div>

        <div className="actions">
          <button onClick={checkServerHealth}>Check Server Health</button>
          {status && (
            <pre className="status">
              {JSON.stringify(status, null, 2)}
            </pre>
          )}
        </div>

        <div className="notes">
          <h3>⚠️ Important Notes:</h3>
          <ul>
            <li>TikTok integration is a placeholder - requires TikTok developer app registration</li>
            <li>Azure OpenAI hooks are placeholders - requires Azure account and API keys</li>
            <li>OAuth, database, job queue, and secret management are NOT implemented</li>
            <li>This is a development scaffold, not production-ready</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App

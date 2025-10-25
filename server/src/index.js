import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ClipAI Server' });
});

// Placeholder: Azure OpenAI integration
app.post('/api/transcribe', (req, res) => {
  // TODO: Implement Azure OpenAI Whisper transcription
  res.json({ 
    message: 'Azure OpenAI transcription endpoint (placeholder)',
    note: 'Requires AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY'
  });
});

// Placeholder: Script generation with Azure OpenAI
app.post('/api/generate-script', (req, res) => {
  // TODO: Implement Azure OpenAI script generation
  res.json({ 
    message: 'Azure OpenAI script generation endpoint (placeholder)',
    note: 'Requires AZURE_OPENAI_ENDPOINT and AZURE_OPENAI_KEY'
  });
});

// Placeholder: TikTok integration
app.post('/api/tiktok/upload', (req, res) => {
  // TODO: Implement TikTok upload via TikTok API
  res.json({ 
    message: 'TikTok upload endpoint (placeholder)',
    note: 'Requires TikTok developer app registration and OAuth implementation'
  });
});

// Placeholder: Video processing
app.post('/api/clip', (req, res) => {
  // TODO: Implement FFmpeg-based video clipping
  res.json({ 
    message: 'Video clipping endpoint (placeholder)',
    note: 'Requires FFmpeg installation and video storage configuration'
  });
});

app.listen(PORT, () => {
  console.log(`ClipAI Server running on port ${PORT}`);
  console.log('Note: This is a scaffold with placeholder endpoints');
});

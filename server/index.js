const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const upload = multer({ dest: 'uploads/' });
const ffmpegWorker = require('./ffmpegWorker');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'no file' });

    const id = uuidv4();
    const saved = {
      id,
      originalPath: file.path,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
    };

    // TODO: in production upload to S3 or Azure Blob and return public URL or storage key
    res.json({ file: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'upload failed' });
  }
});

// Create a trimmed clip using ffmpeg worker
app.post('/api/clip', async (req, res) => {
  const { sourcePath, startSec, duration, template } = req.body;
  if (!sourcePath || startSec == null || !duration) {
    return res.status(400).json({ error: 'missing args' });
  }
  try {
    const outPath = await ffmpegWorker.trimClip(sourcePath, startSec, duration, template);
    res.json({ clipPath: outPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'clip failed' });
  }
});

// Transcription: choose between local Whisper or Azure OpenAI
app.post('/api/transcribe', async (req, res) => {
  const { sourcePath, provider } = req.body;
  if (!sourcePath) return res.status(400).json({ error: 'missing sourcePath' });

  try {
    if (provider === 'local') {
      // Placeholder: run local whisper binary / python script and return output (implement securely)
      // Example: use child_process to call whisper.cpp or faster-whisper wrapper
      return res.json({ transcription: 'Local Whisper placeholder', segments: [] });
    } else {
      // Azure OpenAI transcription sample (file must be uploaded or accessible)
      // NOTE: In production we would stream file to Azure Speech or use Azure's REST/SDKs
      return res.json({ transcription: 'Azure OpenAI transcription placeholder', segments: [] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'transcription failed' });
  }
});

// Script generation via Azure OpenAI
app.post('/api/generate-script', async (req, res) => {
  const { transcription, tone, length } = req.body;
  if (!transcription) return res.status(400).json({ error: 'missing transcription' });

  // In production: call Azure OpenAI chat/completions endpoint with a prompt to create highlights/script
  // Placeholder response
  res.json({
    script: `AI-generated script placeholder for tone=${tone} and length=${length}.`
  });
});

// TikTok upload placeholder endpoint
app.post('/api/tiktok/upload', async (req, res) => {
  // This endpoint is a placeholder. TikTok requires an OAuth flow and app review.
  res.status(501).json({ error: 'TikTok upload not implemented. Requires developer app and OAuth flow.' });
});

// Serve uploads for dev
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

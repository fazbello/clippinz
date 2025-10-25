import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [file, setFile] = useState(null);
  const [uploadResp, setUploadResp] = useState(null);

  async function upload() {
    if (!file) return alert('choose a file');
    const fd = new FormData();
    fd.append('file', file);
    const resp = await axios.post('/api/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setUploadResp(resp.data);
  }

  async function makeClip() {
    if (!uploadResp) return alert('upload first');
    const resp = await axios.post('/api/clip', {
      sourcePath: uploadResp.file.originalPath,
      startSec: 0,
      duration: 15
    });
    alert('Clip created: ' + JSON.stringify(resp.data));
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>ClipAI Prototype — TikTok + Azure OpenAI</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <div style={{ marginTop: 12 }}>
        <button onClick={upload}>Upload</button>
        <button onClick={makeClip} disabled={!uploadResp}>Make 15s Clip</button>
      </div>
      <pre>{uploadResp && JSON.stringify(uploadResp, null, 2)}</pre>
    </div>
  );
}
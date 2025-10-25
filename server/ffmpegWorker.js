const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function trimClip(sourcePath, startSec, duration, template) {
  return new Promise((resolve, reject) => {
    const outDir = path.join(process.cwd(), 'clips');
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, `${uuidv4()}.mp4`);

    const proc = ffmpeg(sourcePath)
      .setStartTime(startSec)
      .duration(duration)
      .outputOptions('-c:v libx264', '-preset veryfast', '-c:a aac')
      .on('start', (cmd) => console.log('ffmpeg start', cmd))
      .on('error', (err) => {
        console.error('ffmpeg error', err);
        reject(err);
      })
      .on('end', () => {
        resolve(outFile);
      })
      .save(outFile);
  });
}

module.exports = {
  trimClip
};

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

function getOsRelease() {
  try {
    const content = fs.readFileSync('/etc/os-release', 'utf8');
    const fields = {};
    for (const line of content.split('\n')) {
      const match = line.match(/^([^=]+)="?([^"]*)"?$/);
      if (match) fields[match[1]] = match[2];
    }
    return fields.PRETTY_NAME || fields.NAME || 'unknown';
  } catch {
    return 'unavailable';
  }
}

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Container Workshop!',
    status: 'ok',
    uid: process.getuid(),
    os: getOsRelease(),
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

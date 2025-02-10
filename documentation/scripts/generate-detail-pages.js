const fs = require('fs');
const path = require('path');
const https = require('https');

async function fetchMCPServers() {
  return new Promise((resolve, reject) => {
    https.get('https://raw.githubusercontent.com/goose-ai/goose-servers/main/servers.json', (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const servers = JSON.parse(data);
          resolve(servers);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function generateDetailPages() {
  try {
    const servers = await fetchMCPServers();
    const detailTemplate = fs.readFileSync(
      path.join(__dirname, '../src/pages/extensions/_detail.tsx'),
      'utf-8'
    );

    // Create detail directory if it doesn't exist
    const detailDir = path.join(__dirname, '../src/pages/extensions/detail');
    if (!fs.existsSync(detailDir)) {
      fs.mkdirSync(detailDir, { recursive: true });
    }

    // Generate a page for each server
    for (const server of servers) {
      const pagePath = path.join(detailDir, `${server.id}.tsx`);
      fs.writeFileSync(pagePath, detailTemplate);
    }

    console.log(`Generated ${servers.length} detail pages`);
  } catch (error) {
    console.error('Error generating detail pages:', error);
    process.exit(1);
  }
}

generateDetailPages();
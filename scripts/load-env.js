const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '..', '.env');
const apiKeyPath = path.resolve(
  __dirname,
  '..',
  'src',
  'environments',
  'api-key.ts'
);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const apiKey = process.env.GOOGLE_BOOKS_API_KEY || '';

fs.writeFileSync(
  apiKeyPath,
  `export const googleBooksApiKey = ${JSON.stringify(apiKey)};\n`
);

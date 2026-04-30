
const AIRTABLE_BASE = 'appdqBZtxDVSZmG0Z';

const AIRTABLE_TOKEN = 'patOp4nSGoeBPi5m3.1cb5c869b39c91ff2581011e54d425537944d05de60e7998e3c78ae8c3cc58e2';

const ALLOWED_TABLES = [

  'tblqBciXC0NIJtjjt',

  'tblvSNrMok04PGCcF',

  'tblTU0tKt3dSGgPsE',

  'tblcomJtwIVel4Acq',

];

const CORS_HEADERS = {

  'Access-Control-Allow-Origin': '*',

  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',

  'Access-Control-Allow-Headers': 'Content-Type, Authorization',

};

export default {

  async fetch(request, env) {

    if (request.method === 'OPTIONS') {

      return new Response(null, { status: 204, headers: CORS_HEADERS });

    }

    const url = new URL(request.url);

    const parts = url.pathname.split('/').filter(Boolean);

    if (parts[0] !== 'proxy' || !parts[1]) {

      return new Response(JSON.stringify({ error: 'Invalid path' }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });

    }

    const tableId = parts[1];

    if (!ALLOWED_TABLES.includes(tableId)) {

      return new Response(JSON.stringify({ error: 'Table not allowed' }), { status: 403, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });

    }

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE}/${tableId}${url.search}`;

    const airtableRes = await fetch(airtableUrl, {

      method: request.method,

      headers: { 'Authorization': `Bearer ${AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' },

      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined,

    });

    const data = await airtableRes.text();

    return new Response(data, { status: airtableRes.status, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });

  }

};


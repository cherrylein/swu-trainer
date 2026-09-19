export default {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    if (request.method !== 'GET') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET' } });
    if (path === '/api/health') return Response.json({ status: 'ok', app: 'swu-trainer' });
    return Response.json({ error: 'Not found' }, { status: 404 });
  },
} satisfies ExportedHandler<Env>;

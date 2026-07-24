const request = require('supertest');
const { app } = require('./server');

describe('Page Pulse API Tests', () => {

  // 1. Happy Path Test
  test('GET /api/audit - Success on valid URL (Happy Path)', async () => {
    const res = await request(app).get('/api/audit?url=https://example.com');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('status', 200);
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data).toHaveProperty('responseTimeMs');
  }, 10000);

  // 2. Failure Case 1: Missing URL Parameter (400)
  test('GET /api/audit - Returns 400 when URL param is missing', async () => {
    const res = await request(app).get('/api/audit');
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty('error');
  });

  // 3. Failure Case 2: Invalid URL Format (400)
  test('GET /api/audit - Returns 400 for malformed URL string', async () => {
    const res = await request(app).get('/api/audit?url=invalid-url-format');
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  // 4. Failure Case 3: Invalid Domain (502)
  test('GET /api/audit - Returns 502 for non-existent target domain', async () => {
    const res = await request(app).get('/api/audit?url=https://this-domain-does-not-exist-999.com');
    
    expect(res.statusCode).toEqual(502);
    expect(res.body.success).toBe(false);
  }, 10000);

});
const request = require('supertest');
const { app, payments } = require('../server');

describe('payment flow', () => {
  test('generates and verifies a code', async () => {
    const res = await request(app).post('/payment-code');
    expect(res.statusCode).toBe(200);
    const { code } = res.body;
    expect(code).toBeDefined();

    const verify = await request(app).get(`/verify/${code}`);
    expect(verify.statusCode).toBe(200);
    expect(verify.body.verified).toBe(true);
    expect(payments.get(code).verified).toBe(true);
  });
});

describe('site pages', () => {
  const pages = [
    ['/', 'Welcome Capsuleer'],
    ['/testimonials', 'Player Testimonials'],
    ['/economy', 'Economy Watch'],
    ['/battles', 'Major Battles of the Week'],
    ['/alliances', 'Guilds & Alliances'],
    ['/subscribe', 'Subscribe with ISK or PLEX']
  ];

  test.each(pages)('GET %s returns content', async (url, text) => {
    const res = await request(app).get(url);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(text);
    expect(res.text).toContain('<nav>');
    expect(res.text).toContain('href="/"');
  });
});

import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('app.ts test', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  })

  afterEach(() => {
    process.env = { ...originalEnv };
  })

  const updateNodeENv = (newNodeEnv: string) => {
    process.env.NODE_ENV = newNodeEnv;
  }

  it('in development GET /test should return 200', async () => {
    updateNodeENv('development');
    const { default: app } = require('../src/app');
    const res = await request(app).get('/test');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('hello Express');
  });

  it('in not development GET /test should return 404', async () => {
    updateNodeENv('not_develop');
    const { default: app } = require('../src/app');
    const res = await request(app).get('/test');
    expect(res.statusCode).toBe(404);
  });
});
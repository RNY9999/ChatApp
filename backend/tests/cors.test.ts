import path from 'path';

describe('CORS設定の動作テスト', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // モジュールキャッシュをクリア
    process.env = { ...originalEnv }; // 環境変数をバックアップ
  });

  afterEach(() => {
    process.env = originalEnv; // テスト後に元に戻す
  });

  const runWithEnv = (env: Partial<NodeJS.ProcessEnv>) => {
    Object.assign(process.env, env); // 環境変数を上書き
    return require(path.resolve(__dirname, '../src/config/cors')).corsOptions;
  };

  it('development の場合、DEV_系URLが含まれる', () => {
    const corsOptions = runWithEnv({
      NODE_ENV: 'development',
      DEV_FRONTEND_URL: 'http://dev.frontend.com',
      DEV_ADMIN_URL: 'http://dev.admin.com',
    });
    expect(corsOptions.origin).toContain('http://dev.frontend.com');
    expect(corsOptions.origin).toContain('http://dev.admin.com');
  });

  it('staging の場合、STG_系URLが含まれる', () => {
    const corsOptions = runWithEnv({
      NODE_ENV: 'staging',
      STG_FRONTEND_URL: 'http://stg.frontend.com',
      STG_ADMIN_URL: 'http://stg.admin.com',
    });
    expect(corsOptions.origin).toContain('http://stg.frontend.com');
    expect(corsOptions.origin).toContain('http://stg.admin.com');
  });

  it('production の場合、PRD_系URLが含まれる', () => {
    const corsOptions = runWithEnv({
      NODE_ENV: 'production',
      PRD_FRONTEND_URL: 'http://prd.frontend.com',
      PRD_ADMIN_URL: 'http://prd.admin.com',
    });
    expect(corsOptions.origin).toContain('http://prd.frontend.com');
    expect(corsOptions.origin).toContain('http://prd.admin.com');
  });

  it('NODE_ENVが不明な場合、originは空配列になる', () => {
    const corsOptions = runWithEnv({
      NODE_ENV: 'unknown_env',
    });
    expect(corsOptions.origin).toEqual([]);
  });
});

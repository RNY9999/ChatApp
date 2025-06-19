// NODE_ENVによって参照する情報の切替
let FRONTEND_URL: string | undefined;
let ADMIN_URL : string | undefined;

switch (process.env.NODE_ENV) {
  case 'development':
    FRONTEND_URL = process.env.DEV_FRONTEND_URL;
    ADMIN_URL = process.env.DEV_ADMIN_URL;
    break;
  case 'staging':
    FRONTEND_URL = process.env.STG_FRONTEND_URL;
    ADMIN_URL = process.env.STG_ADMIN_URL;
    break;
  case 'production':
    FRONTEND_URL = process.env.PRD_FRONTEND_URL;
    ADMIN_URL = process.env.PRD_ADMIN_URL;
    break;
  default: // MODE_ENVが上記以外（見つからなかった場合）
    FRONTEND_URL = undefined;
    ADMIN_URL = undefined;
    break;
}

const allowedOrigins: string[] =  [];
if (FRONTEND_URL) {
  allowedOrigins.push(FRONTEND_URL);
};
if (ADMIN_URL) {
  allowedOrigins.push(ADMIN_URL);
}

// 開発時のみ許可オリジンのリストを表示
if (process.env.NODE_ENV === 'development') {
  console.log(`■CORS設定\nallowedOrigins: ${allowedOrigins}`);
}

const corsOptions = {
  origin: allowedOrigins.filter(Boolean),
  credentials: true, // cookieや認証ヘッダの送受信を許可
}

export default corsOptions;
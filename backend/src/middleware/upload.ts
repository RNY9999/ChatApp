import multer from "multer";
import path from "path";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// アップロードディレクトリを作成する関数
const ensureDirectoryExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// バナー用のストレージ設定
const bannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/banner');
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // ファイル名: UUID.拡張子
    const uuid = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uuid}${ext}`);
  }
});

// アイコン用のストレージ設定
const iconStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/icon');
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // ファイル名 UUID.拡張子
    const uuid = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uuid}${ext}`);
  }
});

// ファイルフィルター（画像のみ許可）
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('画像ファイルのみアップロード可能です'));
  }
};

// multerの設定
const uploadBanner = multer({
  storage: bannerStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB制限
  }
});

const uploadIcon = multer({
  storage: iconStorage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB制限
  }
});

export { uploadBanner, uploadIcon };
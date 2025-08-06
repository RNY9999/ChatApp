import { Request, Response, NextFunction } from "express";

/**
 * 
 * @param fn ラッパー対象の非同期関数
 * ・非同期関数を引数として受け取る
 * ・「=> Promise<any>」は関数の戻り値として、Promiseを返す = 非同期関数であることを意味する
 * ・nextはExpressのエラーハンドリング関数
 * @returns 
 */
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  }
}

export default asyncHandler;
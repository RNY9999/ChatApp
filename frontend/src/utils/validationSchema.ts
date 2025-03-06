import * as z from 'zod';
// zodによるschemaの定義

const validationSchema = z
  .object({
    userName: z
      .string()
      .min(3, 'ユーザーネームは3文字以上で設定してください')
      .max(20, 'ユーザーネームは20文字以下で設定してください')
      .regex(/^[a-zA-Z0-9!-/:-@[-`{-~]*$/, 'ユーザーネームは英数字、及び特定の記号のみで設定してください'),
    password: z
      .string()
      .min(6, 'パスワードは6文字以上で設定してください')
      .max(20, 'パスワードは20文字以下で設定してください')
      .regex(/^[a-zA-Z0-9!-/:-@[-`{-~]*$/, 'パスワードは英数字、及び特定の記号のみで設定してください'),
  });

export default validationSchema;
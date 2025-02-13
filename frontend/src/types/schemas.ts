import * as z from 'zod';
// zodによるschemaの定義

const schema = z
  .object({
    userName: z
      .string()
      .min(3, 'ユーザーネームは3文字以上で入力してください')
      .max(20, 'ユーザーネームは20文字以下で入力してください')
      .regex(/^[a-zA-Z0-9!-/:-@[-`{-~]*$/, 'ユーザーネームは英数字、及び特定の記号のみで入力してください'),
  });

export default schema;
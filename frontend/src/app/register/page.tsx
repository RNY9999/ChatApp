'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import validationSchema from '../../utils/validationSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import axiosBase from 'axios';
import './register.css';

type RegisterValues = {
  userName: string;
  password: string;
}

const axios = axiosBase.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-Width': 'XMLHttpRequest',
  },
  responseType: 'json',
});

const Register = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm<RegisterValues>({
    mode: 'onChange', 
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<RegisterValues> = async (data) => {
    // awaitでサーバと通信
    // await postData(data);
    // dotenvからMESSAGEを取得
    console.log(process.env.NEXT_PUBLIC_DEV_SERVER_URL);
    console.log(data);
    try {
      const response = await axios.post('/api/users/register', data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  // buttonがアクティブするかどうかの条件
  const [buttonStatus, setButtonStatus] = useState('false');

  // console.log(watch('userName'));

  return (
    <>
      <header className="header"></header>
      <main className="main">
        <form action="#" onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="register-form__title-area">
            <h1 className="register-form__title">
              新規登録
            </h1>
          </div>
          <div className="register-form__input-area">
            <div className="text-form">
              <label htmlFor="userName" className="text-form__label">
                ユーザー名
              </label>
              <input 
                type="text" 
                id="userName" 
                defaultValue={ watch('userName') }
                className="text-form__input"
                { ...register('userName') }
              />
              { errors.userName?.message && 
              <p className="text-form__usrName">
                { errors.userName?.message as string}
              </p> }
              <p className="text-form__supporting-text">
                ユーザ名として使用できる文字は半角英数字と記号です。
              </p>
            </div>
            <div className="text-form">
              <label htmlFor="password" className="text-form__label">
                パスワード
              </label>
              <input 
                type="text" 
                id="password" 
                defaultValue={ watch('password') }
                className="text-form__input"
                { ...register('password') }
              />
              { errors.password?.message && 
              <p className="text-form__usrName">
                { errors.password?.message as string}
              </p> }
              <p className="text-form__supporting-text">
                パスワードは半角英数字と記号を組み合わせてください。<br />
                また、6文字以上で設定してください。
              </p>
            </div>
          </div>
          <div className="register-form__submit-button-area">
            <input 
              type="submit"
              value='登録'
              className="register-form__submit-button"
            />
          </div>
        </form>
      </main>
      <footer className="footer"></footer>
    </>
    // <div className="register-page">
    //   <form onSubmit={handleSubmit(onSubmit)} className="register-form">
    //     <input {...register('userName')} className="register-form__input"/>
    //     <p>{ errors.userName?.message }</p>
    //     <button type='submit'>送信</button>
    //   </form>
    // </div>
  )
};

export default Register;
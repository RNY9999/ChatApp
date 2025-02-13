'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import validationSchema from '../../utils/validationSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import Link from 'next/link';
import './register.css';

// components
import InputArea from '../../components/inputArea/inputArea';

// icons
import { FaRegCircleUser } from "react-icons/fa6";
import { watch } from 'fs';
import { Resolver } from 'dns';

// react-hook-form用の型設定ｓ
type RegisterInformation = {
  userName: string,
  password: string,
};
const Register = () => {
  // react-hook-formの設定
  const { 
    register,
    handleSubmit,
    watch,
    formState: { errors } 
  } = useForm<RegisterInformation>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<RegisterInformation> = (data) => {
    console.log(data);
  };

  console.log(watch('userName'));


  const [pageMessage, setPageMessage] = useState('');
  const [pageMessageClass, setPageMessageClass ] = useState('register-page__message --hidden');

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <input {...register('userName')} className="register-form__input"/>
        <p>{ errors.userName?.message }</p>
        <button type='submit'>送信</button>
      </form>
    </div>
  )
};

export default Register;
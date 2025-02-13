'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from '../../types/schemas';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import Link from 'next/link';
import './register.css';

// components
import InputArea from '../../components/inputArea/inputArea';

// icons
import { FaRegCircleUser } from "react-icons/fa6";
import { watch } from 'fs';

// react-hook-form用の型設定
type RegisterInformation = {
  userName: string,
  password: string,
};
const Register = () => {
  // react-hook-formの設定
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInformation>(resolver: zodResolver(schema));
  const onSubmit: SubmitHandler<RegisterInformation> = (data) => {
    console.log(data);
  };

  console.log(watch('userName'));


  const [pageMessage, setPageMessage] = useState('');
  const [pageMessageClass, setPageMessageClass ] = useState('register-page__message --hidden');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue='testUser' {...register('userName', {required: true})} />
      {errors.userName && <span>This field is required</span>}
      <button type='submit'>送信</button>
    </form>
  )
};

export default Register;
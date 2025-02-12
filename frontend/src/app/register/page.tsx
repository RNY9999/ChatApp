'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './register.css';

// components
import InputArea from '../../components/inputArea/inputArea';

// icons
import { FaRegCircleUser } from "react-icons/fa6";

const Register = () => {
  const [userName, setUserName] = useState('');
  const [userNameSupportingText, setUserNameSupportingText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSupportingText, setPasswordSupportingText] = useState('');
  const [userNameIsAttention, setUserNameIsAttention] = useState(false);
  const [passwordIsAttention, setPasswordIsAttention] = useState(false);
  const [pageMessage, setPageMessage] = useState('');
  const [pageMessageClass, setPageMessageClass] = useState('login-page__message --hidden');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン処理をここに追加
    console.log('userName:', userName);
    console.log('Password:', password);

    // userNameまたpasswordが入力されていない場合
    if (!userName || !password) {
      if (!userName) {
        setUserNameSupportingText('ユーザーネームを入力してください');
        setUserNameIsAttention(true);
      }
      // passwordが入力されていない場合
      if (!password) {
        setPasswordSupportingText('パスワードを入力してください');
        setPasswordIsAttention(true);
      }
      return;
    }

    // ログイン処理を追加
    // ログイン処理が成功した場合は、トップページに遷移
    let loginCheck = false; // 本来はバックエンドとの通信を行った結果loginCheckで受け取る
    if(userName === 'test' && password === 'test') {
      loginCheck = true;
    }
    if (loginCheck) {
      // /topに遷移
      window.location.href = '/top';
    } else {
      // ログイン処理が失敗した場合は、エラーメッセージを表示
      setPageMessage('ユーザーネームまたはパスワードが間違っています');
      setPageMessageClass('login-page__message');
    }
    // ログイン処理が失敗した場合は、エラーメッセージを表示


    

  };

  return (
    <div className="login-page">
      <div className='login-modal'>
        <div className="login-modal__title">
          <FaRegCircleUser className='login-modal__icon'/>
          <h1 className="login-modal__title">ログイン</h1>
        </div>
        <p className={pageMessageClass}>
          {pageMessage}
        </p>
        <form action="" onSubmit={handleSubmit} className="login-form">
          <div className="login-form__input-area">
            <InputArea
              type="text"
              labelName="ユーザーネーム"
              name="userName"
              haveAttention={userNameIsAttention}
              setHaveAttention={setUserNameIsAttention}
              supportingText={userNameSupportingText}
              setSupValue={setUserNameSupportingText}
              value={userName}
              setValue={setUserName}
              options={[
                {
                  pageName: 'login',
                  optionValueContent: '',
                  setOptionValue: setPageMessage
                },
                {
                  pageName: 'login',
                  optionValueContent: 'login-page__message --hidden',
                  setOptionValue: setPageMessageClass
                }
              ]}
            />
            <InputArea
              type="password"
              labelName="パスワード"
              name="userPassword"
              haveAttention={passwordIsAttention}
              setHaveAttention={setPasswordIsAttention}
              supportingText={passwordSupportingText}
              setSupValue={setPasswordSupportingText}
              value={password}
              setValue={setPassword}
              haveIcon={true}
              options={[
                {
                  pageName: 'login',
                  optionValueContent: '',
                  setOptionValue: setPageMessage
                },
                {
                  pageName: 'login',
                  optionValueContent: 'login-page__message --hidden',
                  setOptionValue: setPageMessageClass
                }
              ]}
            />
          </div>
          <button type="submit" className="login-modal__submit">ログイン</button>
        </form>
        <div className="registration-area">
          <p className="registration-area__text">
            アカウントをおもちでないですか？
          </p>
          <Link href="/registration" className="registration-area__link">
            新規登録はこちらから
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
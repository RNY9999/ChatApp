import React, { useState } from 'react';
import Link from 'next/link';
import './inputArea.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type StringOption = {
  pageName?: string;
  optionValueContent?: string;
  setOptionValue?: (value: string) => void;
}
/**
 * InputArea()は引数にinputのtypeを受け取る
 * propsの説明
 * 
 */
type Props = {
  type: string;
  labelName: string;
  name: string;
  haveAttention?: boolean;
  setHaveAttention?: (value: boolean) => void;
  supportingText?: string; // ?を付けることで任意の引数になる
  setSupValue?: (value: string) => void;
  value: string;
  setValue?: (value: string) => void;
  haveIcon?: boolean;
  options?: StringOption[];
};

function InputArea({ type, labelName, name, haveAttention, setHaveAttention, supportingText, setSupValue,  value, setValue, haveIcon, options }: Readonly<Props>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // classNameの設定
  // className: input-area__input
  let inputAreaInput: string = 'input-area__input';
  if (haveIcon) {
    inputAreaInput += ' --have-icon';
  }
  if (haveAttention) {
    inputAreaInput += ' --attention';
  }

  // className: input-area__supporting-text
  let inputAreaSupportingText: string = 'input-area__supporting-text';
  if (haveAttention) {
    inputAreaSupportingText += ' --attention';
  }

  const isPasswordFlag: boolean = type === 'password';

  // onChange用の関数
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    if (setValue) {
      setValue(e.target.value);
    }

    if (haveAttention) {
      if (setHaveAttention) {
        // attentionの解除
        setHaveAttention(false);
      }
      if(setSupValue) {
        // supportingTextの初期化
        setSupValue('');
      }
    }

    if (options) {
      options.forEach(option => {
        if (option.pageName === 'login') {
          if (option.setOptionValue) {
            option.setOptionValue(option.optionValueContent ? option.optionValueContent : '');
          }
        }
      })
    }

  }

  return(
    <div className="input-area"> 
      <div className="input-area__label-area">
        <label htmlFor={name} className="input-area__label">{labelName}</label>
        {isPasswordFlag && (
          <Link href="/forgatPassword" className="input-area__forgat-password">パスワードを忘れた方はこちら</Link>
        )}
      </div>
      <div className={inputAreaInput}>
        <input
          type={isPasswordFlag && isPasswordVisible ? 'text' : type}
          name={name}
          className="input-area__input-field"
          value={value} //setValueがある場合のみ実行
          onChange={(e) => onChangeValue(e)} //setValueがある場合のみ実行
        />
        {haveIcon && (
          <button
            type="button"
            className="input-area__password-toggle"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <FaEyeSlash className="input-area__icon"/> : <FaEye className="input-area__icon"/>}
          </button>
        )}
      </div>
        
      <p className={inputAreaSupportingText}>{supportingText}</p>
      
    </div>
  );
}

export default InputArea;
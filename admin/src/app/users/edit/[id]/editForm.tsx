'use client';
import axios from '@utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@projectTypes/index';
import validationSchema from '@utils/validationSchema';
import { RegisterUser } from '@projectTypes/index'
import { useForm, SubmitHandler } from 'react-hook-form';


const EditForm = ({user}: {user: User}) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterUser>({
        mode: 'onChange',
        resolver: zodResolver(validationSchema),
        defaultValues: {
            username: user.username,
            password: user.password,
        }
    })

    const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
        console.log('update user info');
        console.log(data);
        console.log('==========');

        try {
            // axiosでの処理
            console.log('updated!');
        } catch (error) {
            console.error('catch error in update user info:', error);
        }
    };
    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} className='edit-form'>
            <div className="edit-form__form">
                <label htmlFor="username" className='edit-form__label'>ユーザー名</label>
                <input type="text" id='username' defaultValue={ watch('username')} className='edit-form__input-area' { ...register('username') }/>
                { errors.username?.message && 
                <p className="edit-form__error-text">
                    { errors.username.message}
                </p>
                }
            </div>
            <div className="edit-form__form">
                <label htmlFor="password" className='edit-form__label'>パスワード</label>
                <input type="text" id='password' defaultValue={ watch('password')} className='edit-form__input-area' { ...register('password') }/>
                { errors.password?.message && 
                <p className="edit-form__error-text">
                    { errors.password.message}
                </p>
                }
            </div>
            <fieldset className="edit-form__form">
                <legend className='edit-form__legend'>アカウントのステータス</legend>
                <label htmlFor='isDeleted' className='edit-form__radio-label'>
                    <input type="radio" name="deleted" id='isDeleted' value={"停止"} defaultChecked={ user.deleted} className='edit-form__radio-area'/>
                    <span className='edit-form__custom-radio'></span>
                    <p>停止</p>
                </label>
                <label htmlFor='isActive' className='edit-form__radio-label'>
                    <input type="radio" name="deleted" id='isActive' value={"アクティブ"} defaultChecked={ !user.deleted} className='edit-form__radio-area --none'/>
                    <span className='edit-form__custom-radio'></span>
                    <p>アクティブ</p>
                </label>
            </fieldset>
                <input type="submit" value="確認" className='edit-form__submit' />
        </form>
    );
}

export default EditForm;

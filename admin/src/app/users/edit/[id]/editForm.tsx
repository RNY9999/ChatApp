'use client';
import axios from '@utils/axiosInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@projectTypes/index';
import validationSchema from '@utils/validationSchema';
import { RegisterUser } from '@projectTypes/index'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const EditForm = ({user}: {user: User}) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterUser>({
        mode: 'onChange',
        resolver: zodResolver(validationSchema),
        defaultValues: {
            username: user.username,
            password: user.password,
            deleted: String(user.deleted),
        }
    })

    const isDisable = useMemo(() => {
        return !!(errors.username || errors.password || errors.deleted);
    }, [errors.username, errors.password, errors.deleted]);

    const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
        console.log('update user info');
        console.log(data);
        console.log('==========');

        try {
            // axiosでの処理
            await axios.put(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/api/users/update/${user.id}`, data);
            router.push(`/users/detail/${user.id}`);
            console.log('updated!');
        } catch (error) {
            console.error('catch error in update user info:', error);
        }
    };
    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} className='edit-form'>
            <div className="edit-form__form">
                <label htmlFor="username" className='edit-form__label'>ユーザー名</label>
                <input type="text" id='username' className={`edit-form__input-area${errors.username?.message  ? ' --error' : ''}`} { ...register('username') }/>
                { errors.username?.message && 
                <p className="edit-form__supporting-text --error">
                    { errors.username.message}
                </p>
                }
                <p className="edit-form__supporting-text">
                    ※3文字以上20文字以下の英数字・記号で設定してください
                </p>
                <p className="edit-form__supporting-text">
                    {"※使用できる記号は「!-/:-@[-`{-~]*$」です"}
                </p>
            </div>
            <div className="edit-form__form">
                <label htmlFor="password" className='edit-form__label'>パスワード</label>
                <input type="text" id='password' className={`edit-form__input-area${errors.password?.message ? ' --error' : ''}`} { ...register('password') }/>
                { errors.password?.message && 
                <p className="edit-form__supporting-text --error">
                    { errors.password.message}
                </p>
                }
                <p className="edit-form__supporting-text">
                    ※6文字以上20文字以下の英数字・記号で設定してください
                </p>
                <p className="edit-form__supporting-text">
                    {"※使用できる記号は「!-/:-@[-`{-~]*$」です"}
                </p>
            </div>
            <div className="edit-form__form">
                <legend className='edit-form__label'>アカウントのステータス</legend>
                <div className="edit-form__radio-container">
                    <label htmlFor='isDeleted' className='edit-form__radio-label'>
                        <input type="radio" { ...register('deleted') } id='isDeleted' value='true' defaultChecked={ user.deleted } className='edit-form__radio-area'/>
                        <span className='edit-form__custom-radio'></span>
                        <p className='edit-form__radio-text'>停止</p>
                    </label>
                    <label htmlFor='isActive' className='edit-form__radio-label'>
                        <input type="radio" { ...register('deleted') } id='isActive' value='false' defaultChecked={ !user.deleted } className='edit-form__radio-area --none'/>
                        <span className='edit-form__custom-radio'></span>
                        <p className='edit-form__radio-text'>アクティブ</p>
                    </label>
                </div>
            </div>
            <div className="edit-form__button-area">
                <Link href={`/users/detail/${user.id}`} className='edit-form__button --cancel'>キャンセル</Link>
                <input type="submit" value="変更を保存" className={`edit-form__button${ isDisable ? ' --disabled' : ''}`} disabled={ isDisable }/>
            </div>
        </form>
    );
}

export default EditForm;

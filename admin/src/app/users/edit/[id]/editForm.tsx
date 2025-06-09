'use client';
import axios from '@utils/axiosInstance';
import { User } from '@projectTypes/index';

const EditForm = ({user}: {user: User}) => {
    return (
        <form action="" className='edit-form'>
            <div className="edit-form__form">
                <label htmlFor="username">username</label>
                <input type="text" name='username' id='username' defaultValue={ user.username}/>
                <p className="supporting-text">
                    ※文字数は5文字
                </p>
            </div>
            <label htmlFor="password">password : </label>
            <input type="text" name='password' defaultValue={ user.password}/>
            <label htmlFor="deleted">アカウントのステータス : </label>
            <input type="radio" name="deleted" value={"停止"} defaultChecked={ user.deleted}/>
            <input type="radio" name="deleted" value={"アクティブ"} defaultChecked={ !user.deleted}/>
            <input type="button" value="確認" />
        </form>
    );
}

export default EditForm;

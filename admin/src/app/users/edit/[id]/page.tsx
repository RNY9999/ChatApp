import { notFound } from 'next/navigation';
import axios from '@utils/axiosInstance';
import { User, Params } from '@projectTypes/index';
import EditForm from './editForm';
import Image from 'next/image';

import './edit.css';

export default async function UserEditPage({ params }: Params) {
    const { id } = await params;
    let user: User;

    try {
      const res = await axios.get(`/api/users/detail/${id}`);
      user = res.data;
    } catch (error) {
      console.error('ユーザ取得エラー: ', error);
      return notFound();
    }

    return (
      <div className="edit-page">
          <div className="edit-page__header">
              <h1 className='edit-page__title'>ユーザ情報編集</h1>
          </div>
          <div>
              <EditForm user={ user }/>
              <h2>{user.banner_url}</h2>
              {/* <Image
                src={`http://localhost:5000${user.banner_url}`}
                alt="ユーザバナー"
                width={600}
                height={200}
                style={{ objectFit: 'cover' }}
              /> */}
              <img 
                src={`http://localhost:5000${user.banner_url}`} 
                alt="バナー画像"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
          </div>
      </div>
    );
};
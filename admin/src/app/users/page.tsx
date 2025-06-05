'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './users.css';

// axios
import axios from '../../utils/axiosInstance';

type User = {
  id: number;
  username: string;
  password: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string; 
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/api/users/getList`);
        setUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('ERRORが発生しています' + error);
      }
    };
    fetchStudents();
  }, []);
  return (
      <>
        <div className="register">
          <Link href="/users/register">
            新規ユーザー登録
          </Link>
        </div>
        <h1>ユーザー</h1>
        <div className="table">
          <div className="table__header">
            <div className="table__record">
              <div className="table__header-cel">
                ID
              </div>
              <div className="table__header-cel">
                ユーザーネーム  
              </div>
              <div className="table__header-cel">
                パスワード
              </div>
              <div className="table__header-cel">
                論理削除フラグ
              </div>
              <div className="table__header-cel">
                登録日
              </div>
              <div className="table__header-cel">
                更新日
              </div>
            </div>
          </div>
          <div className="table__body">
            {users.map((user) => {
              return (
                <div
                  key={user.id}
                  className="table__body-record"
                >
                  <div className="table__body-record-cel">
                    <Link href={`/users/detail/${user.id}`}>
                      {user.id}
                    </Link>
                  </div>
                  <div className="table__body-record-cel">
                    {user.username}
                  </div>
                  <div className="table__body-record-cel">
                    {user.password}
                  </div>
                  <div className="table__body-record-cel">
                    {user.deleted ? '1' : '0'}
                  </div>
                  <div className="table__body-record-cel">
                    {new Date(user.createdAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo'})}
                  </div>
                  <div className="table__body-record-cel">
                    {new Date(user.updatedAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo'})}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
  );
}
'use client';
import { useEffect, useState } from 'react';

// axios
import axios from '../../utils/axiosInstance';

type User = {
  id: number;
  username: string;
  password: string;
  isDeleted: boolean;
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
      } catch (error) {
        console.error('ERRORが発生しています' + error);
      }
    };
    fetchStudents();
  }, []);
  return (
      <>
        <h1>ユーザー一覧</h1>
        <table className="table">
          <thead className="table__header">
            <tr className="table__record">
              <th className="table__header-cel">
                id
              </th>
              <th className="table__header-cel">
                ユーザーネーム  
              </th>
              <th className="table__header-cel">
                パスワード
              </th>
              <th className="table__header-cel">
                論理削除フラグ
              </th>
              <th className="table__header-cel">
                create_time
              </th>
              <th className="table__header-cel">
                update_time
              </th>
            </tr>
          </thead>
          <tbody className="table__body">
            {users.map((user, index) => {
              return (
                <tr
                  key={index}
                  className="table__body-record"
                >
                  <td className="table__body-record-cel">
                    {user.id}
                  </td>
                  <td className="table__body-record-cel">
                    {user.username}
                  </td>
                  <td className="table__body-record-cel">
                    {user.password}
                  </td>
                  <td className="table__body-record-cel">
                    {user.isDeleted ? '1' : '0'}
                  </td>
                  <td className="table__body-record-cel">
                    {new Date(user.createdAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo'})}
                  </td>
                  <td className="table__body-record-cel">
                    {new Date(user.updatedAt).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo'})}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
  );
}
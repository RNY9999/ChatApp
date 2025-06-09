import { notFound } from 'next/navigation';
import Link from 'next/link';
import axios from '@utils/axiosInstance';
import { User, Params } from '@projectTypes/index';
import DeleteForm from './deleteForm';

export default async function UserDetailPage({ params }: Params) {
  const { id } = await params;

  let user: User;
  
  try {
    const res = await axios.get(`/api/users/detail/${id}`);
    user = res.data;
  } catch (error) {
    console.error('ユーザー取得エラー:', error);
    return notFound(); // 404ページへ遷移
  }

  const formattedCreatedAt = new Date(user.createdAt).toLocaleString('ja-JP');
  const formattedUpdatedAt = new Date(user.updatedAt).toLocaleString('ja-JP');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>ユーザー詳細</h1>
      <div style={{ marginBottom: '1rem' }}>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>ユーザーネーム:</strong> {user.username}</p>
        <p><strong>パスワード:</strong> {user.password}</p>
        <p><strong>論理削除:</strong> {user.deleted ? '1' : '0'}</p>
        <p><strong>登録日時:</strong> {formattedCreatedAt}</p>
        <p><strong>更新日時:</strong> {formattedUpdatedAt}</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href={`/users/edit/${user.id}`}>
          <button style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
            編集
          </button>
        </Link>
        {/* user.deletedがtrueの時のみDeleteFormを出現 */}
        {!user.deleted ? 
            (<DeleteForm userId={user.id} />):
            (<h2>Restore</h2>)
        }
      </div>
    </div>
  );
}

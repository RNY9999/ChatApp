'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteForm = ({ userId }: { userId: number }) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？')) return;

    try {
      console.log(process.env.NEXT_PUBLIC_DEV_SERVER_URL);
      // postメソッドなので
      await axios.post(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/api/users/delete/${userId}`);
      alert('削除しました');
      router.push(`/users/detail/${userId}`);
    } catch (error) {
      console.error('削除失敗:', error);
      alert('削除に失敗しました');
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '0.5rem 1rem',
        background: 'red',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      削除
    </button>
  );
};

export default DeleteForm;

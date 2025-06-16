// src/app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ページが見つかりません</h1>
      <p style={{ marginBottom: '2rem' }}>お探しのページは存在しないか、削除された可能性があります。</p>

      <Link href="/">
        <button style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          ホームに戻る
        </button>
      </Link>
    </div>
  );
}
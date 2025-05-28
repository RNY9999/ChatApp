'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './navigation.css';

export default function Navigation() {
  const pathname: string = usePathname();

  return (
    <aside className='aside'>
      <h1 className='aside__title'>
        ChatAPP管理システム
      </h1>
      <nav className="navigation">
        <ul className="navigation__lists">
          <li className="navigation__list">
            <Link href="/admin" className={`navigation__link${pathname.startsWith('/admin') ? ' --active' : ''}`}>
              管理者一覧
            </Link>
          </li>
          <li className="navigation__list">
            <Link href="/users" className={`navigation__link${pathname.startsWith('/users') ? ' --active' : ''}`}>
              ユーザー
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
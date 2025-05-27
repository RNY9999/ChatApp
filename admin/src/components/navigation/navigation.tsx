import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__lists">
        <li className="navigation__list">
          <Link href="/admin">
            管理者一覧
          </Link>
        </li>
        <li className="navigation__list">
          <Link href="/users">
            ユーザー一覧
          </Link>
        </li>
      </ul>
    </nav>
  );
}
'use client';
// component
import Navigation from '../components/navigation/navigation'

export default function Top() {
  return (
    <>
      <header className="header">
        <h1 className="header__title">
          ChatApp管理システム
        </h1>
      </header>
      <aside className="aside">
        <Navigation />
      </aside>
      <main>
      </main>
    </>
  );
}

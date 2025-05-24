import Link from 'next/link';
import styles from './Header.module.css';

const LogoIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoIcon}>
    <path
      d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
      fill="currentColor"
    ></path>
  </svg>
);

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <LogoIcon />
        <h2 className={styles.logoTitle}>Casu</h2>
      </Link>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>A</Link>
          <Link href="/" className={styles.navLink}>B</Link>
          <Link href="/" className={styles.navLink}>C</Link>
        </nav>
      </div>
    </header>
  );
}

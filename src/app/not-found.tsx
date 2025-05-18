import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Страница не найдена</h2>
            <h3 className={styles.title}>Ошибка 404</h3>
            <p className={styles.message}>Похоже такого адреса не существует</p>
            <Link href="/" className={styles.link}>Вернуться на главную</Link>
        </div>
    );
}

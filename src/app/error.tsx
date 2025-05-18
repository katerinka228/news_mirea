'use client';

import Link from 'next/link';

export default function Error({
      error,
      reset,
                              }:{
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <h2>Что-то пошло не так!</h2>
            <p>{error.message}</p>

            <div>
                <button onClick={reset} >
                    Попробовать снова
                </button>
                <Link href="/">
                    На главную
                </Link>
            </div>
        </div>
    );
}
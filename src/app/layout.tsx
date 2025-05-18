import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Oswald } from 'next/font/google';

// Настройка шрифта
const oswald = Oswald({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '600'], // Доступные веса: 200-700
    variable: '--font-oswald'
});


export const metadata: Metadata = {
    title: "Новостной сайт",
};

export default function RootLayout({children, modal}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <html lang="ru" className={oswald.variable}>
        <body>
        {children}
        {modal}
        </body>
        </html>
    );
}
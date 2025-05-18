"use client";

import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "../../data/types";
import styles from "./styles.module.css";

interface CardsProps {
    news: NewsItem;
}

export default function Cards({ news }: CardsProps) {
    const fallbackImage = "https://www.mirea.ru/upload/medialibrary/a8c/qqv5o4yfjnctqn0ir7s5bbm5b8daj2ku/db8f6fb596c7752b441b0cdfa544bb20.png";
    const firstImage = news.attachments?.find(
        (a) =>
            (a.type === "PHOTO" || a.type === "LINK") && a.image?.src
    )?.image;
    return (
        <Link href={`/news/${news.id}`} className={styles.card} scroll={false}>
            <div className={styles.imageWrapper}>
                <Image
                    src={firstImage?.src || fallbackImage}
                    alt="Изображение новости"
                    width={450}
                    height={300}
                    className={styles.image}
                />
            </div>
            <div className={styles.type}>{news.type.replace("Вика_", "")}</div>
            <h3 className={styles.title}>{news.text.split("\n")[0]}</h3>
            <time className={styles.date}>
                {new Date(news.date * 1000).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
            </time>
        </Link>
    );
}


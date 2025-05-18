import { getNewsById } from "../../data/newsData";
import Link from "next/link";
import styles from "./page.module.css";
import { use } from "react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
    const news = await import("../../data/news.json");
    return news.default.map((item) => ({ id: item.id.toString() }));
}

export default function NewsPage({
                                     params,
                                 }: {
    params: Promise<{ id: string }>;
}) {

    const { id } = use(params);
    const news = use(getNewsById(id));

    if (!news) {
        return (
            <div className={styles.errorPage}>
                <h1 className={styles.errorTitle}>Новость не найдена</h1>
                <Link href="/" className={styles.errorlink}>Вернуться на главную</Link>
            </div>
        );
    }
    const formattedDate = new Date(news.date * 1000).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Moscow",
    });

    const photos = news.attachments.filter((a) => a.type === "PHOTO" && a.image?.src);
    const links = news.attachments.filter((a) => a.type === "LINK");
    const fallbackImage = news.attachments.find(a => a.image?.src)?.image?.src || "/default-image.jpg";
    const firstPhoto = photos[0]?.image?.src;
    const firstLinkPhoto = links.find((a) => a.image?.src)?.image?.src;
    const imageToShow = firstPhoto || firstLinkPhoto || fallbackImage;

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backLink}>
                ←
            </Link>

            <h1 className={styles.title}>{news.text.split("\n")[0]}</h1>

            <div className={styles.meta}>
                <span className={styles.type}>{news.type.replace("Вика_", "")}</span>
                <time className={styles.date}>{formattedDate}</time>
            </div>

            <div className={styles.gallery}>
                <img
                    src={imageToShow}
                    alt="Фото новости"
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                {news.text.split("\n").map((line, i) => (
                    <p key={i} className={styles.paragraph}>
                        {line}
                    </p>
                ))}
            </div>

            {links.length > 0 && (
                <div>
                    <h2 className={styles.sectionTitle}>Ссылки:</h2>
                    <a
                        href={links[0].link}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
            <span className={styles.linkText}>
                {links[0].titleLink}
                {links[0].description && (
                    <span className={styles.linkDescription}>
                        {" • "}{links[0].description}
                    </span>
                )}
            </span>
                    </a>
                </div>
            )}
        </div>
    );
}


"use client";

import { useEffect } from "react";
import { NewsItem } from "../../data/types";
import styles from "./styles.module.css";

interface ModalProps {
  news: NewsItem;
  onCloseAction: () => void;
}

export default function Modal({ news, onCloseAction }: ModalProps) {
  useEffect(() => {
    const body = document.body;
    body.classList.add("locked");
    return () => {
      body.classList.remove("locked");
    };
  }, []);

  const firstImage = news.attachments.find(
      (a) =>
          (a.type === "PHOTO" || a.type === "LINK") && a.image?.src
  )?.image;

    const fallbackImage = news.attachments.find(a => a.image?.src)?.image?.src || "/default-image.jpg";
  return (
      <div className={styles.overlay} onClick={onCloseAction}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {/* Заголовок и кнопка закрытия */}
          <div className={styles.header}>
            <h2 className={styles.title}>{news.text.split("\n")[0]}</h2>
            <button className={styles.closeButton} onClick={onCloseAction}>
              <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <img
              src={firstImage?.src || fallbackImage}
              alt="Основное изображение"
              className={styles.mainImage}
              style={{
                maxWidth: "100%",
                height: "auto",
                aspectRatio: firstImage
                    ? `${firstImage.width}/${firstImage.height}`
                    : "1/1",
              }}
          />

          <div className={styles.textContent}>
            {news.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
            ))}
          </div>

          <div className={styles.footer}>
            <button
                onClick={() => {
                  window.location.href = `/news/${news.id}`;
                }}
                className={styles.fullLink}
            >
              Открыть полностью
            </button>
          </div>
        </div>
      </div>
  );
}


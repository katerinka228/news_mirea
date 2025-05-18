import { NewsItem } from "../../data/types";
import Cards from "../Cards";
import styles from "./styles.module.css";

export default function NewsList({ news }: { news: NewsItem[] }) {
  return (
    <div className={styles.list}>
      {news.map((item) => (
        <Cards key={item.id} news={item} />
      ))}
    </div>
  );
}

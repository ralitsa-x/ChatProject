import styles from "./Main.css";

export default function Main({ children }) {
  return <div className={styles.main}>{children}</div>;
}
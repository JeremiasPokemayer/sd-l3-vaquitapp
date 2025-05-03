import styles from "./page.module.scss";
import Link from "next/link";

export default async function Failure() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>No se pudo efectuar el pago :p</h1>
        <p>
          Volve a la&nbsp;
          <Link href="/" className={styles.link}>
            página principal
          </Link>
          &nbsp;e intentalo nuevamente!
        </p>
      </div>
    </div>
  );
}

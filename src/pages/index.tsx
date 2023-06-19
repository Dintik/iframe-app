import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [iframeOpened, setIframeOpened] = useState(false);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by iframe
        </p>
        <button onClick={() => setIframeOpened(!iframeOpened)}>
          {iframeOpened ? "Close" : "Open"} iframe
        </button>
        <br/>
        <br/>

        {iframeOpened &&
          <iframe name = "authFrame" width = "100%" height = "650px" src = "https://shared.zelus.io" ></iframe>
        }
      </div>
    </main>
  )
}
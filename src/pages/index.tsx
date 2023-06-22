import { useEffect, useRef, useState } from "react";
import IframeResizer from "iframe-resizer-react";
import styles from "./page.module.scss";

export default function Home() {
  const [iframeOpened, setIframeOpened] = useState(true);
  const [iframeStyles, setIframeStyles] = useState({
    textColor: "#000",
    background: "#ffffff"
  });

  const iframeRef: any = useRef(null);
  const [messageData, setMessageData]: any = useState({});

  const onMessage = (data: any) => {
    iframeRef.current.sendMessage(data);
  }

  const onMessageStyles = () => {
    onMessage({iframeStyles, target:"frame-styles"});
  }

  useEffect(() => {
    const messageHandler = (event: any) => {
      const message = event.data;
      message.target === "oauth-app" && setMessageData(message.data);
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by iframe
        </p>
        <button
          className={styles.button}
          onClick={() => setIframeOpened(!iframeOpened)}
        >
          {iframeOpened ? "Close" : "Open"} iframe
        </button>

        {iframeOpened &&
          <div className={styles.form}>
            <div>
              <input
                onChange={(event) => setIframeStyles({
                    ...iframeStyles,
                    background: event.target.value
                })}
                type="color"
                id="background"
                name="background"
                defaultValue="#ffffff"
              />
              <label htmlFor="background">Background color</label>
            </div>

            <div>
              <input
                onChange={(event) => setIframeStyles({
                    ...iframeStyles,
                    textColor: event.target.value
                })}
                type="color"
                id="textColor"
                name="textColor"
                defaultValue="#000"
              />
              <label htmlFor="textColor">Text color</label>
            </div>
            <button onClick={onMessageStyles}>Apply styles</button>
          </div>
        }

        {messageData?.email && <p>Signed in as {messageData.email} <br/></p>}

        {iframeOpened &&
          <IframeResizer
            forwardRef={iframeRef}
            heightCalculationMethod="lowestElement"
            inPageLinks
            onMessage={onMessage}
            src="https://oauth-front.vercel.app?embedded=true"
            style={{ width: "1px", minWidth: "100%", height: "310px", borderRadius: "10px" }}
          />
        }
      </div>
    </main>
  )
}
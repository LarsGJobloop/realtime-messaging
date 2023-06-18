import style from "./style.module.css"

import { FormEvent, useState } from "react";
import { ChatMessage } from "../../models/generic";

interface ChatInputProps {
  sendMessage: ((message: ChatMessage) => void) | null;
}

export function ChatInput({ sendMessage }: ChatInputProps) {
  const [formContent, setFormContent] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendMessage === null) return;

    const currentTime = Date.now();

    sendMessage({
      author: { alias: "Me", id: "larsien" },
      body: formContent,
      createdAt: new Date(currentTime).toISOString(),
      id: `${currentTime}"me"`,
    });

    setFormContent("");
  }

  function updateForm(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormContent(event.target.value);
  }

  return (
    <footer className={style["container"]}>
      <form className={style["form"]} onSubmit={submit}>
        <textarea className={style["text"]} cols={20} rows={3} onChange={updateForm} value={formContent} />
        <button disabled={sendMessage === null} type="submit">
          Send
        </button>
      </form>
    </footer>
  );
}

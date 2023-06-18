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

  function updateForm(event: React.ChangeEvent<HTMLInputElement>) {
    setFormContent(event.target.value);
  }

  return (
    <footer>
      <form onSubmit={submit}>
        <input type="text" onChange={updateForm} value={formContent} />
        <button disabled={sendMessage === null} type="submit">
          Send
        </button>
      </form>
    </footer>
  );
}

import style from "./style.module.css";
import { useParams } from "react-router-dom";
import { FormEvent, useContext, useEffect, useState } from "react";

import { ChatMessage } from "../../../models/generic";

import { connectionContext } from "../../../App";

import { Msg, NatsError, StringCodec } from "nats.ws";

const codec = StringCodec()

export function Room() {
  const { roomID } = useParams()
  const connection = useContext(connectionContext)

  const [messages, updateMessages ] = useState<ChatMessage[]>([])
  const [ formContent, setFormContent ] = useState("")
  const [ sendMessage, setSendMessage ] = useState<((message: ChatMessage) => void) | null>(null)

  useEffect(() => {
    if (!roomID || !connection) return;

    const subscription = connection.subscribe(roomID,{callback: handleNewMessage})
    setSendMessage(() => (message: ChatMessage) => connection.publish(roomID, codec.encode(JSON.stringify(message))))


    return () => subscription.unsubscribe()
  }, [roomID])

  function handleNewMessage(error: NatsError | null, message: Msg) {
    if(error) return

    const newMessage = message.json() as ChatMessage

    updateMessages(currentMessages => [...currentMessages, newMessage])
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sendMessage === null) return

    const currentTime = Date.now()

    sendMessage({
      author: {alias: "Me", id: "larsien"},
      body: formContent,
      createdAt: new Date(currentTime).toISOString(),
      id: `${currentTime}"me"`
    })

    setFormContent("")
  }

  function updateForm(event: React.ChangeEvent<HTMLInputElement>) {
    setFormContent(event.target.value)
  }

  return (
    <div className={style["Room"]}>
      <header>
        <h1>{roomID}</h1>
      </header>

      <main>
        <ul>
          {
            messages.map((message) => {
              return (
                <li key={message.id}>
                  <MessageFeedCard message={message}/>
                </li>
              )
            })
          }
        </ul>
      </main>

      <footer>
        <form onSubmit={submit}>
          <input type="text" name="" id="" onChange={updateForm} value={formContent}/>
          <button type="submit">Send</button>
        </form>
      </footer>
    </div>
  );
}

interface MessageFeedCardProps {
  message: ChatMessage
}

function MessageFeedCard({
  message
}: MessageFeedCardProps) {
  return (
    <div>
      {message.body}
    </div>
  )
}
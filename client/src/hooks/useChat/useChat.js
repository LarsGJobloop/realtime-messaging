import { mockMessages } from "./mockMessages"


export function useChat(room) {
  const messages = mockMessages

  function postMessage(message) {
    console.log(message)

    return true
  }

  return {
    messages,
    postMessage,
  }
}
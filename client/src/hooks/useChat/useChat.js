const mockMessages = [
  {
    author: {alias: "Superman"},
    body: "Hello World",
    createdAt: Date.now() + 3124324,
  },
  {
    author: {alias: "Superman"},
    body: "Hello World",
    createdAt: Date.now() + 4324324,
  },
  {
    author: {alias: "Superman"},
    body: "Hello World",
    createdAt: Date.now() + 5424324,
  },
  {
    author: {alias: "Superman"},
    body: "Hello World",
    createdAt: Date.now() + 764324,
  }
]


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
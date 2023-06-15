/**
 * @typedef {{
 *  alias: string
 * }} User
 */

/**
 * @typedef {{
 *  id: UniqueID
 *  author: User
 *  body: string
 *  createdAt: DateTime
 * }} ChatMessage
 */

/**
 * @type {ChatMessage[]}
 */
const mockMessages = [
  {
    id: "hello",
    author: {alias: "Superman"},
    body: "Hello World",
    createdAt: Date.now() + 3124324,
  },
  {
    id: "World",
    author: {alias: "Superman"},
    body: "Hello World",
    createdAt: Date.now() + 4324324,
  },
  {
    id: "Batman",
    author: {alias: "Superman"},
    body: "Hello World",
    createdAt: Date.now() + 5424324,
  },
  {
    id: "Fizz",
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
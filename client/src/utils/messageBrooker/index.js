import { connectToNatsServer } from "./connectToNatsServer"
import { handleNewMessage } from "./handleNewMessage"

export default {
  connect: connectToNatsServer,
  handleNewMessage: handleNewMessage,
}
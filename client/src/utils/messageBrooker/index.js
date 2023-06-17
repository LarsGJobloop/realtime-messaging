import { connectToNatsServer } from "./connectToNatsServer"
import { handleNewMessage } from "./handleNewMessage"
import { formatMessage } from "./formatMessage"

export default {
  connect: connectToNatsServer,
  handleNewMessage: handleNewMessage,
  formatMessage: formatMessage,
}
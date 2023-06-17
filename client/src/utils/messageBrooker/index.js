import { connectToNatsServer } from "./natsBrooker/connectToNatsServer"
import { handleNewMessage } from "./natsBrooker/handleNewMessage"
import { formatMessage } from "./natsBrooker/formatMessage"

export default {
  connect: connectToNatsServer,
  handleNewMessage: handleNewMessage,
  formatMessage: formatMessage,
}
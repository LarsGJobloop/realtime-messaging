import { connect as natsConnect } from "nats.ws"

// ENVIRONMENT VARIABLES
const URL = import.meta.env.VITE_MESSAGE_BROOKER_URL;
const PORT = import.meta.env.VITE_MESSAGE_BROOKER_CLIENT_PORT;

export const connect = () => natsConnect( {
  servers: `ws://${URL}:${PORT}`,
  tls: null,
})
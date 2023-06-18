import { NatsConnection } from "nats.ws"
import { connect } from "../utilities/server"
import React, { createContext, useEffect, useState } from "react"


export const connectionContext = createContext<NatsConnection | null>(null)

interface ContextProps {
  children: React.JSX.Element
}

export function ConnectionContextProvider({
  children
}: ContextProps) {
  const [connection, setConnection] = useState<NatsConnection | null>(null)
  useEffect(() => {connect().then(setConnection)}, [])

  return (
    <connectionContext.Provider value={connection}>
      {children}
    </connectionContext.Provider>
  )
}
export const useTalks = (
  socket: WebSocket,
  from: string,
  to: string,
  message?: string,
) => {
  socket.send(JSON.stringify({ type: 'talks', data: { from, to, message } }))
}

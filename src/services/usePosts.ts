import { PostModel } from '../models'

export const usePosts = (socket: WebSocket, post: PostModel) => {
  socket.send(JSON.stringify({ type: 'post', data: post }))
}

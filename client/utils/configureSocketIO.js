import io from 'socket.io-client'

import {
  fetchRecentNotifications,
  receiveComment,
  receiveActionUpdateComment,
  receiveActionDeleteComment,
  receiveActionLikeComment,
  receiveActionUndoLikeComment,
  receiveActionGoing,
  receiveActionUndoGoing
} from '../actions'

import {
  NEW_COMMENT,
  NEW_NOTIFICATION,
  COMMENT_UPDATED,
  COMMENT_DELETED,
  LIKE_ON_COMMENT,
  UNDO_LIKE_ON_COMMENT,
  GOING,
  UNDO_GOING
} from '../../shared/socketIoMessageTypes'

let socket

export default function configureSocketIO(store) {
  if (socket) {
    console.log(`socketIO is already configured`)
    return
  }

  socket = io()

  socket.on(NEW_NOTIFICATION,     msg     => store.dispatch(fetchRecentNotifications()))
  socket.on(NEW_COMMENT,          comment => store.dispatch(receiveComment(JSON.parse(comment))))
  socket.on(COMMENT_UPDATED,      comment => store.dispatch(receiveActionUpdateComment(JSON.parse(comment))))
  socket.on(COMMENT_DELETED,      comment => store.dispatch(receiveActionDeleteComment(JSON.parse(comment))))
  socket.on(LIKE_ON_COMMENT,      like    => store.dispatch(receiveActionLikeComment(JSON.parse(like))))
  socket.on(UNDO_LIKE_ON_COMMENT, like    => store.dispatch(receiveActionUndoLikeComment(JSON.parse(like))))
  socket.on(GOING,                going   => store.dispatch(receiveActionGoing(JSON.parse(going))))
  socket.on(UNDO_GOING,           going   => store.dispatch(receiveActionUndoGoing(JSON.parse(going))))
  
  //SEE LIST OF ALL INCOMING NOTIFICATION TYPES IN socketIoMessageTypes.js
}

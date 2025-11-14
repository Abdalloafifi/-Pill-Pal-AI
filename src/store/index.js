import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import chatReducer from './slices/chatSlice'
import imageReducer from './slices/imageSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    chat: chatReducer,
    image: imageReducer,
  },
})
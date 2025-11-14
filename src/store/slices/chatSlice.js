import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [
    {
      id: 1,
      text: 'مرحباً! أنا Pill Pal AI، مساعدك الطبي الذكي. كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ],
  isTyping: false,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload
    },
    clearChat: (state) => {
      state.messages = [initialState.messages[0]]
    },
  },
})

export const { addMessage, setTyping, clearChat } = chatSlice.actions
export default chatSlice.reducer
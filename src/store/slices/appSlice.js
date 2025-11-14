import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: false,
  language: 'ar',
  isLoading: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { toggleDarkMode, setLanguage, setLoading } = appSlice.actions
export default appSlice.reducer
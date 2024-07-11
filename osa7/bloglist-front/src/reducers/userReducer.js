import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { username: null, password: null },
  reducers: {
    setUser2(state, action) {
      return action.payload
    }
  }
})

export const { setUser2 } = userSlice.actions
export default userSlice.reducer
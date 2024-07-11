import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs2(state, action) {
      return action.payload
    },
    addBlog2(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    updateBlog(state, action) {
      const { id, newBlog } = action.payload
      const index = state.findIndex(blog => blog.id === id)
      if (index !== -1) {
        state[index] = newBlog
      }
    }
  }
})

export const { setBlogs2, addBlog2, deleteBlog, updateBlog } = blogsSlice.actions
export default blogsSlice.reducer
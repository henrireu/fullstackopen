import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import messageReducer from './reducers/messageReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogsReducer,
    user: userReducer,
    allUsers: allUsersReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

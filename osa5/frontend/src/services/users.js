import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const GetUserId = async (username) => {
  try {
    const response = await axios.get(baseUrl)
    const data = response.data
    const user = data.find(user => username === user.username)
    if (user) {
      console.log(user.username, ' ja userid ', user.id)
      return user.id
    } else {
      console.log('User not found')
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

export default GetUserId
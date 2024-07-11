import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  } catch (error) {
    console.error('Virhe päivittäessä tietoja:', error)
    throw error
  }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  try {
    await axios.delete(`${baseUrl}/${id}`, config)
    console.log('blogi poistettu onnistuneesti')
  } catch (error) {
    console.error('Virhe poistettaessa blogia', error)
    throw error
  }
}

export default { getAll, create, setToken, update, deleteBlog }

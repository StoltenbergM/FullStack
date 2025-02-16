import axios from 'axios'
const baseUrl = '/api/contacts'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteName = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updateNumber = (id, newNumber) => {
  const request = axios.put(`${baseUrl}/${id}`, newNumber)
  return request.then(response => response.data)
}

export default { getAll, create, deleteName, updateNumber }
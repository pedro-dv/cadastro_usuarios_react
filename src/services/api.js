import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cadastro-user-api.vercel.app' // 'http://localhost:3000'
})

export default api
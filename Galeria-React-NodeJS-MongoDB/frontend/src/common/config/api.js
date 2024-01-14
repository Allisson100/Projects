import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://galeriabackendnode-production.up.railway.app'
})

export default instance
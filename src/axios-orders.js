import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-builder-3f34e.firebaseio.com/'
})

export default instance
import axios from "axios";


const ApiBase = axios.create({
  baseURL: 'http://localhost:8089/api/'
})

export default ApiBase
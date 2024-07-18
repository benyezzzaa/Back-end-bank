// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3003' // Assurez-vous que c'est l'URL correcte pour votre backend
});

export default instance;

import axios from 'axios'

export default axios.create({
    baseURL: 'https://quizapp-f04bf.firebaseio.com'
});
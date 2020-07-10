import { ADD_POST, ADD_COMMENT } from './actionTypes'
import axios from 'axios'

export const addPost = post => {
    return dispatch => {
        axios({//primeiro verifica se a imagem foi enviada
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-fde43.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(err.error))
            .then(resp => {

                post.image = resp.data.imageUrl//copia a url da imagem para o state local image
                axios.post('/posts.json', { ...post })//persiste os dados no banco
                    .catch(err => console.log(err))
                    .then(res => console.log(res.data))
            })

    }

    /*return {
        type: ADD_POST,
        payload: post
    }*/
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload: payload
    }
}
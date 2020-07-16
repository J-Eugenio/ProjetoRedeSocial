import { 
    SET_POSTS, 
    ADD_COMMENT, 
    CREATING_POST, 
    POST_CREATED 
} from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

export const addPost = post => {
    return dispatch => {
        dispatch(creatingPost())
        axios({//primeiro verifica se a imagem foi enviada
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-fde43.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: `Erro ao Enviar Imagem: ${err}`
                }))
            })
            .then(resp => {

                post.image = resp.data.imageUrl//copia a url da imagem para o state local image
                axios.post('/posts.json', { ...post })//persiste os dados no banco.
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text:  `Erro na postagem: ${err}`
                        }))
                    })
                    .then(res => {
                        dispatch(getPosts())
                        dispatch(postCreated())
                    })
            })

    }

    /*return {
        type: ADD_POST,
        payload: post
    }*/
}

export const addComment = payload => {
    return dispatch =>{
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: `Erro ao atualizar comentarios: ${err}`
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json`, { comments })
                    .catch(err => {
                        dispatch(setMessage({
                            title:'Erro',
                            text: `Erro ao adicionar comentário: ${err}`
                        }))
                    })
                    .then(res =>{
                        dispatch(getPosts())
                    })
            })
    }

    /*return {
        type: ADD_COMMENT,
        payload: payload
    }*/
}

export const setPosts = posts =>{
    return{
        type: SET_POSTS,
        payload: posts
    }
}

export const getPosts = () => {
    return dispatch =>{
        axios.get('/posts.json')
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: `Erro ao bucar posts ${err}`
                }))
            })
            .then(res =>{
                const rawPosts = res.data
                const posts = []
                for(let key in rawPosts){
                    posts.push({
                        ...rawPosts[key],
                        id:key
                    })
                }
                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return{
        type: POST_CREATED
    }
}
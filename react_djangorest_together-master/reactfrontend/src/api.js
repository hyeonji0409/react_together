import axios from "axios";

axios.defaults.baseURL = "http://106.242.122.24:8000/api"


export default {
    getAllPost(){
        return axios.get('/posts/')
    },
    createPost(data){
        return axios.post('/posts/', data)
    },
    deletePost(id){
        return axios.delete('/posts/'+String(id))
    },

    updatePost(id, _title, _content){
        return axios.put('/posts/'+String(id)+'/', {title:_title, content:_content})
    },
}

//접속 할 수 있도록 함수를 만든다!
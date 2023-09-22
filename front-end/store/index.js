import {createStore} from "vuex"
import axios from "axios";

const store = createStore({
    state: {
        userInfo: {},
        todos: []
    },
    mutations: {
        login(state, user) {
            state.userInfo = {...user}
        },
        getTodos(state, todos) {
            state.todos = [...todos]
        }
    },
    actions: {
        async login(payload, user) {
            await axios.post('/api/user/login',
                {
                    // "phone": user.phone,
                    // "password": user.password,
                    ...user
                })
                .then(r => {
                    console.log(r)
                    if (r.data.code === 200) {
                        //如果token发送给后端，后端发来对应的数据，则commit
                        document.cookie = `token=${r.data.data.token};Max-Age=${60 * 60}`
                        console.log(r.data.data)
                        return payload.commit('login', r.data.data)

                    }
                    alert('登录失败，请重试')
                })
                .catch()
        },
        async getTodos(payload) {
           await axios.get(`/api/todo/todos?token=${payload.state.userInfo.token}`)
                .then(r => {
                    if (r.data.code === 200) {
                        console.log(r.data.data)
                        payload.commit('getTodos', r.data.data)
                    } else {
                        alert("登陆过期，请重新登录")
                    }
                })
        }
    }
})
export default store
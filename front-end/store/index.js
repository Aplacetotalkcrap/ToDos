import {createStore} from "vuex"
import axios from "axios";

const store = createStore({
    state: {
        userInfo: {}
    },
    mutations: {
        login(state, user) {
            state.userInfo = {...user}
        }
    },
    actions: {
        async login(payload, user) {
            // console.log(user)
            await axios.post('/api/user/login',
                {
                    "phone": user.phone,
                    "password": user.password,
                })
                .then(r => {
                    console.log(r)
                    if (r.data.code === 200) {
                        document.cookie = `token${r.data.token};Max-Age=30`
                        return payload.commit('login', r.data.data)
                    }
                    alert('登录失败，请重试')
                })
                .catch()
        }
    }
})
export default store
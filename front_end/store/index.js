import {createStore} from 'vuex'
import axios from "axios";

const store = createStore({
    state: {
        userInfo: {}
    },
    mutations: {
        login(state, user) {
            state.userInfo = {...user}
        }

    }, actions: {
        login(payload, user) {
            console.log(user)
            axios.post('/api/user/login',
                {
                    "phone": user.phone,
                    "password": user.password
                })
                .then(r => {
                    console.log(r)
                    payload.commit('login', r.data.data)
                })
                .catch()
        }

    }
})

export default store
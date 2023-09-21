import {createRouter, createWebHistory} from 'vue-router'
//加载首页
import LoginView from "@/views/LoginView.vue"
//使用懒加载
const HomeView = () => import("../views/HomeView.vue")
const ToDoListView = () => import("../views/ToDoList.vue")
const HistoryView = () => import("../views/HistoryView.vue")
const ProfileView = () => import("../views/ProfileView.vue")
const StatisticView = () => import("../views/StatisticsView.vue")
const AttentionView = () => import("../views/AttentionView.vue")
const TestView = () => import("../views/TestView.vue")


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginView,
        },
        {path: '/todo-list', name: 'TodoList', component: ToDoListView},
        {path: '/history', name: 'History', component: HistoryView},
        {path: '/profile', name: 'Profile', component: ProfileView},
        {path: '/statistics', name: 'Statistics', component: StatisticView},
        {path: '/attention', name: 'Attention', component: AttentionView},
        {path:'/home',name:'Home',component: HomeView},
        {path:'/test',name: 'Test', component: TestView},
    ]

})

export default router

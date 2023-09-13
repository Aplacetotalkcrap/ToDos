import {createRouter, createWebHistory} from 'vue-router'
//加载主页面
import LoginView from "../views/LoginView.vue";
//其他页面使用懒加载
const HomeView = () => import('../views/HomeView.vue')
const ToDoListView = () => import('../views/ToDoListView.vue')
const HistoryView = () => import('../views/HistoryView.vue')
const ProfileView = () => import('../views/ProfileView.vue')
const StatisticsView = () => import('../views/StatisticsView.vue')
const AttentionView = () => import('../views/AttentionView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'Login', component: LoginView},
        {path: '/todo-list', name: 'ToDoList', component: ToDoListView},
        {path: '/history', name: 'History', component: HistoryView},
        {path: '/profile', name: 'Profile', component: ProfileView},
        {path: '/statistics', name: 'Statistics', component: StatisticsView},
        {path: '/attention', name: 'Attention', component: AttentionView},
        {path: '/home', name: 'Home', component: HomeView}
    ]
})

export default router

import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createRouter, createWebHistory} from 'vue-router'

import Home from "./view/HomeView.vue"
import Planning from "./view/PlanningView.vue"
import Profile from "./view/ProfileView.vue"


const router = createRouter({
    history: createWebHistory (),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/planning",
            component: Planning
        },
        {
            path: "/profile",
            component: Profile
        },
    ]
})

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount('#app');

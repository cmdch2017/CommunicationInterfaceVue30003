//路由入口文件
//createRouter 创建路由示例
import {createRouter, createWebHashHistory} from "vue-router";
import Layout from '@/layout/Layout.vue'
import test from "@/views/test/Test";

export const routes = [
    {path: '/', redirect: '/base'},//路由重定向
    {
        path: '/base',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/base/index.vue')
            }
        ]
    },
    {
        path: '/base-directive',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('@/views/base-directive/index.vue')
            }
        ]
    },
    {
        path: '/test',
        component: test,
        children: [
            {
                path: '',
                component: () => import('@/views/base-directive/index.vue')
            }
        ]
    }
]

const router = createRouter(
    {
        routes,
        history: createWebHashHistory()
    }
)

export default router

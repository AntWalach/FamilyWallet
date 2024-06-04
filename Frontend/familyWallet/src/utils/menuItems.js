
import { admin, dashboard, settings, family } from "./icons"
import { transactions } from "./icons"
import { trend } from "./icons"
import { expenses } from "./icons"

export const menuItems =[
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/familywallet'
    },
    {
        id: 2,
        title: 'Family',
        icon: family,
        link: '/familywallet'
    },
    {
        id: 3,
        title: 'Incomes',
        icon: trend,
        link: '/familywallet'
    },
    {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/familywallet'
    },
    // {
    //     id: 5,
    //     title: 'View Transactions',
    //     icon: transactions,
    //     link: '/familywallet'
    // },
    {
        id: 6,
        title: 'Settings',
        icon: settings,
        link: '/familywallet'
    },
    {
        id: 7,
        title: 'Admin',
        icon: admin,
        link: '/familywallet'
    },
]
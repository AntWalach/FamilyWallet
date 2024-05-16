import { dashboard, settings, family } from "./icons"
import { transactions } from "./icons"
import { trend } from "./icons"
import { expenses } from "./icons"

export const menuItems =[
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: 'View Transactions',
        icon: transactions,
        link: '/dashboard'
    },
    {
        id: 3,
        title: 'Incomes',
        icon: trend,
        link: '/dashboard'
    },
    {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/dashboard'
    },
    {
        id: 5,
        title: 'Settings',
        icon: settings,
        link: '/dashboard'

    },
    {
        id: 6,
        title: 'Family',
        icon: family,
        link: '/family'
    }
]
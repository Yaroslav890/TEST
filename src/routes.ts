import User from "./pages/User";
import UserList from "./pages/UserList";
import {USER_LIST, USER_ROUTE } from "./utils/consts";

export const app_routes = [
    {
        path: USER_ROUTE + '/:id',
        Component: User
    },
    {
        path: USER_LIST,
        Component: UserList
    },
    {
        path: USER_ROUTE,
        Component: UserList
    }
]
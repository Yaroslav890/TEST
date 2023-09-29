 import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { IUsers } from "../models/IUser"
 
 export const userAPI = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes:['User'],
    endpoints:(build) => ({
        fetchAllUsers: build.query<IUsers[], number>({
            query: (limit: number = 5)=> ({
                url: '/users',
                params:{
                    _limit: limit,
                }
            }),
            providesTags:result => ['User']
        }),
        createUser:build.mutation<IUsers,IUsers>({
            query: (user)=> ({
                url: '/users',
                method:'POST',
                body:user
            }),
            invalidatesTags:['User']
        }),
        updateUser:build.mutation<IUsers,IUsers>({
            query: (user)=> ({
                url: `/users/${user.id}`,
                method:'PUT',
                body:user
            }),
            invalidatesTags:['User']
        }),
        deleteUser:build.mutation<IUsers,IUsers>({
            query: (user)=> ({
                url: `/users/${user.id}`,
                method:'DELETE',
            }),
            invalidatesTags:['User']
        })
        })
    })

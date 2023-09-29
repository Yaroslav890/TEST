import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { IDevice } from "../models/IDevice"
 
 export const deviceAPI = createApi({
    reducerPath: 'device',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes:['Device'],
    endpoints:(build) => ({
        fetchAllDevices: build.query<IDevice[], number>({
            query: (limit: number = 5)=> ({
                url: '/devices',
                params:{
                    _limit: limit,
                }
            }),
            providesTags:result => ['Device']
        }),
        createDevice:build.mutation<IDevice,IDevice>({
            query: (device)=> ({
                url: '/devices',
                method:'POST',
                body:device
            }),
            invalidatesTags:['Device']
        }),
        updateDevice:build.mutation<IDevice,IDevice>({
            query: (device)=> ({
                url: `/devices/${device.id}`,
                method:'PUT',
                body:device
            }),
            invalidatesTags:['Device']
        }),
        deleteDevice:build.mutation<IDevice,IDevice>({
            query: (device)=> ({
                url: `/devices/${device.id}`,
                method:'DELETE',
            }),
            invalidatesTags:['Device']
        })
        })
    })

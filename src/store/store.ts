import { deviceAPI } from './../services/DeviceService';

import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userAPI } from "../services/UserService";
const rootReducer = combineReducers({
    [userAPI.reducerPath] : userAPI.reducer,
    [deviceAPI.reducerPath] : deviceAPI.reducer
})

export const setupStore = ()=>{
    return configureStore({
        reducer:rootReducer,
        middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat([userAPI.middleware, deviceAPI.middleware])
        
    })
} 

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
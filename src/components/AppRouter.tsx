import {Route, Routes} from 'react-router-dom'
import { app_routes } from '../routes';

export const AppRouter = () => {
    return(
       <>
       <Routes>
            {app_routes.map(({path, Component}) => 
                <Route key = {path} path = {path} Component={Component}/>
            )}
        </Routes>
       </>
        
    
    );
};
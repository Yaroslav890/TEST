import React, {FC} from 'react'
import { IUsers } from '../models/IUser';
import { AppBar, Card,CardMedia, IconButton, Toolbar,CardContent, Typography,Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { userAPI } from '../services/UserService';
import DeviceContainer from '../components/DeviceContainer';
import Fab from '@mui/material/Fab';
const User = () => {
    const {data: users} = userAPI.useFetchAllUsersQuery(100)
    const str = window.location.pathname
    const id = Number(str.slice(str.indexOf('s/')+2))
    const locationReplace = () => {
        window.location.replace("http://localhost:3000")
    }
    return(
         <>
         
         {users && users.map(user=>{
            if( user.id=== id){  
            return <div>
                    <Fab color="primary" aria-label="add">
                        <ArrowBackIcon onClick={locationReplace}/>
                    </Fab>

                                
                <Card sx={{backgroundColor:"#101418", color:"white", border:"none", boxShadow:"none", display:"flex", justifyContent:"center"}}>
                    <Box sx={{display:'flex', flexDirection:"column", alignItems:"center"}}>
                        <CardMedia 
                            component="img"
                            sx={{ width: 151 }}
                            image={user.avatar}
                            alt="Live from space album cover"
                            />
                        <CardContent>
                            <Typography component="div" variant="h6">
                                {user.name}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
                <DeviceContainer userId={user.id}/>
            </div>           
            }
        })}
        
        </>
        
    );
};

export default User;
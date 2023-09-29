import React , {FC}from 'react'
import { IUsers} from '../models/IUser';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { UpdateUser } from '../modals/UpdateUserModal';
import User from '../pages/User';
import { Fab, Tooltip } from '@mui/material';

interface UserItemProps{
    user:IUsers;
    remove:(user:IUsers) => void;
    update:(user:IUsers) => void
}

const UserItem: FC<UserItemProps> = ({user, remove, update}) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(user)
    }

    const handleUpdate = (user:IUsers) => {
        update(user)
    }
    
    return(
        <Card sx={{ minWidth: 200}}>
            <CardMedia
                className="user_avatar"
                sx={{ height: 140 }}
                image={user.avatar}
                title="avatar"
            />
            <CardContent className="user_name"> 
                {user.name}       
            </CardContent>
            <CardActions>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Fab size = "small" color="primary" aria-label="delete">
                            <Tooltip title="delete">
                                <DeleteIcon onClick={handleRemove}/>
                            </Tooltip>
                        </Fab>
                            
                    </Grid>
                    <Grid item>
                        <a href={`http://localhost:3000/users/${user.id}`}><Button size="large" onClick={()=>{return <User />}}>See more</Button></a>
                    </Grid>
                    <Grid item>
                            <UpdateUser user={user} update={handleUpdate}/>
                    </Grid> 
                </Grid>
            </CardActions>
         </Card>
    );
};

export default UserItem
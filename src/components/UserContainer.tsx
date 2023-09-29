import React , {useState}from 'react'
import { userAPI } from '../services/UserService';
import UserItem from './UserItem';
import { IUsers } from '../models/IUser';
import Grid from '@mui/material/Grid';
import { CreateUser } from '../modals/CreateUserModal';

const UserContainer = () => {
    const [limit, setLimit] = useState(100)
    const {data: users, error, isLoading,} = userAPI.useFetchAllUsersQuery(limit)
    const [updateUser, {}] = userAPI.useUpdateUserMutation()
    const [deleteUser, {}] = userAPI.useDeleteUserMutation()
const handleRemove = (user: IUsers) => {
    deleteUser(user)
}

const handleUpdate = (user: IUsers) => {
    updateUser(user)
}

    return(
        <div>
            <div className='user__list'>
                <Grid container justifyContent="center"  sx={{mt:"50px"}}spacing={5}>
                    {isLoading && <h1 style={{color: "white"}}>Идет загрузка</h1>}
                    {error && <h1 style={{color: "white"}}>Произошла ошибка</h1>}
                    {users?.length === 0 && <h1 style={{color: "white", 
                                                        marginLeft:"50px", 
                                                        display:"flex", 
                                                        flexDirection:"column", 
                                                        alignItems:"center"
                                                        }}><p>Нет пользователей</p><p>Нажмите + чтобы создать нового пользователя</p></h1>}
                    
                    {users && users.map(user =>
                        <Grid key={user.id} item>
                            <UserItem remove = {handleRemove} update = {handleUpdate} key = {user.id} user = {user}/>
                        </Grid>  
                    )}    
                </Grid>
  
                <Grid container justifyContent="center" className="add_user_button" >
                            <CreateUser />
                </Grid>
                   
            </div>
        </div>
    );
};

export default UserContainer;
import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler,useForm } from 'react-hook-form';
import { AddUserForm } from '../models/IForm';
import userPhoto from '../static/user.png'
import { userAPI } from '../services/UserService';
import {TextField } from '@mui/material';
import { IUsers } from '../models/IUser';
import { STYLE } from '../utils/consts';

export const CreateUser = () => {

const [createUser, {}] = userAPI.useCreateUserMutation()
const [open, setOpen] = React.useState(false);
const {register, handleSubmit} = useForm<AddUserForm>({defaultValues:{}})
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const submit: SubmitHandler<AddUserForm> = async(data) =>{
    await createUser({name:data.name, avatar: userPhoto } as IUsers)
}

const isName = () => {
    console.log('Вызвана')
    return true;
    
}

  return (
    <div>
      <Fab color="primary" aria-label="add">
        <AddIcon onClick = {handleOpen}/>
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLE}>
          <form style={{display:"flex", gap:10, flexDirection:"column", alignItems:"center"}} onSubmit={handleSubmit(submit)}>
          <h1>Создание пользователя</h1>
            <TextField   {...register('name', {required:true, validate: isName })}/>
            <button>Отправить</button>
            <button onClick={handleClose}>Закрыть</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SubmitHandler,useForm } from 'react-hook-form';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { IUsers } from '../models/IUser';
import { Fab, Tooltip } from '@mui/material';
import { STYLE } from '../utils/consts';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material';
interface UpdateUserProps{
    user:IUsers;
    update:(user:IUsers)=>void
}

export const UpdateUser: FC<UpdateUserProps>= ({user, update}) => {

const [open, setOpen] = React.useState(false);
const {register, handleSubmit} = useForm<IUsers>({defaultValues:{
  name:user.name
}})
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const submit: SubmitHandler<IUsers> = (data) =>{
    update({...user, name: data.name})
}

const isName = () => {
    console.log('Вызвана')
    return true;
    
}

  return (
    <div>
      <Fab size = "small" color="primary" aria-label="delete">
        <Tooltip title="update">
          <CreateRoundedIcon onClick={handleOpen} />
        </Tooltip>
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLE}>
          <form style={{display:"flex", gap:10, flexDirection:"column", alignItems:"center"}} onSubmit={handleSubmit(submit)}>
          <h1>Редактирование пользователя</h1>
            <TextField label="Имя" variant="outlined"{...register('name', {required:true, validate: isName })}/>
            <button>Отправить</button>
            <Button onClick={handleClose}>Закрыть</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
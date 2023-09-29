import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { Form, SubmitHandler,useForm } from 'react-hook-form';
import { IDevice } from '../models/IDevice';
import { deviceAPI } from '../services/DeviceService';
import Button from '@mui/material/Button';
import { Input, TextField } from '@mui/material';
import { STYLE } from '../utils/consts';

interface CreateDeviceProps{
    userId:number
}
export const CreateDevice:FC<CreateDeviceProps>= ({userId}) => {
const [createDevice, {}] = deviceAPI.useCreateDeviceMutation()
const [open, setOpen] = React.useState(false);
const {register, handleSubmit} = useForm<IDevice>({defaultValues:{}})
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const submit: SubmitHandler<IDevice> = async(data) =>{
    await createDevice({product: data.product, price:data.price,count:data.count, userId:userId} as IDevice)
    
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
        sx={{}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLE}>
          <form style={{display:"flex", gap:10, flexDirection:"column", alignItems:"center"}}onSubmit={handleSubmit(submit)}>
            <h1>Создание продукта</h1>
            <TextField label="Название" variant="outlined" {...register('product', {required:true, validate: isName })}/>
            <TextField type ="number" label="Цена" variant="outlined"{...register('price', {required:true, validate: isName })}/>
            <TextField type ="number"label="Количество" variant="outlined"{...register('count', {required:true, validate: isName })}/>
            <button>Отправить</button>
            <Button onClick={handleClose}>Закрыть</Button>
            
          </form>
        </Box>
      </Modal>
    </div>
  );
}
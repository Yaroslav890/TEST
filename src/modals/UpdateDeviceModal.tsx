import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import { SubmitHandler,useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/CreateRounded';
import { IDevice } from '../models/IDevice';
import { Tooltip } from '@mui/material';
import { STYLE } from '../utils/consts';
import Button from '@mui/material/Button';
import {TextField } from '@mui/material';
interface UpdateDeviceProps{
    device:IDevice;
    update:(device:IDevice)=>void
}

export const UpdateDevice: FC<UpdateDeviceProps>= ({device, update}) => {

const [open, setOpen] = React.useState(false);
const {register, handleSubmit} = useForm<IDevice>({defaultValues:{
    product:device.product,
    price:device.price,
    count:device.count
}})
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const submit: SubmitHandler<IDevice> = (data) =>{
    update({...device, product:data.product, price:data.price, count:data.count})
}

const isName = () => {
    console.log('Вызвана')
    return true;
    
}

  return (
    <div>
      <Tooltip title="update">
        <Fab size="small" color="primary" aria-label="edit">
            <EditIcon onClick={handleOpen} />
        </Fab>
        
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={STYLE}>
          <form style={{display:"flex", gap:10, flexDirection:"column", alignItems:"center"}} onSubmit={handleSubmit(submit)}>
          <h1>Редактирование продукта</h1>
            <TextField label="Название" variant="outlined"{...register('product', {required:true, validate: isName })}/>
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
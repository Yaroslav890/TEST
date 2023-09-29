import {useState, FC}from 'react'
import { deviceAPI } from '../services/DeviceService';
import DeviceItem from './DeviceItem';
import { IDevice } from '../models/IDevice';
import Grid from '@mui/material/Grid';
import { CreateDevice } from '../modals/CreateDeviceModal';
interface DeviceContainerProps{
    userId:number
}
const DeviceContainer:FC<DeviceContainerProps> = ({userId}) => {
    const [limit, setLimit] = useState(100)
    const {data: devices, error, isLoading,} = deviceAPI.useFetchAllDevicesQuery(limit)
    const [updateDevice, {}] = deviceAPI.useUpdateDeviceMutation()
    const [deleteDevice, {}] = deviceAPI.useDeleteDeviceMutation()

const handleRemove = (device: IDevice) => {
    deleteDevice(device)
}

const handleUpdate = (device: IDevice) => {
    updateDevice(device)
}

let flag = 0

    return(
        <div>        
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка</h1>}
            {devices && devices.map(device =>(userId === device.userId)? flag += 1:flag+1)}
            {(flag == 0) ? <h1 style={{color: "white",                                 
                                        display:"flex", 
                                        flexDirection:"column", 
                                        alignItems:"center",
                                        margin :"20px 20px 20px 50px"
                                        }}><p>У пользователя нет продуктов</p><p>Нажмите + чтобы создать новый продукт</p></h1>: flag+1}
            <Grid container justifyContent="center" spacing={5}>
                {devices && devices.map(device =>{
                    if(userId===device.userId)
                        return <Grid key={device.id} item>
                                 <DeviceItem remove = {handleRemove} update = {handleUpdate} key = {device.id} device = {device}/>
                               </Grid>
                })}
            </Grid>       
            <Grid sx={{marginTop:"50px"}}container justifyContent="center" className="add_device_button" >
                  <CreateDevice userId={userId}/>  
            </Grid>
        </div>
    );
};

export default DeviceContainer;
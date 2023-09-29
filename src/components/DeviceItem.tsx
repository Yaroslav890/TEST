import React , {FC}from 'react'
import Fab from '@mui/material/Fab';
import { IDevice} from '../models/IDevice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { UpdateDevice } from '../modals/UpdateDeviceModal';
import { Tooltip } from '@mui/material';

interface DeviceItemProps{
    device:IDevice;
    remove:(device:IDevice) => void;
    update:(device:IDevice) => void
}

const DeviceItem: FC<DeviceItemProps> = ({device, remove, update}) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(device)
    }

    const handleUpdate = (device:IDevice) => {
        update(device)
    }
    
    return(
        <Card sx={{ minWidth: 200, borderRadius:"20px" }}>
            <CardContent className="device_name"> 
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <ListItem sx={{textAlign:"center",}}>
                    <ListItemText primary={device.product}/>
                </ListItem>
                <ListItem sx={{textAlign:"center",}}>
                    <ListItemText primary={`price: ${device.price}`} />
                </ListItem>
                <ListItem sx={{textAlign:"center",}}>
                    <ListItemText primary={`count: ${device.count}`}/>
                </ListItem>
            </List>   
            </CardContent>
            <CardActions>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Tooltip title="delete">
                            <Fab size = "small" color="primary" aria-label="add">
                                <DeleteIcon onClick={handleRemove}/>
                            </Fab>
                            
                        </Tooltip>
                    </Grid>
                    <Grid item>
                            <UpdateDevice device={device} update={handleUpdate}/>
                    </Grid> 
                </Grid>
            </CardActions>
         </Card>
    );
};

export default DeviceItem
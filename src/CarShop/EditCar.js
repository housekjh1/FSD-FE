import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react"

const EditCar = (props) => {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '', model: '', color: '',
        yyyy: '', fuel: '', price: ''
    });

    const handleClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            yyyy: props.data.row.yyyy,
            price: props.data.row.price
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        setCar({
            ...car,
            [e.target.name]: e.target.value
        });
    }

    const handleSave = () => {
        props.updateCar(car, props.rowId);
        handleClose();
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon color='primary' />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={2}>
                        <TextField autoFocus variant="standard" label="Brand" name="brand" value={car.brand} onChange={handleChange} />
                        <TextField variant="standard" label="Model" name="model" value={car.model} onChange={handleChange} />
                        <TextField variant="standard" label="Color" name="color" value={car.color} onChange={handleChange} />
                        <TextField variant="standard" label="Year" name="yyyy" value={car.yyyy} onChange={handleChange} />
                        <TextField variant="standard" label="Price" name="price" value={car.price} onChange={handleChange} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCar

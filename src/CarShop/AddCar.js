import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Stack, TextField } from "@mui/material";
import { useState } from "react"

const AddCar = (props) => {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        yyyy: '',
        fuel: '',
        price: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    }

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
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

export default AddCar

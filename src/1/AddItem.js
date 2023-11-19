import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react"

const AddItem = (props) => {

    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({
        product: '',
        amount: ''
    });

    const product = useRef();
    const amount = useRef();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = () => {
        setItem({
            product: product.current.value,
            amount: amount.current.value
        })
    }

    const addItem = () => {
        props.addItems(item);
        setItem({ product: '', amount: '' });
        handleClose();
    }

    useEffect(()=>{
        console.log(item)
    },[item])

    return (
        <div>
            <Button onClick={handleOpen}>
                Add Item
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Item</DialogTitle>
                <DialogContent>
                    <TextField ref={product} margin="dense"
                        onChange={handleChange} name="product"
                        label="Product" fullWidth />
                    <TextField ref={amount} margin="dense"
                        onChange={handleChange} name="amount"
                        label="Amount" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={addItem}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddItem

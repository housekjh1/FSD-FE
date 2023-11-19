import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Snackbar, Stack } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react"
import AddCar from "./AddCar";
import EditCar from "./EditCar";

const CarList = () => {

    const [cars, setCars] = useState([]);
    const columns = [
        { field: 'brand', headerName: 'Brand', width: 200 },
        { field: 'model', headerName: 'Model', width: 200 },
        { field: 'color', headerName: 'Color', width: 200 },
        { field: 'yyyy', headerName: 'Year', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <EditCar data={row} updateCar={updateCar} />
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>
                <IconButton onClick={() => onDelClick(row.id)}>
                    <DeleteIcon color='error' />
                </IconButton>
        }
    ]
    const [open, setOpen] = useState(false);

    const fetchCars = () => {
        const token = sessionStorage.getItem("jwt");

        fetch(process.env.REACT_APP_SERVER_URL + 'api/cars', {
            headers: { 'Authorization': token }
        })
            .then(resp => resp.json())
            .then(data => {
                setCars(data._embedded.cars)
            })
            .catch(e => console.log(e));
    }

    const onDelClick = (url) => {
        if (window.confirm("Are you sure to delete?")) {
            const token = sessionStorage.getItem("jwt");
            fetch(url, { method: 'DELETE', headers: { 'Authorization': token } })
                .then(resp => {
                    if (resp.ok) {
                        fetchCars()
                        setOpen(true)
                    } else {
                        alert("Something went wrong!");
                    }
                })
                .catch(e => console.log(e));
        }
    }

    const addCar = (car) => {
        const token = sessionStorage.getItem("jwt");
        fetch(process.env.REACT_APP_SERVER_URL + 'api/cars', {
            method: "POST",
            headers: { "Content-Type": "application/json", 'Authorization': token },
            body: JSON.stringify(car)
        })
            .then(resp => {
                if (resp.ok) {
                    fetchCars();
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch(e => console.log(e))
    }

    const updateCar = (car, link) => {
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify(car)
        })
            .then(resp => {
                if (resp.ok) {
                    fetchCars();
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch(e => console.log(e))
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer className={gridClasses.toolbarContainer}>
                <GridToolbarExport />
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
        fetchCars();
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar} />
            </Stack>
            <div style={{ height: 500, width: '100%' }} >
                <DataGrid
                    rows={cars}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                    components={{ Toolbar: CustomToolbar }}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car Deleted" />
            </div>
        </div>
    )
}

export default CarList

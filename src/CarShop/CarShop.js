import { AppBar, Toolbar, Typography } from "@mui/material"
import Login from "./Login"

const CarShop = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Carshop
                    </Typography>
                </Toolbar>
            </AppBar>
            <Login />
        </div>
    )
}

export default CarShop

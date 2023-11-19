import { Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import CarList from "./CarList";

const Login = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [auth, setAuth] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // useEffect(() => {
    //     console.log(user);
    // }, [user])

    const login = async () => {
        await fetch(process.env.REACT_APP_SERVER_URL + 'login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
            .then(resp => {
                const jwtToken = resp.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    setAuth(true);
                } else {
                    setOpen(true);
                }
            })
            .catch(e => console.log(e));
    }

    const logout = () => {
        sessionStorage.removeItem("jwt");
        setAuth(false);
    }

    if (auth) {
        return (
            <div>
                <CarList />
                <Stack spacing={2} alignItems='center' mt={2}>
                    <Button variant="contained" onClick={logout}>Logout</Button>
                </Stack>
            </div>
        )
    } else {
        return (
            <div>
                <Stack spacing={2} alignItems='center' mt={2}>
                    <p className="text-2xl">Login</p>
                    <TextField name="username" label="Username" onChange={handleChange} />
                    <TextField type="password" name="password" label="Password" onChange={handleChange} />
                    <Button variant="outlined" color="primary" onClick={login}>Login</Button>
                </Stack>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Login failed: Check your username and password"
                />
            </div>
        )
    }
}

export default Login

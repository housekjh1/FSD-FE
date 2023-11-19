import { useState } from "react";

const MyForm = () => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const inputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Hello ${user.firstName} ${user.lastName}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input type="text" name="firstName" onChange={inputChange} value={user.firstName} />
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={inputChange} value={user.lastName} />
            <label>Email</label>
            <input type="email" name="email" onChange={inputChange} value={user.email} />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default MyForm

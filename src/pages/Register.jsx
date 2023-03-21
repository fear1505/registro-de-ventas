import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {
    const [mail, setMail] = useState("")
    const [contraseña, setContraseña] = useState("")

    const {user} = useUserContext()
    useRedirectActiveUser(user, "/dashboard")

    const handleSubmit = async e => {
        e.preventDefault()
        console.log("click")
        try {
            const credentialUser = await register({mail, contraseña})
            console.log(credentialUser)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
           <h1>Register</h1>
           <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Ingrese mail" value={mail} onChange={e=> setMail(e.target.value)} />
              <input type="password" placeholder="Ingrese contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)}/>
              <button type="submit">Register</button>
           </form>
        </>
    );
};

export default Register;
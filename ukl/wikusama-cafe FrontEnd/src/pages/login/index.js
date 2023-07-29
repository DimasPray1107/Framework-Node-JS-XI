import React, {useState} from "react"
import axios from "axios"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = event => {
        event.preventDefault()
        let payload = {username, password}

        let url = `http://localhost:9000/auth`

        axios.post(url, payload)
        .then(response => {
            if(response.data.status == true){
                /** login success */
                let token = response.data.token
                /** grab data user */
                let user = response.data.data
                /** store to local storage */
                localStorage.setItem(`token`, token)
                localStorage.setItem(`user`, JSON.stringify(user))
                window.alert(`Login Berhasil`)
                window.location.href = "/menu   "
                
            } else {
                /** wrong username/password */
                window.alert(`Username or Password maybe wrong`)
            }
        })
        .catch(error => {
            window.alert(error)
        })
    }

    return (
        <div style={{backgroundImage:"url(/BackgroundLogin.jpg )", backgroundRepeat: false, backgroundSize:'cover'}} className="vw-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="col-md-4 p-3 shadow bg-white bg-opacity-50 rounded-2">
                <h3 className="text-center">
                    <b>WIKUSAMA </b><b><span className="text-danger">CAFE</span></b>
                </h3>

                <form onSubmit={handleLogin} className="mt-4">
                    <input type="username" className="form-control mb-2" required={true} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type="password" className="form-control mb-2" required={true} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type="submit" className="btn btn-primary w-100 mb-2">
                        Login
                    </button>
                </form>
            </div> 
        </div>
    )
}

export default Login
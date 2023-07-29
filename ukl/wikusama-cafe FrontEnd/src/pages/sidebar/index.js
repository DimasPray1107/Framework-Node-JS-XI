import { Link } from "react-router-dom"
import { useState, useEffect, Children } from "react"

const Sidebar = ({ tittle, children }) => {
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('user'))
        setUsername(data.nama_user)
        setRole(data.role)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.localStorage.href= "/login"
    }
    return (
        <div className="container-fluid">
            <div className="row no-wrap">
                {/* sidebar */}
                <div className="col-2 vh-100 sticky-top"
                    style={{ backgroundColor: `#27374D` }}>
                        <div className="w-100 d-flex justify-content-center my-4">
                            <img src="/logo192.png" alt="brand"
                            style={{width:`150px`}}/>
                        </div>

                        {/* user display */}
                        <div className="w-100 p-3 text-center text-white">
                            <h5 className="m-0">{username}</h5>
                            <small>Position : {role}</small>
                        </div>

                        {/* list menu */}
                        <div className="w-100 ps-3 d-flex flex-column">
                            <Link className={`w-100 p-2 text-start text-white text-decoration-none h6 ${['admin','kasir','manajer'].includes(role) ? 'd-block':'d-none'}`} to="/">
                                <i className="bi bi-house me-2"></i>
                                Dashboard
                            </Link>

                            <Link className={`w-100 p-2 text-start text-white text-decoration-none h6 ${['admin','manajer','kasir'].includes(role) ? 'd-block':'d-none'}`} to="/menu">
                                <i className="bi bi-list-task me-2"></i>
                                Menu
                            </Link>

                            <Link className={`w-100 p-2 text-start text-white text-decoration-none h6 ${['admin','kasir'].includes(role) ? 'd-block':'d-none'}`} to="/user">
                                <i className="bi bi-person me-2"></i>
                                User
                            </Link>

                            <Link className={`w-100 p-2 text-start text-white text-decoration-none h6 ${['admin','kasir'].includes(role) ? 'd-block':'d-none'}`} to="/meja">
                                <i className="bi bi-plus-square me-2"></i>
                                Meja
                            </Link>

                            <Link className={`w-100 p-2 text-start text-white text-decoration-none h6 ${['kasir','manajer'].includes(role) ? 'd-block':'d-none'}`} to="/transaksi">
                                <i className="bi bi-receipt me-2"></i>
                                Transaksi
                            </Link>

                            <Link className="w-100 p-2 text-start text-white text-decoration-none h6" to="/login" onClick={() => handleLogout()}>
                                <i className="bi bi-door-open me-2"></i>
                                Logout
                            </Link>
                        </div>
                    </div>

                {/* content */}
                <div className="col min-vh-100 p-0">
                    {/* header */}
                    <div className="w-100 shadow p-2">
                        <h4><b>Moklet Caffe</b></h4>
                    </div>

                    {/* content page */}
                    <div className="w-100 p-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
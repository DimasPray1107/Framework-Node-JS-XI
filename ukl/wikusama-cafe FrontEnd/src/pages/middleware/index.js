import React from "react";

const Middleware = ({ children, roles}) => {
    if (!localStorage.getItem('token')) {
        return window.location.href = '/login'
    }

    // get user data from local storage
    let user = JSON.parse(localStorage.getItem('user'))
    if (roles.includes(user.role)) {
        return children
    }
    return (
        <div>
            <h1>FORBIDDEN ACCESS</h1>
        </div>
    )
}
export default Middleware
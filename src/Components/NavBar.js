import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){

    return(
        <div>
        <nav className="navbar">
            <NavLink  to="/" exact>Home</NavLink>
            <NavLink to="/create">Create</NavLink>
            <NavLink to="/select">Select</NavLink>
            <NavLink to="/party">Party</NavLink>
        </nav>
        <hr></hr>
        </div>
         
    )
}

export default NavBar
import React from "react"
import "./header.scss"

const Header = () => {
      
    // Will reload when logo is clicked
    return(
        <div onClick={() => {window.location.reload(false)}} className="logo-container">
            <a href="#"><img className="logo" src={require("../../media/logo.png")} alt="Logo"></img></a>
        </div>
    )
}
export default Header

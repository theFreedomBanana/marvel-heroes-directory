import React from "react"
import { Link } from "react-router-dom"
import "./header.css"


const Header = function() {

  return (
    <div className="header container">
      <div className="logo-container">
        <Link to="/" className="icon-marvel-logo-svg"></Link>
      </div>
    </div>
  )
}


export default Header

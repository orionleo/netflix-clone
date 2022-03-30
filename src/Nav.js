import React, { useState } from 'react'
import "./nav.css"

function Nav() {

    let [navBar,setNevBar] = useState(false);
    let changeBackground = ()=>{
        if(window.scrollY>=20){
            setNevBar(true);
        }
        else{
            setNevBar(false);
        }
    }
    window.addEventListener('scroll',changeBackground)
  return (
    <div className={navBar?"nav active":"nav"}>
        <img className="nav__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix Avatar" className="nav__avatar" />
        
    </div>
  )
}

export default Nav
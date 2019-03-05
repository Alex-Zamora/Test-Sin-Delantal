import React from 'react';
import { Link } from 'react-router-dom';
import './Header.sass';

const Header = (props) => {

  return (
    <header>
      <h1>Restaurant App</h1>
      <div className="buttons">
        <div className="create" onClick={props.handleOpenRegister}>
          Create Restaurant
        </div>

        <Link className="logout" onClick={props.logout} to='/'>Logout</Link> 

      </div>
    </header>
  )
}

export default Header

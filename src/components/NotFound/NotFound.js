import React from 'react';
import './NotFound.sass';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='wrapper-not-found'>
      <h2>Not Found Page :(</h2>
      <Link className='link' to='/'>Don't have an account? - Sign UP</Link>
    </div>
  )
}

export default NotFound;

import React, { Component } from 'react';
import './Restaurant.sass';

export default class Restaurant extends Component {
  render() {
    const { name, email, phone, isActive, _id } = this.props.restaurant;
    return (
      <div className={`restaurant-card ${isActive ? 'active' : ''}`}>
        <div className="restaurant-desc">
          <p><span>Name:</span> { name }</p>
          <p><span>Phone:</span> { phone }</p>
          <p><span>Email:</span> <br></br> { email }</p>
          <div className="status-delete">
            {
              isActive
              ? <div className='active'>Active</div>
              : <div className='inactive'>Inactive</div>
            }
            <div 
              className="btn btn-delete" 
              onClick={() => this.props.handleDeleteRestaurant(_id)}
            >
              <i className="far fa-trash-alt"></i>
            </div>
          </div>

        </div>
    </div>
    )
  }
}

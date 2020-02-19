import React from 'react';
import '../App.css'
import axios from 'axios'

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    addHotel = (e) => {
        e.preventDefault();
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        axios.post('http://localhost:5000/hotels', {
            name: formData['name'],
            description: formData['description'],
            distance_to_venue: formData['distance_to_venue'],
            price_category: formData['price_category'],
            amenities: formData['amenities'],
            images: formData['images'],
            rooms: formData['rooms'],
            price_in_usd: formData['price_in_usd']
        }).then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.log(error);
        });   
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="adminForm">
                <div style={{display:'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
                    <h3> Add a Hotel </h3>
                    <h3> User: {this.props.userData.user}</h3>
                    <h3> Status: {this.props.userData.loggedInStatus}</h3>
                </div>
                <form onSubmit={this.addHotel}>
                    <label>Hotel Name: </label>
                    <input ref="name" name="hname" type="text"></input>
                    <label>Description: </label>
                    <input ref="description" name="desc" type="text"></input>
                    <label>Distance to venue: </label>
                    <input ref="distance_to_venue" name="dist" type="text"></input>
                    <label>Price category: </label>
                    <input ref="price_category" name="pc" type="text"></input>
                    <label>Amenities: </label>
                    <input ref="amenities" name="pc" type="text"></input>
                    <label>Images: </label>
                    <input ref="images" name="pc" type="text"></input>
                    <label>Room type: </label>
                    <input ref="rooms" name="rooms" type="text"></input>
                    <label>Room Price: </label>
                    <input ref="price_in_usd" name="rpice" type="text"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Admin;

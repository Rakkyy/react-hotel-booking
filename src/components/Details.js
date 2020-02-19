import React from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            hotelId:""
        }
        this.filterData = this.filterData.bind(this);
    }

    componentDidMount() {
        const {match : { params }} = this.props;
        axios.get(`http://localhost:5000/hotels/${params.hotelId}`).then(
            (result) => {
                this.setState({
                    rooms: result.data.rooms,
                    hotelId: params.hotelId
                })
            }
        )
    }

    filterData(event) {
        if(event.target.value === 'by_price') {
            this.setState((state) => ({
                rooms: state.rooms.sort((a,b) => a.price_in_usd - b.price_in_usd)
            }))
        } else if(event.target.value === 'by_guests') {
            this.setState((state) => ({
                rooms: state.rooms.sort((a,b) => a.max_occupancy - b.max_occupancy)
            }));
        }
    }

    render() {
        const {rooms,hotelId} = this.state;
        return(
        <>
            <div style={{display:'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
                <h1> Room Details </h1>
                <h3> User: {this.props.userData.user}</h3>
                <h3> Status: {this.props.userData.loggedInStatus}</h3>
            </div>
            <span>Sort by</span>
            <select className="filter" onChange={this.filterData}>
                <option value="by_price">By Price</option>
                <option value="by_guests">By Number of Guests</option>
            </select>
            {rooms.map((room) => {
                return <div className="roomsList" key={room.id}>
                <h3>{room.name}</h3>
                <span> <label> Details: </label> {room.description}</span>
                <span> <label> Maximum Occupancy: </label> {room.max_occupancy}</span>
                <span> <label> Price per night: </label> {room.price_in_usd}</span>
                <Link to={`/confirm/${hotelId}/${room.id}`}>
                    <button className="bookNow"> Book now </button>
                </Link>
            </div>
            })}
            
        </>)
    }
}

export default Details;

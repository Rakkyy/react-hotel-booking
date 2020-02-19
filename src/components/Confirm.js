import React from 'react';
import '../App.css';
import axios from 'axios';
import uuidv4 from 'uuid'

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room: [],
            hotel: []
        }
    }

    componentDidMount() {
        const {match : { params }} = this.props;
        axios.get(`http://localhost:5000/hotels/${params.hotelId}/`).then(
            (result) => {
                this.setState({
                    room : result.data.rooms.filter(room => room.id === params.roomId)[0],
                    hotel: result.data
                })
            }
        )
    }

    render() {
        const {hotel, room} = this.state;
        return (
            <div className="confirmPage">
                <div style={{display:'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
                    <h1> Confirmation </h1>
                    <h3> User: {this.props.userData.user}</h3>
                    <h3> Status: {this.props.userData.loggedInStatus}</h3>
                </div>
                <span>
                    <label>Booking Id: </label> {uuidv4()}
                </span>
                <span>
                    <label>Name: </label>
                </span>
                <span>
                    <label> Hotel Name:</label> {hotel.name}
                </span>
                <span>
                    <label> Room: </label> {room.name}
                </span>
                <span>
                    <label> Amenities: </label> {
                        (hotel.amenities ? hotel.amenities.map((am,index)=>{
                            return <span key={index} >{am}</span>
                        }) : "")
                    }
                </span>
            </div>
        )
    }
}

export default Confirm;

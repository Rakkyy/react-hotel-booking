import React from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            hotels: [],
            fullList: [],
            hasMore: true
        }
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:5000/hotels").then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    hotels: result.data.slice(0, 2),
                    fullList: result.data
                })
            }
        )
    }

    handleLoadMore() {
        this.setState((state) => ({
            hasMore: state.hotels.length + 1 < state.fullList.length,
            hotels: state.fullList.slice(0, state.hotels.length + 2)
        }));
    }

    render() {
        const {isLoaded, hotels, hasMore} = this.state;
        if(!isLoaded) {
            return <h1>Loading...</h1>
        } else {
           return  (
               <>
                <div style={{display:'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
                    <h1> Hotel </h1>
                    <h3> User: {this.props.userData.user}</h3>
                    <h3> Status: {this.props.userData.loggedInStatus} </h3>
                </div>
                <div className="hotelsList">
                <div>
                    {hotels.map((hotel) => {
                    return <div className="hotelItem" key={hotel.id}>
                            <img alt="img" src={hotel.images[0]}></img>
                            <h3> {hotel.name} </h3>
                            <span> {hotel.description} </span>
                            <Link to={`/details/${hotel.id}`} className="hotelDetails">
                                <span> Show Rooms </span>
                            </Link>
                        </div>
                    })}
                </div>
                </div>
                <button onClick={this.handleLoadMore} className={hasMore ? 'loadMore' : 'loadMore hideButton'}>Load more</button>
            </>)
        }
    }
}

export default Home;

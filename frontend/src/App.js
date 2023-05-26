import { useEffect, useState } from "react";

import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Room, Star } from "@material-ui/icons"
import "./app.css"
import axios from "axios";
import { format } from "timeago.js";
import Swal from 'sweetalert';
// import { useForm } from '../../frontend/src/hooks/useForm';

const REACT_APP_MAPBOX_TOKEN = 'pk.eyJ1IjoibmF0c29scDc3IiwiYSI6ImNsaHF5ejBwYTBkajgzZG1yem02cXI2NW8ifQ.H2s0rN7AbaF2N2kRXWEkxA';

function App() {
  // const currentUser = "Nat Sol"
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [username, setUsername] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);


  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: -89.23624,
    longitude: 13.68023,
    zoom: 14
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, [])

  const handleMarkerClick = (id, lat, lng) => {
    setCurrentPlaceId(id);
    // console.log(id);
    setViewport({ ...viewport, latitude: lat, longitude: lng });
  }

  const handleNewPinClick = (e) => {
    const { lngLat } = e;
    const lat = lngLat.lat;
    const lng = lngLat.lng;

    setLat(lat);
    setLong(lng);

    setNewPlace({
      lat,
      lng,
    });
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newPin = {
  //     username: currentUser,
  //     title,
  //     desc,
  //     rating,
  //     lat: newPlace.lat,
  //     lng: newPlace.lng
  //   };
  //   try {
  //     const res = await axios.post("/pins", newPin);
  //     setPins([...pins, res.data]);
  //     setNewPlace(null);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //Initial values for the form
  // const [formValues, handleInputChange] = useForm({
  //   username: currentUser,
  //   title: '',
  //   desc: '',
  //   rating: 0,
  //   lat: 0,
  //   long: 0
  // });

  // // Destructuring the formValues
  // const {
  //   username,
  //   title,
  //   desc,
  //   rating,
  //   lat,
  //   long
  // } = formValues;

  const handleClick = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/pins';


    const body = {
      "username": username,
      "title": title,
      "desc": desc,
      "rating": rating,
      "lat": lat,
      "long": long
    };

    // axios.post(url, body)
    //   .then(response => {
    //     Swal("Success", "Pin Created!", "success")
    //   });

    try {
      const { data } = await axios.post(url, body).then(response => {
        Swal("Success", "Pin Created!", "success")
      });;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="App">






      {/* <div>
        <marquee>Chronicles Mapping App</marquee>
      </div>       */}

      <ReactMapGL
        initialViewState={{
          longitude: -89.23624,
          latitude: 13.68023,
          zoom: 14
        }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        onDblClick={handleNewPinClick}
        transitionDuration="200"
      >

        {username ?
          (<button className="button logout">Log Out</button>) :
          (<div className="buttons">
            <button className="button login">Login</button>
            <button className="button register">Register</button>
          </div>)}

        {pins.map((p) => (
          <>
            <Marker
              key={p.title}
              latitude={p.lat}
              longitude={p.long}
              anchor="bottom"
              offsetLeft={visualViewport.zoom * 5}
              offsetTop={-visualViewport.zoom * 10}
            >
              {/* <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Logo_UCA_2015.jpg" width={50} height={70}/> */}
              <Room
                style={{
                  fontSize: visualViewport.zoom * 10,
                  color: p.username === username ? "blue" : "red",
                  cursor: "pointer"
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.lng)}
              />
            </Marker>

            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                onClose={() => setCurrentPlaceId(null)}
                key={p.lat + p.lng}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="starts">
                    {/* <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" /> */}
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                  <label>Information</label>
                  <span className="username">Created by <b>{p.username}</b></span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup >
            )}

          </>
        ))}
        {newPlace && (

          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.lng}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}
          // key={newPlace.lat + newPlace.lng}
          >
            <div>
              <form onSubmit={(e) => handleClick(e)}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)} />
                <label>Review</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)} />
                <label>Rating</label>
                <select
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  {/* {Array(.rating).fill(<Star className="star" />)} */}
                </select>
                <input
                  className="submitButton"
                  type="submit"
                  value="Add pin"
                />
              </form>
            </div>
          </Popup>
        )}

      </ReactMapGL>

    </div >
  );
}

export default App;

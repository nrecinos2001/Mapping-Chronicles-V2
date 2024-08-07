/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/*
  Este archivo es el que se encarga de renderizar la aplicación, es el primer archivo que se ejecuta al iniciar la aplicación. 
*/
import { useCallback, useEffect, useState } from "react";

import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Room, Star } from "@material-ui/icons"
import "./app.css"
import axios from "axios";
import { format } from "timeago.js";
import Swal from 'sweetalert';
import Register from "./components/Register";
import Login from "./components/Login";
import EntradasUCALayer from "./components/layers/EntradasUCALayer";
import BufferEntradasUCALayer from "./components/layers/BufferEntradasUCA";
import RutasPrimarias from "./components/layers/RutasPrimarias";
import ParadasPrimarias from "./components/layers/ParadasPrimarias";
import LocationComponent from "./components/LocationComponent";
import DynamicBuffer from "./components/DynamicBuffer";
import MyBusStops from "./components/MyBusStops";
import Map from "./components/Map";
import DynamicPopUp from "./components/DynamicPopUp";
import Direction from "./components/Direction";
import NearestBustStop from "./components/NearestBusStop";
import Radius from "./components/Radius";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/src/directions";
const REACT_APP_MAPBOX_TOKEN = 'pk.eyJ1IjoibmF0c29scDc3IiwiYSI6ImNsaHF5ejBwYTBkajgzZG1yem02cXI2NW8ifQ.H2s0rN7AbaF2N2kRXWEkxA';

function App() {

    const myStorage = window.localStorage;

    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [username, setUsername] = useState(myStorage.getItem("user"));
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [rating, setRating] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: -89.23624,
        longitude: 13.68023,
        zoom: 14
    });


    useEffect(() => {
        const getPins = async () => {
            const url = 'http://localhost:3000/api/pins'
            try {
                const res = await axios.get(url);
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


    const handleClick = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/api/pins';

        const body = {
            "username": username,
            "title": title,
            "desc": desc,
            "rating": rating,
            "lat": lat,
            "long": long
        };

        try {
            const { data } = await axios.post(url, body);
            console.log(data);
            Swal("Success", "Pin Created!", "success");
            window.location.reload()
        } catch (error) {
            console.log(error);
            Swal({
                icon: 'error',
                title: 'Error',
                text: 'Not Created!, Try Again.'
            });
        }

    }

    const handleLogout = () => {
        myStorage.removeItem("user");
        setUsername(null);
        Swal("Success", "User Logout Correctly", "success");
    }

  // <>

  const [ coords, setCoords ] = useState({ lat: 0, lng: 0 });
  const [ showPopup, setTogglePopup ] = useState(false)
  const [ coordsLayerSelected, setCoordsLayerSelected ] = useState({lat: 0, lng: 0})
  const [ dataFeature, setDataFeature ] = useState({properties:{id:0, nombre:""}})
  const [ radius, setRadius ] = useState(1000)


  const handleMapOnClick =  (e) => {
    if(!e) return
    //console.log(e.lngLat)
    setCoordsLayerSelected({
      lat : e.lngLat.lat,
      lng : e.lngLat.lng
    }
      )
    const feature = e.features[0]
    // console.log(feature)
    setDataFeature(feature)
    setTogglePopup(true)
    //console.log('click' + showPopup + coordsLayerSelected.lat)
  }

  // layer controler
  const [ layerControler, setLayerControler ] = useState({
    rutasPrimarias: false,
    paradasPrimarias: false,
    entradasUCA: true,
    bufferEntradasUCA: false,
    dynamicBuffer: true,
    myBusStops: true,
    direction: true,
    nearestBusStop: true,
  })

  const handleLayerControler = (e) => {
    console.log(e.target.name)
    setLayerControler({
      ...layerControler,
      [e.target.name]: e.target.checked
    })
  }

  // Layer controler container
  const LayerControllerContainer = () =>  {


    return(
      <div className="layer-controler-container">
        <h2 style={{color:'white', textAlign: 'left', marginBottom: 15}}>Capas</h2>
        <div className="layer-controler">
          <input type="checkbox" name="rutasPrimarias" checked={layerControler.rutasPrimarias} onChange={handleLayerControler} />
          <b htmlFor="rutasPrimarias">Rutas</b>
          <img src={require('./assets/Rutas.png')} alt="rutasPrimarias" />
        </div>
        <div className="layer-controler">
          <input type="checkbox" name="paradasPrimarias" checked={layerControler.paradasPrimarias} onChange={handleLayerControler} />
          <b htmlFor="paradasPrimarias">Paradas de Bus</b>
          <img src={require('./assets/ParadasPrimarias.png')} alt="paradasPrimarias" />
        </div>
        <div className="layer-controler">
          <input type="checkbox" name="entradasUCA" checked={layerControler.entradasUCA} onChange={handleLayerControler} />
          <b htmlFor="entradasUCA">Entradas UCA</b>
          <img src={require('./assets/Entradas.png')} alt="entradasUCA" />
        </div>
        <div className="layer-controler">
          <input type="checkbox" name="bufferEntradasUCA" checked={layerControler.bufferEntradasUCA} onChange={handleLayerControler} />
          <b htmlFor="bufferEntradasUCA">Radio Entradas UCA</b>
          <img src={require('./assets/BufferEntradas.png')} alt="bufferEntradasUCA" />
        </div>
        <div className="layer-controler">
          <input type="checkbox" name="dynamicBuffer" checked={layerControler.dynamicBuffer} onChange={handleLayerControler} />
          <b htmlFor="dynamicBuffer">Mi Rango</b>
          <img src={require('./assets/MiRango.png')} alt="dynamicBuffer" />
        </div>
        <div className="layer-controler">
          <input type="checkbox" name="myBusStops" checked={layerControler.myBusStops} onChange={handleLayerControler} />
          <b htmlFor="myBusStops">Paradas Cercanas</b>
          <img src={require('./assets/MyBusStop.png')} alt="myBusStops" />
        </div>
        <div className="layer-controler">
          <input type="checkbox" name="direction" checked={layerControler.direction} onChange={handleLayerControler} />
          <b htmlFor="direction">Direction</b>
          <img src={require('./assets/Direccion.png')} alt="direction" />
        </div>
        <div className="layer-controler">
          <input type="checkbox" name="nearestBusStop" checked={layerControler.nearestBusStop} onChange={handleLayerControler} />
          <b htmlFor="nearestBusStop">Parada más cercana</b>
          <img src={require('./assets/Nearest.png')} alt="nearestBusStop" />
          </div>
      </div>

    )
  }

  return (
    <div className="App">
      <LayerControllerContainer
    
      />
      <header className="App-header"
      >
        <div className="logo">
        <h1>Mapping Chronicles
        </h1>
        <img src={require('./assets/logo.png')} alt="logo"/>
        </div>
        <div className="aboutUs">
          <a href="https://github.com/NASP-tech/Mapping-Chronicles/tree/main"><img className="githubLogo" src={require('./assets/githublogo.png')} alt="github" /></a>
        </div>
      </header>
   <ReactMapGL
        initialViewState={{
          longitude: -89.23624,
          latitude: 13.68023,
          zoom: 14
        }}
        style={{ width: '100vw', height: '94vh' }}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        onDblClick={handleNewPinClick}
        interactiveLayerIds={['rutasPrimarias', 'paradasPrimarias', 'entradasUCA', 'bufferEntradasUCA', 'myBusStops','nearest-bus-stop']}
        onClick={(e) => {
          // console.log( e.features[0] ? e.features[0] : "undefined")
          setTogglePopup(false)
          if(!e.features[0]) {
            setDataFeature({properties:{id:0, nombre:""}})
            return
          }
          handleMapOnClick(e.features[0] ? e : null)

        } }
        on
        transitionDuration="200"
      >
        <LocationComponent
            offsetLeft={visualViewport.zoom * 5}
            offsetTop={-visualViewport.zoom * 10} 
            setCoords={setCoords} 
            style={{
              fontSize: visualViewport.zoom * 9 || 30,
              color: "#58eb34",
              cursor: "pointer"
            }}/>


        <RutasPrimarias idRouteSelected={showPopup ? dataFeature.properties.FID : null} layout={{visibility : layerControler.rutasPrimarias ? 'visible' : 'none' }}/> 
        <EntradasUCALayer layout={{visibility : layerControler.entradasUCA ? 'visible' : 'none' }} /> 
        <ParadasPrimarias layout={{visibility : layerControler.paradasPrimarias ? 'visible' : 'none'}}/>
        <BufferEntradasUCALayer layout={{visibility : layerControler.bufferEntradasUCA ? 'visible' : 'none' }}/> 
        
        {coords.lat !== 0 && coords.lng !== 0 && (
          <NearestBustStop coords={coords} layout={{visibility : layerControler.nearestBusStop ? 'visible' : 'none'}} />)
        }
        {
          showPopup && (
            <DynamicPopUp
            feature={dataFeature}
            latitude={coordsLayerSelected.lat}
            longitude={coordsLayerSelected.lng}
              onClose={() => setTogglePopup(false)}
            />  
          )
        }
        
        {coords.lat !== 0 && coords.lng !== 0 && (
          <MyBusStops coords={coords} idPointSelected={showPopup ? dataFeature.properties.id : null} layout={{visibility : layerControler.myBusStops ? 'visible' : 'none' }} radius={radius}/>) }  
        <Radius radius={radius} setRadius={setRadius}/>
        {coords.lat !== 0 && coords.lng !== 0 && (
          <DynamicBuffer coords={coords} layout={{visibility : layerControler.dynamicBuffer ? 'visible' : 'none' }} radius={radius}/>) }  
        {coords.lat !== 0 && coords.lng !== 0 && (
          <Direction coords={coords} to={coordsLayerSelected} layout={{visibility : layerControler.direction ? 'visible' : 'none' }} />) } 

          <NavigationControl
            position="bottom-left"
          />
        

                {username ?
                    (
                        <button
                            className="button logout"
                            onClick={handleLogout}
                        >Log Out</button>
                    ) : (
                        <div className="buttons">
                            <button
                                className="button login"
                                onClick={
                                    () => setShowLogin(true)
                                }
                            >Login</button>
                            <button
                                className="button register"
                                onClick={() => setShowRegister(true)}
                            >Register</button>
                        </div>
                    )}
                {
                    showRegister && <Register setShowRegister={setShowRegister} />
                }
                {
                    showLogin && <Login
                        setShowLogin={setShowLogin}
                        myStorage={myStorage}
                        setUsername={setUsername}
                    />
                }

                {pins.map((p) => (
                    <div key={ p._id  }>
                        <Marker
                            key={p.title}
                            latitude={p.lat}
                            longitude={p.long}
                            anchor="bottom"
                            offsetLeft={visualViewport.zoom * 5}
                            offsetTop={-visualViewport.zoom * 10}
                        >
                            <Room
                                style={{
                                    fontSize: visualViewport.zoom * 10 || 20,
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
                                        {Array(p.rating).fill(<Star className="star" />)}
                                    </div>
                                    <label>Information</label>
                                    <span className="username">Created by <b>{p.username}</b></span>
                                    <span className="date">{format(p.createdAt)}</span>
                                </div>
                            </Popup >
                        )}

                    </div>
                ))}
                {newPlace && (

                    <Popup
                        latitude={newPlace.lat}
                        longitude={newPlace.lng}
                        closeButton={true}
                        closeOnClick={false}
                        anchor="left"
                        onClose={() => setNewPlace(null)}
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

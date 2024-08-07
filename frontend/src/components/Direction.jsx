/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/* 
    Este componente se encarga de mostrar la ruta de un punto a otro, en el mapa.
*/
import React, {useState, useEffect} from "react";
import { Layer, Source } from "react-map-gl";
import './Direction.css'
export default function Direction ({ feature, coords,to,  ...props}){

    const [ direction, setDirection] = useState({})
    const [ steps, setSteps ] = useState([])
    const [ vehicle, setVehicle ] = useState('Caminando')
    const [ vehicleRoute, setVehicleRoute ] = useState('walking')
    
    //"https://api.mapbox.com/directions/v5/mapbox/walking/-89.14655,13.698851;-89.14497149275024,13.701844910380359?steps=true&language=es&overview=full&geometries=geojson&access_token=pk.eyJ1IjoibmF0c29scDc3IiwiYSI6ImNsaHF5ejBwYTBkajgzZG1yem02cXI2NW8ifQ.H2s0rN7AbaF2N2kRXWEkxA"
    
    useEffect(() => {
        const from = (coords.lng || -89.14655) + "," + (coords.lat || 13.698851)
        const to2 = (to.lng || -89.23624) + "," + (to.lat || 13.68023)
        fetch(`https://api.mapbox.com/directions/v5/mapbox/${vehicleRoute}/${from};${to2}?steps=true&language=es&overview=full&geometries=geojson&access_token=pk.eyJ1IjoibmF0c29scDc3IiwiYSI6ImNsaHF5ejBwYTBkajgzZG1yem02cXI2NW8ifQ.H2s0rN7AbaF2N2kRXWEkxA`).then
        (response => response.json()).then(data => {
            //console.log(data)

            const routes = data.routes
                
            setSteps(routes[0].legs[0].steps)
            const geojson = {
                type: 'FeatureCollection',
                features: []
            }

            routes.forEach(route => {
                const geometry = {
                    type: 'LineString',
                    coordinates: route.geometry.coordinates
                }

                const feature = {
                    type: 'Feature',
                    geometry: geometry
                }
                geojson.features.push(feature)
                })
                //console.log(geojson)
            setDirection(geojson)
        })
  }, [coords, to, vehicleRoute])

    const changeVehicle = () => {
        if(vehicle === 'Caminando'){
            setVehicle('En vehiculo')
            setVehicleRoute('driving')
        }else{
            setVehicle('Caminando')
            setVehicleRoute('walking')
        }
    }

    return(
        <>
        
        <div className="container" >
            <h1 >Como llegar</h1>
            
            <div className="routeController">
            <b>{vehicle}</b>

            <div className="switchContainer">
            <label className="switch">
                <input type="checkbox" id="togBtn" onChange={changeVehicle}/>
                <div className="slider round">
                </div>
            </label>
            {vehicle === 'Caminando' ?
                <img src="https://img.icons8.com/ios-filled/50/FFFFFF/walking.png" alt="walking" />
                :
                <img src="https://img.icons8.com/ios-filled/50/FFFFFF/car.png" alt="car" />
            }
            </div>
            


            

            </div>
            {
                steps.length > 0 &&
                steps.map((step,index) => 
                    <li className="element" key={ index }>{index + 1} {step.maneuver.instruction}</li>)
            }
        </div>
        { direction ? 
        <Source id="direction" type="geojson" data={direction} >
            <Layer id="direction" type="line" paint={{'line-color': '#7b00ff', 'line-width': 4}} {...props}/>
        </Source> 
        : null}
        </>
    )
}

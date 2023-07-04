/*
    Este componente se encarga de mostrar las paradas de bus en el mapa. 
    Se utiliza el hook useState para almacenar los datos de la capa
    Se utiliza el hook useEffect para realizar la petición de los datos al servidor
    Se utiliza el componente Source para definir la fuente de los datos
    Se utiliza el componente Layer para definir la capa de los datos
    Se utiliza el componente BASE_URL para definir la ruta base de la petición
*/
import React, {useState, useEffect} from "react"
import { Layer, Source } from "react-map-gl";
import { BASE_URL } from "../services";
export default function MyBusStops({coords, radius, idPointSelected , ...props}){

    const [id, setId ] = useState(1);
    const [ data, setData ] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/layers/getBusStopsByRadius/?latitude=${coords.lat}&longitude=${coords.lng}&radius=${radius || 5000}`)
        .then(res => res.json())
        .then(
            (result) => {
            setData(result);
        }).catch(err => {
            console.log(err);
        }
        )

    },[coords, radius])

    useEffect(() => {
        setId(idPointSelected || 1)
    },[idPointSelected])



    return (
        data[0] &&
            <Source  id="myBusStops" type="geojson" data={data[0]} >
            <Layer  id="myBusStops"  type="circle" 
            paint=
            {
                { 'circle-color': [
                    'match',
                    ['get', 'id'], 
                    id, '#ff0000',
                    '#ff7300',
                ], 'circle-radius': [
                    'match',
                    ['get', 'id'],
                    id, 8,
                    4,
                ],
                
                
                'circle-stroke-width': [
                    'match',
                    ['get', 'id'],
                    id, 4,
                    1,
                ],
                 'circle-stroke-color': [
                    'match',
                    ['get', 'id'],
                    id, '#7b00ff',
                    'white',
                 ]}} 
                {...props}
                />
        </Source>
    )
}


//paint={{'circle-radius': 5, 'circle-color': '#FFA500'}}
// paint={{'circle-color': '#007cbf', 'circle-radius': 5, 'circle-stroke-width': 1, 'circle-stroke-color': '#fff'}} 
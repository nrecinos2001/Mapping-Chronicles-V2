/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/*
    Este componente se encarga de mostrar un popup dinámico en el mapa.
*/
import React from "react";
import { Popup } from "react-map-gl";

export default function DynamicPopUp ({coords,  feature, ...props }) {
    
    console.log(feature)

    return (
        <Popup
            tipSize={20}
            anchor="bottom-right"
            closeOnClick={false}
            closeButton={true}
            {...props}
        >
            <div className="popup">
              <h3>Parada</h3>
              <p>{feature.properties.NA2}</p>
              <h5>Dirección</h5>
              <p>{feature.properties.Parada_PGO} </p>
              {feature.properties.km &&   <p>Distancia ruta completa: {Math.round(feature.properties.km)} km </p>}
              <h5>Ruta</h5>
              <p>{feature.properties.Ruta}</p>
              <p>{feature.properties.line_name}</p>
            </div>
        </Popup>
    );
    }
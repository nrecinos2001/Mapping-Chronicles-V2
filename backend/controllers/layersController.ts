import { Request, Response } from "express";

import { ParadasPrimarias, BufferEntradasUCA, EntradasUCA, RutasPrimarias } from '@Models/index';
import { IResponseDynamicBuffer } from "types";
/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const turf = require('@turf/turf');

export const dinamicBuffer = function (req: Request, res: IResponseDynamicBuffer) {
    
    const requestUrl = req.url;
    
    const url = new URL(requestUrl, `http://${req.headers.host}`)

    const latitude = url.searchParams.get('latitude')
    const longitude = url.searchParams.get('longitude')
    const radius = url.searchParams.get('radius')
    
    // creating buffer
    var point = turf.point([Number(longitude), Number(latitude)]);
    var buffered = turf.buffer(point, radius ? radius : 50, {units: 'meters'});
    
    const bufferedLayer = turf.featureCollection([buffered]);

    

    // response
    res.setHeader('Content-Type', 'application/json');
    
    res.body = buffered;

    res.status(200).json([res.body]);
}


export const getBusStopsByRadius = async function (req: Request, res: Response) {

    const requestUrl = req.url

    const url = new URL(requestUrl, `http://${req.headers.host}`)

    const latitude = url.searchParams.get('latitude')
    const longitude = url.searchParams.get('longitude')
    const radius = url.searchParams.get('radius')

    var point = turf.point([Number(longitude), Number(latitude)]);
    var buffered = turf.buffer(point, radius ? radius : 50, {units: 'meters'});


    try{
        const busStops = await ParadasPrimarias.find()
        // console.log( [busStops[0]] )
        
        // console.log({...busStops[0]})
        const filteredPoints = turf.pointsWithinPolygon(busStops[0]._doc , buffered )
        //const filteredPointsCollection = turf.featureCollection([filteredPoints])
        res.status(200).json([filteredPoints])


    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
}


export const getNearestBusStop = async function (req: Request, res: Response) {
    
        const requestUrl = req.url
    
        const url = new URL(requestUrl, `http://${req.headers.host}`)
    
        const latitude = url.searchParams.get('latitude')
        const longitude = url.searchParams.get('longitude')
    
        var point = turf.point([Number(longitude), Number(latitude)]);
        
        try{
            const busStops = await ParadasPrimarias.find()

            const nearestPoint = turf.nearestPoint(point, busStops[0]._doc)

            res.status(200).json([nearestPoint])
        }
        catch(err){
            console.log(err)
            res.status(500).json({ message: err })
        }
    }


export const getBufferEntradasUCA = async function (req: Request, res: Response) {
    try{
        const bufferEntradasUCA = await BufferEntradasUCA.find();
        res.status(200).json(bufferEntradasUCA);
    }
    catch(err){
        res.status(500).json({ message: err });
    }
}


export const getEntradasUCA = async function (req: Request, res: Response) {
    try{
        const entradasUCA = await EntradasUCA.find();
        res.status(200).json(entradasUCA);
    }
    catch(err){
        res.status(500).json({ message: err });
    }
}

export const getParadasPrimarias = async function (req: Request, res: Response) {
    try{
        const paradasPrimarias = await ParadasPrimarias.find(); 
        res.status(200).json(paradasPrimarias);
    }
    catch(err){
        res.status(500).json({ message: err });
    }
}

export const getRutasPrimarias = async function (req: Request, res: Response) {
    try {
        const rutasPrimarias = await RutasPrimarias.find();
        res.status(200).json(rutasPrimarias);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
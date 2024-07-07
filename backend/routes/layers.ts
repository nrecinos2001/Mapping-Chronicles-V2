/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import express from 'express';
import * as layersController from '@Controllers/index';

export const layerRouter = express.Router();

layerRouter.get('/getMyBuffer', layersController.dinamicBuffer)
layerRouter.get('/getBusStopsByRadius', layersController.getBusStopsByRadius)
layerRouter.get('/getNearestBusStop', layersController.getNearestBusStop)
layerRouter.get('/getEntradasUCA', layersController.getEntradasUCA)
layerRouter.get('/getParadasPrimarias', layersController.getParadasPrimarias)
layerRouter.get('/getRutasPrimarias', layersController.getRutasPrimarias)
layerRouter.get('/getBufferEntradasUCA', layersController.getBufferEntradasUCA)

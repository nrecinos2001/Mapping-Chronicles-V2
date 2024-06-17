/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();
import { pinRouter } from "./routes/pinRoutes";
import userRoute from "./routes/userRoutes";
import { layerRouter } from "./routes/layers";
dotenv.config();

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/chronicles',
/*     {
        'pars'
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } */)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err: Error) => { console.log(err) });

app.use("/api/pins", pinRouter);
app.use("/api/users", userRoute);
app.use("/api/layers", layerRouter);
app.listen(5000, () => {
    console.log("Server is running on port 5000 :)");

})
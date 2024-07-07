/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import mongoose from 'mongoose'; // note that mongoose@5 is used
import * as dotenv from 'dotenv';
//const dotenv = require('dotenv');

// handle uncaught exceptions
process.on('uncaughtException', (err) => { // i.e database connection errors
    console.log(err.name, err.message);
    console.log('uncaughtException, shutting down');
    process.exit(1);
});

dotenv.config({ path: './config.env' }); // use my defined enviroment variables. needs to be prior invoking the app  file so it can be loaded correctly
import { app } from './app';

const dbPassword = process.env.DATABASE_PASSWORD as string;
const dbConnection = process.env.DATABASE as string;
const DB = dbConnection?.replace('<PASSWORD>', dbPassword as string) as string;// replace the password into the connection string
//const DB = process.env.DATABASE_LOCAL;

// database connection
mongoose.connect(DB, {
    // options to deal with some deprecation warnings
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    //useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection made successfully');
});

/* start server's listener */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

process.on('unhandledRejection', (err: Error) => { // i.e database connection errors
    console.log(err.name, err.message);

    // give the server time to handle the pending requests before it shut downs gracefully
    server.close(() => {
        process.exit(1);
    });
});

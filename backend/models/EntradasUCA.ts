/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import mongoose from 'mongoose';

const EntradasUCASchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

export const EntradasUca = mongoose.model('EntradasUCA', EntradasUCASchema, 'entradas_uca')
/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import mongoose from 'mongoose';
import { IEntradasUCA } from 'types';

const EntradasUCASchema = new mongoose.Schema<IEntradasUCA>({
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

export const EntradasUCA = mongoose.model<IEntradasUCA>('EntradasUCA', EntradasUCASchema, 'entradas_uca')
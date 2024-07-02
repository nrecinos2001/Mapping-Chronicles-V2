/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import mongoose from 'mongoose';
import { IBufferEntradasUCA } from 'types';

const BufferEntradasUCASchema = new mongoose.Schema<IBufferEntradasUCA>({
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

export const BufferEntradasUCA = mongoose.model<IBufferEntradasUCA>('BufferEntradasUCA', BufferEntradasUCASchema, 'buffer_entradas_uca');

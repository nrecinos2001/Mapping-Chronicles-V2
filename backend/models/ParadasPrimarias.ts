/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import mongoose from 'mongoose';
import { IParadasPrimarias } from 'types';

const ParadasPrimariasSchema = new mongoose.Schema<IParadasPrimarias>({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

export const ParadasPrimarias = mongoose.model<IParadasPrimarias>('ParadasPrimarias', ParadasPrimariasSchema, 'paradas_primarias');

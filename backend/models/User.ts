/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import mongoose from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import { IUserModel } from 'types';
const { Schema } = mongoose;

const userSchema = new Schema<IUserModel>({
    username: {
        type: String,
        required: [true, 'username must be provided'],
        min: [3, 'minimum allowed username length is 3'],
        max: [20, 'maximum allowed username length is 20'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        unique: true,
        lowercase: true, // transform email to lowercase
        validate: [validator.isEmail, 'provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        minlength: 6,
        select: false,
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['driver', 'student'],
        default: 'student',
    },
});

// encrypt password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); //only encrypt password when user changes it or creates a new one on singup, not when other data is updated like the email i.e

    this.password = await bcrypt.hash(this.password, 12); // the higher the value (12), the better the encryption, more cpu load is needed tho
    next();
});

// instance method which will be available on all documents of the collection
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword);
};

export const User = mongoose.model<IUserModel>('User', userSchema)//as Model<IUserModel>;


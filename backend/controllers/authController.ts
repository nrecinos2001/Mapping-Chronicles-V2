/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { AppError, catchAsync } from '@Utils/index';
import { jwtCookieExpiresIn, jwtExpiresIn, jwtSecret } from '@Constants/index';

const signToken = (id) => jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpiresIn,
});

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + jwtCookieExpiresIn * 24 * 60 * 60 * 1000), // convert to milliseconds
        //secure: true, // https
        //httpOnly: true, // do not allow browser to access cookie to try to prevent xss <-- currently not working so I will disable it for now
    });

    user.password = undefined; // remove passwords from output when generating user related stuff

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

export const register = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    // create jwt to log in the user right after singing up. JWT_SECRET is used to sign the new user's id
    createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email exists
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // 2) check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password'); // +password so I can select the password field which I've been defined as unselectable by default
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    // 3) if ok, send token to client
    createSendToken(user, 200, res);
});

export const protect = catchAsync(async (req, res, next) => {
    // 1) get token and check if it exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // format is Bearer <token>, therefore need [1] for <token> value
    }
    if (!token) {
        return next(new AppError('You are not logged in. Please log in to get access', 401));
    }
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, jwtSecret); // will decode user ID

    // 3) check if user that made the request still exists
    const currentUser = await User.findById(decoded.id); // this is why I decode the id from the token, so I can now query by userId and make sure that the token belongs to the requesting user
    if (!currentUser) {
        return next(new AppError('User no longer exists', 401));
    }

    // 4) check if user changed passwor after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password. Log in again', 401));
    }

    req.user = currentUser; // send current user's info into the middlware
    next(); // grant access to protected route... go to 'next' middlware
});

export const restrictTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) { // the role is comming in the middleware from the above function protect(), which in the routes is placed before the restricTo
        return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
};

/*
  Copyright 2023 Mapping Chronicles
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import { emailHost, emailPassword, emailPort, emailSender, emailUsername } from '@Constants/mailer';
import { EmailOptions } from 'types';

import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const sendEmail = async (options: EmailOptions) => {
    // 1) Create transporter
    const transporterOptions: SMTPTransport.Options = {
        host: emailHost,
        port: emailPort,
        auth: {
            user: emailUsername,
            pass: emailPassword,
        },
    };

    const transporter = nodemailer.createTransport(transporterOptions);
    // 2) Define email options
    const mailOptions = {
        from: emailSender,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

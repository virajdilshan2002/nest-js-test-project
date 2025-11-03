import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    const { recipient, subject, text, attachmentPath } = job.data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'virajdilshan2019@gmail.com',
        pass: 'gfig cvah lsic ypho',
      },
    });

    const mailOptions = {
      from: `"Testing Queue" <${process.env.MAIL_USER}>`,
      to: recipient,
      subject,
      text,
      attachments: [
        {
          filename: path.basename(attachmentPath),
          content: fs.createReadStream(attachmentPath),
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(`Sent email to ${recipient}`);

    return { status: 'done' };
  }
}
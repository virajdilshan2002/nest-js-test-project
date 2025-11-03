import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async sendEmailToAll() {
    const users = ['virajdilshan2019@gmail.com'];
    const subject = 'Important Update';
    const text = 'Please find the attached document.';
    const attachmentPath = 'src/uploads/file-1762140981001-.pdf';
    for (const recipient of users) {
      console.log(recipient);
      
      await this.emailQueue.add('sendEmail', {
        recipient,
        subject,
        text,
        attachmentPath,
      });
    }
    return { message: `Queued ${users.length} emails successfully.` };
  }
}

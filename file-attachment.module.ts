import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailerModule } from '@nestjs-modules/mailer';
import { FileAttachmentService } from './file-attachment.service';
import { FilesController } from './file-attachment.controller';
import { diskStorage } from 'multer';
import path from 'path';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [FilesController],
  providers: [FileAttachmentService],
})
export class FilleAttachmentModule {}


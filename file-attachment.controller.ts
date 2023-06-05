import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    callback(null, fileName);
  },
});

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{ storage }))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    // File upload successful, now send email with attachment
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'gnituda05@gmail.com',
        pass: '(yourpassword)',
      },
  });

  const mailOptions = {
    from: 'Corp@gmail.com',
    to: 'gnituda05@gmail.com',
    subject: 'File Attachment Example',
    text: 'Please find the attached file.',
    attachments: [
      {
        filename: file.originalname,
        path: file.path,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  return { message: 'File uploaded and email sent successfully' };
}
} 
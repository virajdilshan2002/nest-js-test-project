import { Controller, Get, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from 'src/decorator/public.decorator';

@Controller('invoice')
export class InvoiceController {

  @Public()
  @Get('file')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'src/uploads/invoice.pdf'));
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: 'attachment; filename="invoice.pdf"',
    });
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-';
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Saved file info:', file);
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
      path: file.path,
    };
  }
}

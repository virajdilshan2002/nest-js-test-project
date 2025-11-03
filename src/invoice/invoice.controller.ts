import { Controller, Get, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from 'src/decorator/public.decorator';
import { InvoiceService } from './invoice.service';
import { Invoice } from 'src/entities/invoice.entity';

@Controller('invoice')
export class InvoiceController {

  constructor(private invoiceService: InvoiceService) {}

  @Public()
  @Get('file/:id')
  async getFile(@Param('id') id: number): Promise<StreamableFile | string> {
    let invoice: Invoice;
    try {
      invoice = await this.invoiceService.getInvoicePath(id);
    } catch (error) {
      return "Invoice not found";
    }

    const file = createReadStream(join(process.cwd(), invoice.path));
    return new StreamableFile(file, {
      type: invoice.type,
      disposition: 'attachment; filename="invoice.pdf"',
    });
  }

  @Public()
  @Get('all')
  async getAllInvoices(): Promise<Invoice[] | any> {
    try {
      return this.invoiceService.getAllInvoices();
    } catch (error) {
      return { message: 'Could not retrieve invoices', error: error.message };
    }
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.invoiceService.createInvoice(file);
    console.log('Saved file info:', file);
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
      path: file.path,
    };
  }
}

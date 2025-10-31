import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
// import { InvoiceService } from './invoice.service';

@Module({
  controllers: [InvoiceController],
  providers: []
})
export class InvoiceModule {}

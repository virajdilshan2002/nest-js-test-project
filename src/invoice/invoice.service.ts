import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {

    constructor(
        @InjectRepository(Invoice)
        private invoiceRepository: Repository<Invoice>,
    ) {}

    async createInvoice(file: Express.Multer.File): Promise<Invoice> {
        const invoice = new Invoice();
        invoice.path = file.path;
        invoice.filename = file.filename;
        invoice.type = file.mimetype;
        return this.invoiceRepository.save(invoice);
    }

    async getInvoicePath(id: number): Promise<Invoice> {
        const invoice = await this.invoiceRepository.findOneBy({ id });
        if (!invoice) {
            throw new Error('Invoice not found');
        }
        return invoice;
    }

    async getAllInvoices(): Promise<Invoice[]> {
        return this.invoiceRepository.find();
    }
}

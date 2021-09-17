import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto, BookByUuid, UpdateBookDto } from './book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) { }

    async create(CreateBookDto: CreateBookDto): Promise<Book> {
        const createdBook = new this.BookModel(CreateBookDto);
        return createdBook.save();
    }

    async findAll(): Promise<Book[]> {
        return this.BookModel.find().exec();
    }

    async find(bookByUuid: BookByUuid): Promise<Book[]> {
        return this.BookModel.find(bookByUuid).exec();
    }

    async delete(bookByUuid: BookByUuid): Promise<any> {
        return this.BookModel.deleteOne(bookByUuid).exec();
    }

    async update(bookByUuid: BookByUuid, updateBookDto: UpdateBookDto): Promise<any> {
        let dataToUpdate: { name?: string, releaseDate?: Date, authorname?: string } = {};
        if (updateBookDto.name) dataToUpdate.name = updateBookDto.name;
        if (updateBookDto.releaseDate) dataToUpdate.releaseDate = updateBookDto.releaseDate;
        if (updateBookDto.authorname) dataToUpdate.authorname = updateBookDto.authorname;
        return this.BookModel.updateOne({ uuid: bookByUuid.uuid }, dataToUpdate).exec();
    }
}

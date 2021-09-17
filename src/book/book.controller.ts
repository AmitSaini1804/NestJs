import { Body, Controller, Get, Post, Param, HttpCode } from '@nestjs/common';
import { CreateBookDto, BookByUuid, UpdateBookDto } from './book.dto';
// import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { Book } from './book.schema';
import { BookService } from './book.service';

@Controller('')
export class BookController {

    constructor(private readonly bookService: BookService) { }

    @Post('/book/add')
    async create(@Body() body: CreateBookDto): Promise<Book> {
        try {
            let result = await this.bookService.create(body);
            return result;
        } catch (error) {
            return new Promise(resolve => resolve({ message: error.message, ...error }));
        }
    }

    @Get('books')
    async fetch(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Get(':uuid/book')
    async fetchByUuid(@Param() param: BookByUuid): Promise<Book[]> {
        return this.bookService.find(param);
    }

    @Post('/book/:uuid/delete')
    async delete(@Param() param: BookByUuid): Promise<any> {
        return this.bookService.delete(param);
    }

    @Post('/book/:uuid/update')
    async update(@Param() param: BookByUuid, @Body() body: UpdateBookDto): Promise<any> {
        return this.bookService.update(param, body);
    }
}

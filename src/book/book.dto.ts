import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';


export class CreateBookDto {
    @IsNotEmpty()
    uuid: string;

    @IsNotEmpty()
    name: number;

    @IsNotEmpty()
    releaseDate: Date;

    @ApiProperty()
    authorname: string;

}

export class BookByUuid {
    @IsNotEmpty()
    uuid: string;

}

export class UpdateBookDto {
    @Optional()
    name: string;

    @Optional()
    releaseDate: Date;

    @Optional()
    authorname: string;

}
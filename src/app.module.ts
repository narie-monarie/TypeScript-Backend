import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}

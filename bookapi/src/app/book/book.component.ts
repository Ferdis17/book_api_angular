import {Component, OnInit} from '@angular/core';
import {Book} from './book';
import { BookService } from './book.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{

    books: Book[];
    book = new Book();
    constructor(private bookService: BookService){}

    ngOnInit(): void{
        this.getBooks();
    }

    getBooks(): void{
        this.bookService.getAllBooks().subscribe((bookData) => {
            this.books = bookData, console.log(bookData)
        }, (error) => {
            console.log(error);
        });
    }
    addBook(): void {
        this.bookService.addBook(this.book)
        .subscribe((response) => {console.log(response)}, (error) => {
            console.log(error);
        });
    }

    deleteBook(bookId: string){
        this.bookService.deleteBook(bookId)
        .subscribe((x) =>{console.log(x); this.getBooks();},
        (error) =>{console.log(error)});
    }
}
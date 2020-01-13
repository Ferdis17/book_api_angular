import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Injectable } from '@angular/core';
import {Book} from './book';
import { map, catchError } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable()
export class BookService{

    constructor(private httpService: Http){}

        getAllBooks(): Observable<Book[]>{
            return this.httpService.get("http://localhost:8080/api/book")
            .pipe(map((response: Response) => response.json()))
            .pipe(catchError(this.handleErros));
        }

        addBook(book: Book){
            let body =  JSON.stringify(book);
            let headers = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: headers});
           return this.httpService.post("http://localhost:8080/api/book", body, options)

        }

        deleteBook(bookId: string){
           return this.httpService.delete("http://localhost:8080/api/book/"+bookId)
    
        }


        private handleErros(error: Response){
            return Observable.throw(error);
        }
}
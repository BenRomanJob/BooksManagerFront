import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { Book } from '../app-components/book';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // public BooksList: Book[];
  public BookList: BehaviorSubject<Book[]> = new BehaviorSubject([]);

  loaded: boolean = false;

  constructor(private _http: HttpClient) { }

  init() { 
    this.getBooks();
    setInterval(() => {
      this.updateBooks();
    }, 60000);

  }

  getBooks() {
    this._http.get<Book[]>(environment.url).subscribe((data: Book[]) => {
      this.BookList.next(data);
    });
  }

  deleteBook(id: number) {
    var updated = this.BookList.getValue();
    updated.find(book => book.id == id).isActive = false;
    this.BookList.next(updated);
  }


  updateBooks() {
    const headers = new HttpHeaders({"Content-Type": "application/json" });

    var books = this.BookList.getValue();
    this._http.post<Book[]>(environment.url + "/Update", books , {headers}).subscribe(
      (data: Book[]) => {
        this.BookList.next(data);
        this.loaded = true;
        setTimeout(() => {
          this.loaded = false;
        }, 3000);
      },
      err=> console.error(err)
    );

  }
  
}

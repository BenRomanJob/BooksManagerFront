import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { DataService } from '../../services/data.service';
import { Book } from '../book'
import { BookType } from '../book/book';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {

  public listOfBooks: Book[];
  public dataSubscr: Subscription;
  public openAddNewBlock: boolean = false;

  public newBook: Book = new Book();

  public keys = Object.keys(BookType).map(key => BookType[key]).filter(value => typeof value === 'string') as string[];


  constructor(public dataService: DataService) { }
 
  ngOnInit(): void {
    this.dataService.BookList.subscribe(data => this.listOfBooks = data.filter(el => el.isActive));
  }

  ngOnDestroy(): void {
    this.dataSubscr.unsubscribe();
  }

  addBook(form: NgForm){
    if(!form.valid){
      return
    }
    var vals = form.value;
    this.newBook.isActive = true;
    this.newBook.name = vals.name;
    this.newBook.pages = vals.pages;
    this.newBook.price = vals.price;
    this.newBook.type = this.keys.indexOf(vals.type);
    
    form.resetForm();
    this.openAddNewBlock = false;
    
    this.listOfBooks.push(this.newBook);
    this.newBook = new Book();
    this.dataService.BookList.next(this.listOfBooks);
  }


}

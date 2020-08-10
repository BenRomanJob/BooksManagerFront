import { Component, OnInit, Input } from '@angular/core';

import { Book, BookType } from './book';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private _dataSer: DataService) { 
  }

  ngOnInit(): void {
  }

  @Input() thisBook: Book;

  getStringBookType(){
    return BookType[this.thisBook.type];
  }

  delete(){
    this._dataSer.deleteBook(this.thisBook.id);
  }
}

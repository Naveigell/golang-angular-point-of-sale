import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    @Output() public categoryAdded = new EventEmitter();
    @Output() public modalClosed = new EventEmitter();

    public category: string;

    constructor() { }

    ngOnInit() {}

}

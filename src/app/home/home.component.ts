import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formdataCreate:FormGroup;
  formdataSearch:FormGroup;
  constructor() { }

  ngOnInit() {
    this.formdataCreate = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      phoneNumber: new FormControl("", Validators.required)
   });

    this.formdataSearch = new FormGroup({
      searchInput: new FormControl("", Validators.required)
    });
  }

  onClickSubmit(data){
    console.log('onClickSubmit', data);
  }

  onClickSearch(data){
    console.log('onClickSearch', data);
  }

}

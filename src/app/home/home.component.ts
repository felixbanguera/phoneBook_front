import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../contact.interface'
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formdataCreate:FormGroup;
  formdataSearch:FormGroup;
  contacts:Array<Contact> = [];

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
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
    this.formdataCreate.reset();
    this.contactService.addContact(data);
    this.contacts = this.contactService.getContacts();
  }

  onClickSearch(data){
    console.log('onClickSearch', data);
  }

}

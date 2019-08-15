import { Injectable } from '@angular/core';
import { Contact } from './contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts:Array<Contact>=[
    { firstName: 'John',
      lastName: 'Doe',
      phoneNumber: 1234567
    },
    { firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: 9876543
    }
  ];
  constructor() { }

  addContact(contact:Contact){
    this.contacts.push(contact);
  }

  getContacts():Array<Contact>{
    return this.contacts;
  }

  // searchContactInDB(param):Contact{
  //   return null;
  // }

}

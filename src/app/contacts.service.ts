import { Injectable } from '@angular/core';
import { Contact } from './contact.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private url:string = "http://localhost:9090/api"
  contacts:any=[];
  constructor(private http: HttpClient) {
    this.refreshFromDB().subscribe(data => {
      console.log("Contacts after refresh", data);
      this.contacts = data;
    });
  }

  addContact(contact:Contact){
    // this.contacts.push(contact);
    return this.http.post(this.url+"/contact",contact);
  }

  getContacts(){
    this.refreshFromDB().subscribe(data => {
      console.log("Contacts after refresh", data);
      this.contacts = data;
      return this.contacts;
    });
  }

  refreshFromDB(){
    return this.http.get(this.url+"/contacts")
  }

  // searchContactInDB(param):Contact{
  //   return null;
  // }

}

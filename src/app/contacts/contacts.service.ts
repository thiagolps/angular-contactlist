import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactsService {

  url = "https://nodejs-todolist-api.herokuapp.com/contacts/tlps";

  constructor(private http: Http) { }

  //GET
  getContacts() {
    return this.http.get(this.url)
      .map(response => response.json());
  }


  //POST
  saveContact(contact){
    //Set header to send content-type application/json
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify(contact), options)
      .map(res => res.json());
  }

  //PUT
  updateContact(contact){
    //Set header to send content-type application/json
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(this.getContactUrl(contact._id), JSON.stringify(contact), options)
      .map(res => res.json());
  }

  //DELETE
  deleteContact(contact){
    return this.http.delete(this.getContactUrl(contact._id))
      .map(res => res.json());
  }

  getContactUrl(id) {
    return `${this.url}/${id}`;
  }

}

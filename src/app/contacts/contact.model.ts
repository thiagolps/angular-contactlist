import { Optional } from '@angular/core';

export class Contact {
  _id?: string;
  name: string;
  phone: string;

  constructor(name,phone,@Optional() _id) {
    this.name = name;
    this.phone = phone;
    this._id = _id;
  }
}
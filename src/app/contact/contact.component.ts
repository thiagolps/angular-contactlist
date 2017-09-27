import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Contact} from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
  }
  
  @Input() contact : Contact;
  @Output() onRemoveContact = new EventEmitter();
  @Output() onShowEditContact = new EventEmitter();

  removeContact() {
    this.onRemoveContact.emit();
  }

  editContact() {
    this.onShowEditContact.emit();
  }


}

import { Component, OnInit } from '@angular/core';

import { Contact } from './contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private contactsService :ContactsService) { }

  loading = false;
  
  ngOnInit() {
    this.loading = true;
    this.contactsService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.loading = false;
    });
  }

  contacts: Contact[];

  showCreate = false;

  showEdit = false;

  name = "";
  phone = "";
  _id = "";

  createContact(name,phone,_id) {
    let c:Contact = new Contact(name,phone,_id);
    this.showCreate = false;
    this.showEdit = false;

    this.contactsService.saveContact(c).subscribe(contact => {
      this.contacts.push(contact);
      // this.showGreenNotification("Contact created!");
    }, err => {
      console.log("Erro criando Contact");
      // this.showRedNotification("Error creating the Contact");
    });
  }


  showNewContactForm() {
    this.showEdit = false;
    this.showCreate = !this.showCreate;
  }

  showEditContactForm(contact) {
    this.showEdit = true;
    this.showCreate = false;

    this.name = contact.name;
    this.phone = contact.phone;
    this._id = contact._id;
  }

  closeEditContactForm(){
    this.showEdit = false;
  }

  removeContact(contact) {
    if (confirm("Are you sure?")) {
      let index = this.contacts.findIndex(c => {
        return (c._id === contact._id);
      });
      this.contacts.splice(index, 1);

      //Remove contact from backend
      this.contactsService.deleteContact(contact)
        .subscribe(success => {
            // this.showGreenNotification("Task deleted!");
            console.log("Contato apagado");
          }, err => {
            // this.showRedNotification("Error deleting the Task");
            console.log("Erro ao apagar contato");
            // Revert the view back to its original state
            this.contacts.splice(index, 0, contact);
          });
    }
  }

  editContact(name,phone,_id) {

    let contact:Contact = new Contact(name,phone,_id);
    console.log("INICIO DEBUG");
    console.log(contact)
    console.log("FIM DEBUG");    
    this.showCreate = false;
    this.showEdit = !this.showEdit;
    this.loading = true;
    this.contactsService.updateContact(contact).subscribe(contact => {
      //this.contacts.push(contact);

          this.contactsService.getContacts().subscribe(contacts => {
            this.contacts = contacts;
           });
      this.loading = false;

      console.log("Contato atualizado");
      console.log(contact);
      // this.showGreenNotification("Contact created!");
    }, err => {
      console.log("Erro criando Contact");
      console.log(contact);
      // this.showRedNotification("Error creating the Contact");
    });
 
  }

}

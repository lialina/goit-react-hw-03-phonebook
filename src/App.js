import React, { Component } from "react";
import shortid from "shortid";
import "./App.css";
import Container from "components/Container/Container";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "components/ContactList/ContactList";
import initialContacts from "contacts.json";

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: "",
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.checkisContactAlreadyPresent(contact);
  };

  checkisContactAlreadyPresent = (contact) => {
    if (
      this.state.contacts.find(
        (presentContact) => presentContact.name === contact.name
      )
    ) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

export default App;

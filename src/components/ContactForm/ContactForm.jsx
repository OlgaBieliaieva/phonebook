import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { addContact, updateContact } from 'redux/operations';
import { selectContacts } from 'redux/contacts/selectors';

import css from './ContactForm.module.css';

export default function ContactForm({ onClose, contact = {}, userGroups, userTags }) {
  const [firstName, setFirstName] = useState(
    contact.id ? contact.firstName : ''
  );
  const [middleName, setMiddleName] = useState(() =>
    contact.id ? contact.middleName : ''
  );
  const [lastName, setLastName] = useState(contact.id ? contact.lastName : '');
  const [jobTitle, setJobTitle] = useState(contact.id ? contact.jobTitle : '');
  const [company, setCompany] = useState(contact.id ? contact.company : '');
  const [phone, setPhone] = useState(contact.id ? contact.phone : '');
  const [email, setEmail] = useState(contact.id ? contact.email : '');
  const [birthday, setBirthday] = useState(contact.id ? contact.birthday : '');
  const [note, setNote] = useState(contact.id ? contact.note : '');
  const [groups, setGroups] = useState(contact.id ? [...contact.groups] : []);
  const [tags, setTags] = useState(contact.id ? [...contact.tags] : [])

  const { user } = useAuth();
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;

      case 'middleName':
        setMiddleName(value);
        break;

      case 'lastName':
        setLastName(value);
        break;

      case 'jobTitle':
        setJobTitle(value);
        break;

      case 'company':
        setCompany(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      case 'email':
        setEmail(value);
        break;

      case 'birthday':
        setBirthday(value);
        break;

      case 'note':
        setNote(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault(e);
    contact.id ? changeContact() : createContact();
    reset();
    onClose();
  };

  const changeContact = () => {
    const updatedContact = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      jobTitle: jobTitle,
      company: company,
      phone: phone,
      email: email,
      birthday: birthday,
      createdAt: contact.createdAt,
      groups: contact.groups,
      tags: contact.tags,
      note: contact.note,
      owner: contact.owner,
      avatar: contact.avatar,
      id: contact.id,
    };

    dispatch(updateContact({ ...updatedContact }));
  };

  const createContact = () => {
    const newContact = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      jobTitle: jobTitle,
      company: company,
      phone: phone,
      email: email,
      birthday: birthday,
      createdAt: Date.now(),
      groups: [],
      tags: [],
      note: '',
      owner: user.id,
    };
    const isExist = contacts.find(
      contact =>
        contact.phone.trim().toLowerCase() === phone.trim().toLowerCase()
    );

    if (isExist) {
      alert(`${phone} is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));
  };

  const reset = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setJobTitle('');
    setCompany('');
    setPhone('');
    setEmail('');
    setBirthday('');
  };

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <h3>{contact.id ? 'Update Contact' : 'Add New Contact'} </h3>
      <label className={css.formLabel}>
        First name
        <input
          className={css.formInput}
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Middle name
        <input
          className={css.formInput}
          type="text"
          name="middleName"
          value={middleName}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Last name
        <input
          className={css.formInput}
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Job title
        <input
          className={css.formInput}
          type="text"
          name="jobTitle"
          value={jobTitle}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Company
        <input
          className={css.formInput}
          type="text"
          name="company"
          value={company}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Phone
        <input
          className={css.formInput}
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Email
        <input
          className={css.formInput}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Birthday
        <input
          className={css.formInput}
          type="text"
          name="birthday"
          value={birthday}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>
      <label className={css.formLabel}>
        Note
        <input
          className={css.formInput}
          type="text"
          name="note"
          value={note}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <label>
        <select name="groups" id="groups">
          <option value="none" disabled>groups</option>

        </select>
      </label>

      <button className={css.formBtn} type="submit">
        {contact.id ? 'Update Contact' : 'Add contact'}
      </button>
    </form>
  );
}

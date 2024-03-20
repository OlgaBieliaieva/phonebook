import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import css from './ContactForm.module.css';

export default function ContactForm({ onClose }) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

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

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault(e);
    createContact();
    reset();
    onClose();
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
      note: [],
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
      <h3>Add New Contact </h3>
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
          type="date"
          name="birthday"
          value={birthday}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>
      <button className={css.formBtn} type="submit">
        Add contact
      </button>
    </form>
  );
}

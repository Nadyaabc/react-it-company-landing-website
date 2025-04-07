import React, { useState, Suspense } from "react";
import styles from '../styles/app-order.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';

import LoadingSpinner from "../components/LoadingSpinner";
const AppOrder = () => {
  const { t, ready } = useTranslation('AppOrder');
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  const handleBudgetClick = (index) => {
    setSelectedBudget(index);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (e) => {
    const value = e.target.value.replace(/[^A-Za-zА-Яа-яЁё]/g, '');
    setName(value.substring(0, 50));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = t('contacts.errors.name');
    if (!phone.trim() || !validatePhone(phone))
      newErrors.phone = t('contacts.errors.phone');
    if (!comment.trim()) newErrors.comment = t('contacts.errors.comment');
    if (selectedBudget === null) newErrors.budget = t('budget.error');

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert(t('success'));
      setName('');
      setPhone('');
      setComment('');
      setSelectedBudget(null);
      setErrors({});
    }
  };

  if (!ready) return <LoadingSpinner />;
  return (
    <div className={styles.container}>
     <Header/>
      <main>
        <div className={styles.mainContainer}>
        <h1>{t('title')}</h1>
          <div className={styles.mainContent}>
            <section className={styles.budget}>
            <h2>{t('budget.title')}</h2>
              <div className={styles.budgetGrid} id="budgetGrid">
                {[680, 1700, 3400, 17000, 34000, 68000].map((amount, index) => (
                  <div
                    key={index}
                    className={`${styles.box} ${selectedBudget === index ? styles.selected : ''}`}
                    onClick={() => handleBudgetClick(index)}
                  >
                    <p>{amount} - {amount * 2} BYN</p>
                  </div>
                ))}
              </div>
              {errors.budget && <p className={styles.error}>{errors.budget}</p>}
            </section>
            <section className={styles.contactData}>
            <h2>{t('contacts.title')}</h2>
              <form id="orderForm" className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="name"
                    placeholder={t('contacts.name')}
                    value={name}
                    onChange={validateName}
                    required
                  />
                  {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>
                <div className={styles.formGroup}>
                  <InputMask
                    mask="+375(99)999-99-99"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        id="userPhone"
                        type="text"
                        placeholder="+375 (00) 000-00-00"
                        className={styles.input}
                      />
                    )}
                  </InputMask>
                  {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    id="comment"
                    placeholder={t('contacts.comment')}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  {errors.comment && <p className={styles.error}>{errors.comment}</p>}
                </div>
                <button type="submit">{t('submit')}</button>
              </form>
            </section>
          </div>
        </div>
      </main>

    <Footer/>
    </div>
  );
};
export default function WrappedAppOrder() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppOrder />
    </Suspense>
  );
}

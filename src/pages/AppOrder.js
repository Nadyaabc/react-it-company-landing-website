import React, { useState } from 'react';
import styles from '../styles/app-order.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppOrder = () => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  const handleBudgetClick = (index) => {
    setSelectedBudget(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Введите имя';
    if (!phone.trim() || phone.replace(/\s/g, "").replace(/_/g, "").length !== 17) newErrors.phone = 'Введите корректный номер';
    if (!comment.trim()) newErrors.comment = 'Введите комментарий';
    if (selectedBudget === null) newErrors.budget = 'Выберите бюджет';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert('Форма успешно отправлена!');
      setName('');
      setPhone('');
      setComment('');
      setSelectedBudget(null);
      setErrors({});
    }
  };

  return (
    <div className={styles.container}>
     <Header/>
      <main>
        <div className={styles.mainContainer}>
          <h1>Заказать приложение</h1>
          <div className={styles.mainContent}>
            <section className={styles.budget}>
              <h2>Бюджет проекта:</h2>
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
              <h2>Контакты:</h2>
              <form id="orderForm" className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="name"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {errors.name && <p className={styles.error}>{errors.name}</p>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="phone"
                    id="userPhone"
                    placeholder="+375 (00) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    id="comment"
                    placeholder="Комментарий"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  {errors.comment && <p className={styles.error}>{errors.comment}</p>}
                </div>
                <button type="submit">Заказать обратный звонок</button>
              </form>
            </section>
          </div>
        </div>
      </main>
      
    <Footer/>
    </div>
  );
};

export default AppOrder;
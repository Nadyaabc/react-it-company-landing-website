import React from 'react';
import styles from '../styles/pricing.module.css';
import pricingIcon1 from '../assets/images/svg/pricing-icon1.svg';
import pricingIcon2 from '../assets/images/svg/pricing-icon2.svg';
import pricingIcon3 from '../assets/images/svg/pricing-icon3.svg';
import blueTick from '../assets/images/png/blue-tick.png';
import darkBlueTick from '../assets/images/png/dark-blue-tick.png';
import redTick from '../assets/images/png/red-tick.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Pricing = () => {
  const pricingData = [
    {
      id: 1,
      icon: pricingIcon1,
      title: 'Типовой',
      price: '34 000 BYN',
      features: [
        { text: 'Каталог товаров или услуг', icon: blueTick },
        { text: 'Сделать заказ', icon: blueTick },
        { text: 'Новости и акции', icon: blueTick },
        { text: 'Обратная связь', icon: blueTick },
        { text: 'Контакты', icon: blueTick },
      ],
      link: '../pages/app-order.html',
    },
    {
      id: 2,
      icon: pricingIcon2,
      title: 'Бизнес',
      price: '68 000 BYN',
      features: [
        { text: 'Программа лояльности', icon: darkBlueTick },
        { text: 'Push уведомления', icon: darkBlueTick },
        { text: 'Серверная часть', icon: darkBlueTick },
        { text: 'Панель управления', icon: darkBlueTick },
        { text: 'Чаты', icon: darkBlueTick },
      ],
      link: '../pages/app-order.html',
    },
    {
      id: 3,
      icon: pricingIcon3,
      title: 'Кастом',
      price: '102 000 BYN',
      features: [
        { text: 'Автоматизация бизнес-процессов', icon: redTick },
        { text: 'Сложные интеграции', icon: redTick },
        { text: 'Маркетплейс', icon: redTick },
        { text: 'Корпоративные решения', icon: redTick },
        { text: 'Smart TV, Kit, VR \\ AR', icon: redTick },
      ],
      link: '../pages/app-order.html',
    },
  ];

  return (
    <div className={styles.container}>
     <Header/>
      <main>
        <div className={styles.mainContainer}>
          <h1>Стоимость разработки мобильных приложений</h1>
          <h3>
            Мы собрали стандартные элементы приложений в пакеты, для примерного
            понимания стоимости разработки. <br />Чтобы заказать мобильное
            приложение свяжитесь с нами, мы вас проконсультируем, проведем аудит
            <br />
            ценовых предложений других студий. Ниже цены на типовые приложения.
          </h3>
          <div className={styles.mainContent}>
            <section className={styles.pricingGrid}>
              {pricingData.map((card) => (
                <div key={card.id} className={styles.pricingCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.heading}>
                      <img src={card.icon} alt="icon" />
                      <h2>{card.title}</h2>
                    </div>
                    <ul>
                      {card.features.map((feature, index) => (
                        <li key={index}>
                          {feature.text}
                          <img src={feature.icon} alt="tick" />
                        </li>
                      ))}
                    </ul>
                    <h2 className={styles.cost}>{card.price}</h2>
                    <a className={styles.order} href={card.link}>
                      <p className={styles.orderText}>Заказать приложение</p>
                    </a>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Pricing;
import React, { Suspense } from "react";
import styles from "../styles/pricing.module.css";
import pricingIcon1 from "../assets/images/svg/pricing-icon1.svg";
import pricingIcon2 from "../assets/images/svg/pricing-icon2.svg";
import pricingIcon3 from "../assets/images/svg/pricing-icon3.svg";
import blueTick from "../assets/images/png/blue-tick.png";
import darkBlueTick from "../assets/images/png/dark-blue-tick.png";
import redTick from "../assets/images/png/red-tick.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Pricing = () => {
  const { t, ready } = useTranslation("Pricing");
  const pricingData = t("plans", { returnObjects: true });
  const pricingDataIcons = [pricingIcon1, pricingIcon2, pricingIcon3];
  const pricingDataTicks=[blueTick, darkBlueTick,redTick];
  /*const pricingData = [
    {
      id: 1,
      icon: pricingIcon1,
      title: {t('plans.0.title')},
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
  ];*/

  if (!ready) return <LoadingSpinner />;
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <div className={styles.mainContainer}>
          <h1>{t("title")}</h1>
          <h3>{t("subtitle")}</h3>
          <div className={styles.mainContent}>
            <section className={styles.pricingGrid}>
              {pricingData.map((plans) => (
                <div key={plans.id} className={styles.pricingCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.heading}>
                      {/*<img src={card.icon} alt="icon" />*/}
                      <img src={pricingDataIcons[plans.id]} alt="icon" />
                      <h2>{plans.title}</h2>
                    </div>
                    <ul>
                      {plans.features.map((feature, index) => (
                        <li key={index}>
                          {feature}
                          <img src={pricingDataTicks[plans.id]} alt="tick" />
                        </li>
                      ))}
                    </ul>
                    <h2 className={styles.cost}>{plans.price}</h2>
                    <Link to="/app-order" className={styles.order}>
                      <p className={styles.orderText}>{t("button")}</p>
                    </Link>
                    
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function WrappedPricing(){
  return(
    <Suspense fallback={<LoadingSpinner/>}>
      <Pricing/>
    </Suspense>
  )
};

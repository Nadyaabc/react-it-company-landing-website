import React, { Suspense, useState } from "react";
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
  

  const allFeatures = [
    { id: 1, name: "Каталог товаров или услуг", price: 13000 },
    { id: 2, name: "Сделать заказ", price: 9500 },
    { id: 3, name: "Новости и акции", price: 5000 },
    { id: 4, name: "Обратная связь", price: 3100 },
    { id: 5, name: "Контакты", price: 4000 },
    { id: 6, name: "Программа лояльности", price: 21500 },
    { id: 7, name: "Push уведомления", price: 14200 },
    { id: 8, name: "Серверная часть", price: 18000 },
    { id: 9, name: "Панель управления", price: 12000 },
    { id: 10, name: "Чаты", price: 8600 },
    { id: 11, name: "Автоматизация бизнес-процессов", price: 27000 },
    { id: 12, name: "Сложные интеграции", price: 32000 },
    { id: 13, name: "Маркетплейс", price: 17300 },
    { id: 14, name: "Корпоративные решения", price: 23000 },
    { id: 15, name: "Smart TV, Kit, VR \\ AR", price: 12000 },
  ];

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCustomPlan, setShowCustomPlan] = useState(false);

  const handleFeatureToggle = (feature) => {
    const isSelected = selectedFeatures.some((f) => f.id === feature.id);
    if (isSelected) {
      setSelectedFeatures(selectedFeatures.filter((f) => f.id !== feature.id));
      setTotalPrice(totalPrice - feature.price);
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
      setTotalPrice(totalPrice + feature.price);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " BYN";
  };

  const handleOrder = (event) => {
    alert("Ваш заказ успешно отправлен на рассмотрение.");
    setSelectedFeatures([]);
    setTotalPrice(0);
  };

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
                    <h2 className={styles.cost}>{formatPrice(card.price)}</h2>
                    <a className={styles.order} href={card.link}>
                      <p className={styles.orderText}>Заказать приложение</p>
                    </a>
                  </div>
                </div>
              ))}
            </section>

            <div className={styles.customPlanToggle}>
              <button
                onClick={() => setShowCustomPlan(!showCustomPlan)}
                className={styles.toggleButton}
              >
                {showCustomPlan ? "Скрыть конструктор" : "Создать свой план"}
              </button>
            </div>

            {showCustomPlan && (
              <section className={styles.customPlanSection}>
                <h2>Создайте свой индивидуальный план</h2>
                <p>Выберите нужные функции для вашего приложения:</p>

                <div className={styles.customPlanGrid}>
                  <div className={styles.featuresList}>
                    {allFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className={`${styles.featureItem} ${
                          selectedFeatures.some((f) => f.id === feature.id)
                            ? styles.selected
                            : ""
                        }`}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedFeatures.some(
                              (f) => f.id === feature.id
                            )}
                            onChange={() => handleFeatureToggle(feature)}
                          />
                          <span>{feature.name}</span>
                          <span className={styles.featurePrice}>
                            +{formatPrice(feature.price)}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className={styles.customPlanSummary}>
                    <h3>Ваш индивидуальный план</h3>
                    {selectedFeatures.length > 0 ? (
                      <>
                        <ul>
                          {selectedFeatures.map((feature) => (
                            <li key={feature.id}>
                              {feature.name}
                              <span className="spanPrice">{formatPrice(feature.price)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className={styles.totalPrice}>
                          <h3>Итого:</h3>
                          <h3>{formatPrice(totalPrice)}</h3>
                        </div>
                        <a className={styles.orderPrice} onClick={handleOrder}>
                          <p className={styles.orderPriceText}>Оформить заказ</p>
                        </a>
                      </>
                    ) : (
                      <p>Выберите функции для вашего приложения</p>
                    )}
                  </div>
                </div>
              </section>
            )}
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

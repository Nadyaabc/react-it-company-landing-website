import React, { useState } from "react";
import styles from "../styles/pricing.module.css";
import pricingIcon1 from "../assets/images/svg/pricing-icon1.svg";
import pricingIcon2 from "../assets/images/svg/pricing-icon2.svg";
import pricingIcon3 from "../assets/images/svg/pricing-icon3.svg";
import blueTick from "../assets/images/png/blue-tick.png";
import darkBlueTick from "../assets/images/png/dark-blue-tick.png";
import redTick from "../assets/images/png/red-tick.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Pricing = () => {
  const pricingData = [
    {
      id: 1,
      icon: pricingIcon1,
      title: "Типовой",
      price: 34000,
      features: [
        { text: "Каталог товаров или услуг", icon: blueTick },
        { text: "Сделать заказ", icon: blueTick },
        { text: "Новости и акции", icon: blueTick },
        { text: "Обратная связь", icon: blueTick },
        { text: "Контакты", icon: blueTick },
      ],
      link: "../pages/app-order.html",
    },
    {
      id: 2,
      icon: pricingIcon2,
      title: "Бизнес",
      price: 68000,
      features: [
        { text: "Программа лояльности", icon: darkBlueTick },
        { text: "Push уведомления", icon: darkBlueTick },
        { text: "Серверная часть", icon: darkBlueTick },
        { text: "Панель управления", icon: darkBlueTick },
        { text: "Чаты", icon: darkBlueTick },
      ],
      link: "../pages/app-order.html",
    },
    {
      id: 3,
      icon: pricingIcon3,
      title: "Кастом",
      price: 102000,
      features: [
        { text: "Автоматизация бизнес-процессов", icon: redTick },
        { text: "Сложные интеграции", icon: redTick },
        { text: "Маркетплейс", icon: redTick },
        { text: "Корпоративные решения", icon: redTick },
        { text: "Smart TV, Kit, VR \\ AR", icon: redTick },
      ],
      link: "../pages/app-order.html",
    },
  ];

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

  return (
    <div className={styles.container}>
      <Header />
      <main>
        <div className={styles.mainContainer}>
          <h1>Стоимость разработки мобильных приложений</h1>
          <h3>
            Мы собрали стандартные элементы приложений в пакеты, для примерного
            понимания стоимости разработки. <br />
            Чтобы заказать мобильное приложение свяжитесь с нами, мы вас
            проконсультируем, проведем аудит
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

export default Pricing;

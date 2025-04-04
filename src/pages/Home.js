import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import carousel from "../styles/index-second.module.css";
import styles from "../styles/index.module.css"; // Импорт стилей

// Импорт изображений
import rocketIcon from "../assets/images/svg/rocket.svg";
import mobilePhoneImage from "../assets/images/svg/second-phone.svg";
import cupIcon from "../assets/images/svg/cup.svg";
import mainPhone from "../assets/images/svg/main-phone.svg";
import serviceIcon1 from "../assets/images/svg/service-icon1.svg";
import serviceIcon2 from "../assets/images/svg/service-icon2.svg";
import serviceIcon3 from "../assets/images/svg/service-icon3.svg";

const Main = () => {
  const [index, setIndex] = useState(0); // Текущий индекс слайда
  const [cardWidth, setCardWidth] = useState(410); // Ширина карточки
  const [visibleSlides, setVisibleSlides] = useState(3); // Количество видимых слайдов
  const carouselRef = useRef(null); // Ссылка на карусель

  const services = [
    {
      icon: serviceIcon1,
      title: "Разработка мобильных приложений",
      details: ["iOS", "Android"],
    },
    {
      icon: serviceIcon2,
      title: "Web разработка",
      details: ["Frontend", "Backend"],
    },
    {
      icon: serviceIcon3,
      title: "Консультации по бизнес-экспертизе",
      details: ["Анализ рынка", "Планирование"],
    },
    {
      icon: serviceIcon1,
      title: "Проектирование мобильного приложения",
      details: ["Дизайн", "ТЗ"],
    },
    {
      icon: serviceIcon2,
      title: "Продвижение приложений",
      details: ["ASO", "Маркетинговые стратегии"],
    },
    {
      icon: serviceIcon3,
      title: "Поддержка и обновление продуктов",
      details: ["Техническая поддержка", "Регулярные обновления"],
    },
  ];

  const totalSlides = services.length; // Общее количество слайдов
  const maxIndex = Math.max(0, totalSlides - visibleSlides); // Максимальный индекс

  // Обновление ширины карточки и количества видимых слайдов
  const updateCardWidth = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 480) {
      setCardWidth(screenWidth - 10);
      setVisibleSlides(1);
    } else if (screenWidth <= 768) {
      setCardWidth(screenWidth / 2 - 30);
      setVisibleSlides(2);
    } else if (screenWidth <= 1024) {
      setCardWidth(screenWidth / 2.5 - 30);
      setVisibleSlides(2);
    } else if (screenWidth <= 1200) {
      setCardWidth(screenWidth / 3 - 30);
      setVisibleSlides(3);
    } else {
      setCardWidth(410);
      setVisibleSlides(3);
    }
  };

  // Обновление карусели при изменении индекса
  const updateCarousel = () => {
    if (carouselRef.current) {
      const offset = -(index * (cardWidth + 30)); // 30 - это gap между карточками
      carouselRef.current.style.transform = `translateX(${offset}px)`;
    }
  };

  // Переход к следующему слайду
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  // Переход к предыдущему слайду
  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  // Автоматическая прокрутка
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer); // Очистка таймера при размонтировании
  }, [index]);

  // Обновление карусели при изменении индекса или ширины карточки
  useEffect(() => {
    updateCarousel();
  }, [index, cardWidth]);

  // Обработка изменения размера окна
  useEffect(() => {
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.introduction}>
          <div className={styles.content}>
            <div className={styles.textBox}>
              <h1 className={styles.mainTitle}>
                Разработка <br />
                мобильных <br />
                приложений <br />и сервисов
              </h1>
              <div className={styles.iconsText}>
                <div className={styles.iconDescription}>
                  <img className="icons" src={rocketIcon} alt="rocket" />
                  <p>Знаем, как решить вашу задачу оптимальным способом</p>
                </div>
                <div className={styles.iconDescription}>
                  <img className="icons" src={cupIcon} alt="cup" />
                  <p>
                    Подберем подходящее решение с учетом целей и возможностей
                  </p>
                </div>
              </div>
              <a
                href="/react-it-company-landing-website/app-order"
                className={styles.button}
              >
                Заказать приложение
              </a>
            </div>
            <div className={styles.picture}>
              <img src={mainPhone} alt="main-phone" />
            </div>
          </div>
        </div>
        <div className={styles.services}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h1>Наши услуги</h1>
              <p>
                Разработка мобильных приложений и веб-проектов для бизнеса и
                стартапов
              </p>
            </div>
            <section className={carousel.serviceGrid}>
              <div className={carousel.carouselControls}>
                <button
                  className={`${carousel.carouselButton} ${carousel.prev}`}
                  onClick={prevSlide}
                >
                  ❮
                </button>
                <div className={carousel.carouselOuter}>
                  <div className={carousel.carouselContainer}>
                    <div className={carousel.carouselWrapper}>
                      <div
                        className={carousel.carousel}
                        ref={carouselRef}
                        style={{
                          display: "flex",
                          gap: "30px",
                          transition: "transform 0.5s ease-in-out",
                        }}
                      >
                        {services.map((service, i) => (
                          <div
                            key={i}
                            className={carousel.serviceCard}
                            style={{ width: `${cardWidth}px` }}
                          >
                            <div className={styles.cardContent}>
                              <div className={styles.heading}>
                                <img src={service.icon} alt="icon" />
                                <h3 className={styles.serviceTitle}>
                                  {service.title}
                                </h3>
                              </div>
                              <div className={styles.ovalContainer}>
                                {service.details.map((detail, j) => (
                                  <span key={j} className={styles.oval}>
                                    {detail}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className={`${carousel.carouselButton} ${carousel.next}`}
                  onClick={nextSlide}
                >
                  &#10095;
                </button>
              </div>
              <div className={carousel.carouselIndicators}>
                {services.slice(0, maxIndex + 1).map((_, i) => (
                  <div
                    key={i}
                    className={`${carousel.indicator} ${
                      index === i ? carousel.indicatorActive : ""
                    }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className={styles.problemSolving}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h1>Какие задачи поможет решить запуск мобильного приложения</h1>
            </div>
            <div className={styles.grid}>
              <div className={styles.text}>
                <div className={styles.textBox}>
                  <div className={styles.pointTitle}>
                    <span className={styles.point}>1</span>
                    <h3>Повысить лояльность</h3>
                  </div>
                  <div className={styles.pointDesc}>
                    <p>
                      Мобильное приложение работает намного быстрее сайта и
                      может выполнять многие функции даже без интернета. Также
                      здесь не нужно каждый раз авторизовываться, чтобы оформить
                      заказ или отследить его статус. Все это создает
                      положительный пользовательский опыт.
                    </p>
                  </div>
                </div>
                <div className={styles.textBox}>
                  <div className={styles.pointTitle}>
                    <span className={styles.point}>2</span>
                    <h3>Автоматизировать продажи</h3>
                  </div>
                  <div className={styles.pointDesc}>
                    <p>
                      С приложением легче провести пользователя по каждому этапу
                      воронки продаж. С помощью автоматизации внутри интерфейса
                      можно показывать ценность продукта, рассказывать о новых
                      функциях, делать допродажи и напоминать о себе с помощью
                      пуш-уведомлений.
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.mobilePhone}>
                <img src={mobilePhoneImage} alt="mobile-phone" />
              </div>
              <div className={styles.text}>
                <div className={styles.textBox}>
                  <div className={styles.pointTitle}>
                    <span className={styles.point}>3</span>
                    <h3>Сократить издержки</h3>
                  </div>
                  <div className={styles.pointDesc}>
                    <p>
                      Мобильный сервис помогает сэкономить на рекламном бюджете
                      и дополнительных сотрудниках. Например, многие
                      маркетинговые акции можно проводить в самом приложении и
                      адаптировать рекламу под целевых пользователей, а часть
                      работы службы поддержки делегировать автоматическим
                      чат-ботам.
                    </p>
                  </div>
                </div>
                <div className={styles.textBox}>
                  <div className={styles.pointTitle}>
                    <span className={styles.point}>4</span>
                    <h3>Увеличить прибыль</h3>
                  </div>
                  <div className={styles.pointDesc}>
                    <p>
                      Повышение уровня клиентского сервиса, экономия на закупке
                      рекламы на других площадках и автоматизации процессов
                      положительно скажется и на итоговой выручке. Вложения в
                      разработку приложения быстро окупятся, если интерфейс
                      хорошо справляется со своими задачами.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Main;

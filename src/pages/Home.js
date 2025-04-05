import React, { useState, useEffect, useRef, Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import carousel from "../styles/index-second.module.css";
import styles from "../styles/index.module.css"; // Импорт стилей

import LoadingSpinner from "../components/LoadingSpinner";
// Импорт изображений
import rocketIcon from "../assets/images/svg/rocket.svg";
import mobilePhoneImage from "../assets/images/svg/second-phone.svg";
import cupIcon from "../assets/images/svg/cup.svg";
import mainPhone from "../assets/images/svg/main-phone.svg";
import serviceIcon1 from "../assets/images/svg/service-icon1.svg";
import serviceIcon2 from "../assets/images/svg/service-icon2.svg";
import serviceIcon3 from "../assets/images/svg/service-icon3.svg";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Main = () => {
  const [index, setIndex] = useState(0); // Текущий индекс слайда
  const [cardWidth, setCardWidth] = useState(410); // Ширина карточки
  const [visibleSlides, setVisibleSlides] = useState(3); // Количество видимых слайдов
  const carouselRef = useRef(null); // Ссылка на карусель

  const serviceIcons = [serviceIcon1, serviceIcon2, serviceIcon3];
  const { t, ready } = useTranslation("Home");
  const services = t("services.items", { returnObjects: true });
  const totalSlides = services.length;
  const maxIndex = Math.max(0, totalSlides - visibleSlides);

  /*
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
*/
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

  if (!ready) return <LoadingSpinner />;
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.introduction}>
          <div className={styles.content}>
            <div className={styles.textBox}>
              <h1
                className={styles.mainTitle}
                dangerouslySetInnerHTML={{ __html: t("hero.title") }}
              />
              <div className={styles.iconsText}>
                <div className={styles.iconDescription}>
                  <img className="icons" src={rocketIcon} alt="rocket" />
                  <p>{t("hero.points.0")}</p>
                </div>
                <div className={styles.iconDescription}>
                  <img className="icons" src={cupIcon} alt="cup" />
                  <p>{t("hero.points.1")}</p>
                </div>
              </div>
              <Link to="/app-order" className={styles.button}>
                {t("hero.button")}
              </Link>
            </div>
            <div className={styles.picture}>
              <img src={mainPhone} alt="main-phone" loading="lazy" />
            </div>
          </div>
        </div>
        <div className={styles.services}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h1>{t("services.title")}</h1>
              <p>{t("services.subtitle")}</p>
            </div>
            <section className={carousel.serviceGrid}>
              <div className={carousel.carouselOuter}>
                <button
                  className={`${carousel.carouselButton} ${carousel.prev}`}
                  onClick={prevSlide}
                  aria-label={t("aria.previousSlide")}
                >
                  ❮
                </button>
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
                              <img
                                src={serviceIcons[i % 3]}
                                alt={service.title}
                                loading="lazy"
                              />
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
                <button
                  className={`${carousel.carouselButton} ${carousel.next}`}
                  onClick={nextSlide}
                  aria-label={t("aria.nextSlide")}
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
              <h1>{t("solutions.title")}</h1>{" "}
            </div>
            <div className={styles.grid}>
              <div className={styles.text}>
                {[0, 1].map((i) => (
                  <div key={i} className={styles.textBox}>
                    <div className={styles.pointTitle}>
                      <span className={styles.point}>{i + 1}</span>
                      <h3>{t(`solutions.items.${i}.title`)}</h3>
                    </div>
                    <div className={styles.pointDesc}>
                      <p>{t(`solutions.items.${i}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.mobilePhone}>
                <img src={mobilePhoneImage} alt="mobile-phone" />
              </div>
              <div className={styles.text}>
                {[2, 3].map((i) => (
                  <div key={i} className={styles.textBox}>
                    <div className={styles.pointTitle}>
                      <span className={styles.point}>{i + 1}</span>
                      <h3>{t(`solutions.items.${i}.title`)}</h3>
                    </div>
                    <div className={styles.pointDesc}>
                      <p>{t(`solutions.items.${i}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function WrappedMain() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Main />
    </Suspense>
  );
}

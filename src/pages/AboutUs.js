import React from "react";


import officeImage from '../assets/images/jpg/office.jpg';
import meetingImage from '../assets/images/jpg/meeting.jpg';
import newYearImage from '../assets/images/jpg/new_year.jpg';
import chistmasImage from '../assets/images/jpg/chistmas.jpg';
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/about-us.module.css"; // Импорт стилей

const AboutUs = () => {
  return (

      <div className={styles.container}>
        <Header />
        <main>
          <div className={styles.title}>
            <h1>О нас</h1>
          </div>
          <p>
            Добро пожаловать в Softerio!
            <br />
            Мы — команда профессионалов, объединенных общей целью: создавать
            инновационные решения в области программного обеспечения, которые
            помогают бизнесам достигать новых высот. Наша компания была основана в
            2004 году и с тех пор зарекомендовала себя как надежный партнер для
            клиентов по всему миру.
          </p>
          <section className={styles.mainContainer}>
            <div className={styles.block}>
              <div className={styles.blockInfo}>
                <h2>Миссия</h2>
                <p>
                  Наша миссия заключается в том, чтобы предоставлять
                  высококачественные программные решения, которые соответствуют
                  уникальным потребностям наших клиентов. <br />
                  <br />
                  Мы стремимся к постоянному совершенствованию и внедрению
                  передовых технологий, чтобы обеспечить максимальную
                  эффективность и продуктивность.
                </p>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockInfo}>
                <h2>Специалисты</h2>
                <p>
                  В компании Softerio работают высококвалифицированные специалисты
                  с богатым опытом в различных областях, включая веб-разработку,
                  UX/UI дизайн и цифровой маркетинг.
                  <br />
                  <br />
                  Наша команда стремится к созданию инновационных решений, которые
                  помогают клиентам достигать их бизнес-целей и повышать
                  эффективность проектов.
                </p>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.blockInfo}>
                <h2>Ценности</h2>
                <p>
                  Клиентоориентированность:
                  <br />
                  Мы всегда ставим интересы наших клиентов на первое место.
                  <br />
                  <br />
                  Инновации: Мы верим в силу технологий и постоянно ищем новые
                  пути для их применения.
                  <br />
                  <br />
                  Качество: Мы стремимся к высокому качеству во всем, что делаем.
                </p>
              </div>
            </div>
          </section>
          <div className={styles.title}>
            <h1>Наша корпоративная жизнь</h1>
          </div>
          <div className={styles.photos}>
            <figure>
              <img src={officeImage} alt="office" title="Посмотреть поближе" />
              <figcaption>Наш офис</figcaption>
            </figure>
            <figure>
              <img src={meetingImage} alt="meeting" title="Посмотреть поближе" />
              <figcaption>Утреннее собрание</figcaption>
            </figure>
            <figure>
              <img src={newYearImage} alt="new_year" title="Посмотреть поближе" />
              <figcaption>Новый 2025 год</figcaption>
            </figure>
            <figure>
              <img
                src={chistmasImage}
                alt="chistmas"
                title="Посмотреть поближе"
              />
              <figcaption>Новогодний корпоратив</figcaption>
            </figure>
          </div>
        </main>
        <Footer />
      </div>

  );
};

export default AboutUs;
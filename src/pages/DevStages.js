import React from 'react';
import styles from '../styles/dev-stages.module.css';
import logo from '../assets/images/svg/logo.svg';
import telegramIcon from '../assets/images/svg/telegram-icon.svg';
import viberIcon from '../assets/images/svg/viber-icon.svg';
import devStage1 from '../assets/images/svg/dev-stage-1.svg';
import devStage2 from '../assets/images/svg/dev-stage-2.svg';
import devStage3 from '../assets/images/svg/dev-stage-3.svg';
import devStage4 from '../assets/images/svg/dev-stage-4.svg';
import devStage5 from '../assets/images/svg/dev-stage-5.svg';
import devStage6 from '../assets/images/svg/dev-stage-6.svg';
import devStage7 from '../assets/images/svg/dev-stage-7.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
const DevStages = () => {
  const stages = [
    {
      id: 1,
      image: devStage1,
      title: 'Сбор требований',
      description: 'Детальное изучение требований, ресурсов и исходной информации по проекту и формирование технического задания на разработку ПО.',
    },
    {
      id: 2,
      image: devStage2,
      title: 'UX/UI Дизайн',
      description: 'Разработка современного функционального и удобного дизайна с применением новейших инструментов.',
    },
    {
      id: 3,
      image: devStage3,
      title: 'Прототип (MVP)',
      description: 'В результате проектирования формируется прототип и отправляется для разработки продукта.',
    },
    {
      id: 4,
      image: devStage4,
      title: 'Разработка',
      description: 'Процесс разработки системы интеллектуального учета, мобильного приложения или веб-сайта в режиме максимальной прозрачности.',
    },
    {
      id: 5,
      image: devStage5,
      title: 'Тестирование',
      description: 'В ходе тестовых запусков обеспечиваем полную отказоустойчивость продукта.',
    },
    {
      id: 6,
      image: devStage6,
      title: 'Развертывание',
      description: 'Запуск готового продукта в работу (ИСУ, сайта, приложения).',
    },
    {
      id: 7,
      image: devStage7,
      title: 'Поддержка и обслуживание',
      description: 'Обеспечиваем полную техническую поддержку и сопровождение по всем вопросам, возникающим после развертывания.',
    },
  ];

  return (
    <div className={styles.container}>
    <Header/>
      <div className={styles.mainDev}>
        <h1>Этапы разработки</h1>
        <div className={styles.grid}>
          {stages.map((stage) => (
            <div key={stage.id} className={styles.item}>
              <img src={stage.image} alt={stage.title} />
              <div className={styles.imageTitle}>
                <div className={styles.pointTitle}>
                  <span className={styles.point}>{stage.id}</span>
                  <h3>{stage.title}</h3>
                </div>
                <div className={styles.imageDesc}>
                  <p>{stage.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.item}>
            <a href="../pages/app-order.html" className={styles.button}>Оставить заявку</a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default DevStages;
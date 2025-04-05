import React, { useState, Suspense } from "react";
import styles from '../styles/dev-stages.module.css';
import devStage1 from '../assets/images/svg/dev-stage-1.svg';
import devStage2 from '../assets/images/svg/dev-stage-2.svg';
import devStage3 from '../assets/images/svg/dev-stage-3.svg';
import devStage4 from '../assets/images/svg/dev-stage-4.svg';
import devStage5 from '../assets/images/svg/dev-stage-5.svg';
import devStage6 from '../assets/images/svg/dev-stage-6.svg';
import devStage7 from '../assets/images/svg/dev-stage-7.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from "../components/LoadingSpinner";
const DevStages = () => {
  
  const { t, ready } = useTranslation('DevStages');
  
  const stageImages = [devStage1, devStage2, devStage3, devStage4, devStage5, devStage6, devStage7];

  if (!ready) return <LoadingSpinner />;
  return (
    <div className={styles.container}>
    <Header/>
      <div className={styles.mainDev}>
      <h1>{t('title')}</h1>
        <div className={styles.grid}>
        {t('stages', { returnObjects: true }).map((stage, index) => (
            <div key={index} className={styles.item}>
            <img 
              src={stageImages[index]} 
              alt={stage.title} 
              loading="lazy"
            />
            <div className={styles.imageTitle}>
              <div className={styles.pointTitle}>
                <span className={styles.point}>{index + 1}</span>
                <h3>{stage.title}</h3>
              </div>
              <div className={styles.imageDesc}>
                <p>{stage.description}</p>
              </div>
            </div>
          </div>
        ))}
          <div className={styles.item}>
          <Link to="/app-order" className={styles.button}>{t('cta')}</Link>
          {/*  <a href="../pages/app-order.html" className={styles.button}>{t('cta')}</a>*/}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default function WrappedDevStages() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DevStages />
    </Suspense>
  );
}
import React, { useState, Suspense } from "react";

import officeImage from '../assets/images/jpg/office.jpg';
import meetingImage from '../assets/images/jpg/meeting.jpg';
import newYearImage from '../assets/images/jpg/new_year.jpg';
import chistmasImage from '../assets/images/jpg/chistmas.jpg';
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/about-us.module.css"; // Импорт стилей
import { useTranslation } from 'react-i18next';
import ImageViewer from "../components/ImageViewer";

import LoadingSpinner from "../components/LoadingSpinner";
const AboutUs = () => {
  const { t, ready } = useTranslation('AboutUs');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };
  if (!ready) return <LoadingSpinner />;
  return (

      <div className={styles.container}>
        <Header />
        <main>
          <div className={styles.title}>
            <h1>{t('title')}</h1>
          </div>
          <p>
          {t('welcome')}
          <br />
          {t('description')}
          </p>
          <section className={styles.mainContainer}>
            <div className={styles.block}>
              <div className={styles.blockInfo}>
              <h2>{t('mission.title')}</h2>
              <p>{t('mission.text')}</p>
              </div>
            </div>

            <div className={styles.block}>
              <div className={styles.blockInfo}>
              <h2>{t('specialists.title')}</h2>
              <p>{t('specialists.text')}</p>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.blockInfo}>
              <h2>{t('values.title')}</h2>
              <p>
                {t('values.items.0')}
                <br /><br />
                {t('values.items.1')}
                <br /><br />
                {t('values.items.2')}
              </p>
              </div>
            </div>
          </section>
          <div className={styles.title}>
          <h1>{t('corporate_life')}</h1>
        </div>
        <div className={styles.photos}>
          {t('photos', { returnObjects: true }).map((photo, index) => (
            <figure key={index}>
              <img 
                src={[officeImage, meetingImage, newYearImage, chistmasImage][index]} 
                alt={photo.alt} 
                title={t('view_closer')} 
                onClick={() => handleImageClick([officeImage, meetingImage, newYearImage, chistmasImage][index])} 
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        </main>
        <Footer />
        {selectedImage && (
        <ImageViewer src={selectedImage} onClose={closeImageViewer} />
      )}
      </div>

  );
};

export default function WrappedAboutUs() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AboutUs />
    </Suspense>
  );
}
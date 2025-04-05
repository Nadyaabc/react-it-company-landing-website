import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Импорт Link и useLocation
import styles from '../styles/footer.module.css'; // Импорт стилей
import logo from '../assets/images/svg/logo.svg';
import telegramIcon from '../assets/images/svg/telegram-icon.svg';
import viberIcon from '../assets/images/svg/viber-icon.svg';
import logoEn from '../assets/images/svg/logo-en.svg';
import logoRu from '../assets/images/svg/logo.svg';
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const location = useLocation(); // Получаем текущее местоположение
  const { t,i18n } = useTranslation('header');
  
  const logo = i18n.language === 'ru' ? logoRu : logoEn;
  return (
    <footer className={styles.footer}>
 <nav>
 <ul className={styles.navList}>
          <li>
            <Link  className={location.pathname === '/' ? styles.currentPage : ''} to="/">{t('nav.home')}</Link>
          </li>
          <li>
            <Link className={location.pathname === '/about-us' ? styles.currentPage : ''} to="/about-us">{t('nav.about')}</Link>
          </li>
          <li >
            <Link className={location.pathname === '/dev-stages' ? styles.currentPage : ''} to="/dev-stages">{t('nav.stages')}</Link>
          </li>
          <li>
            <Link  className={location.pathname === '/pricing' ? styles.currentPage : ''} to="/pricing">{t('nav.pricing')}</Link>
          </li>
          <li >
            <Link className={location.pathname === '/app-order' ? styles.currentPage : ''} to="/app-order">{t('nav.order')}</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.contacts}>
        <p style={{ opacity: '0.5' }}>+375 (17) 318-17-98</p>
        <p style={{ opacity: '0.5' }}>softerio_tech@gmail.com</p>
        <p style={{ opacity: '0.5' }}>{t("contacts.schedule")}</p>
      </div>
      <div className={styles.socialMedia}>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer">
          <img src={telegramIcon} alt="Telegram" />
        </a>
        <a href="https://viber.com" target="_blank" rel="noopener noreferrer">
          <img src={viberIcon} alt="Viber" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
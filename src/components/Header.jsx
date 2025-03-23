import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Импорт Link и useLocation
import styles from '../styles/index.module.css'; // Импорт стилей
import logo from '../assets/images/svg/logo.svg';
import telegramIcon from '../assets/images/svg/telegram-icon.svg';
import viberIcon from '../assets/images/svg/viber-icon.svg';

const Header = () => {
  const location = useLocation(); // Получаем текущее местоположение

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link  className={location.pathname === '/' ? styles.currentPage : ''} to="/">Главная</Link>
          </li>
          <li>
            <Link className={location.pathname === '/about-us' ? styles.currentPage : ''} to="/about-us">О нас</Link>
          </li>
          <li >
            <Link className={location.pathname === '/dev-stages' ? styles.currentPage : ''} to="/dev-stages">Этапы работы</Link>
          </li>
          <li>
            <Link  className={location.pathname === '/pricing' ? styles.currentPage : ''} to="/pricing">Стоимость</Link>
          </li>
          <li >
            <Link className={location.pathname === '/app-order' ? styles.currentPage : ''} to="/app-order">Заказать приложение</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.contacts}>
        <p><strong className={styles.phone}>+375 (17) 318-17-98</strong></p>
        <p style={{ opacity: '0.5' }}>softerio_tech@gmail.com</p>
      </div>
      <div className={styles.socialMedia}>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer">
          <img src={telegramIcon} alt="Telegram" />
        </a>
        <a href="https://viber.com" target="_blank" rel="noopener noreferrer">
          <img src={viberIcon} alt="Viber" />
        </a>
      </div>
    </header>
  );
};

export default Header;
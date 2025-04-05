import { useState, useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import './Toolbar.css';
import LoadingSpinner from "../components/LoadingSpinner";

export const Toolbar = () => {
  const { t, i18n } = useTranslation("toolbar");
  const [expanded, setExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return false; // По умолчанию светлая тема
  });
  
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved) : 16;
  });
  
  const [imagesHidden, setImagesHidden] = useState(() => {
    return localStorage.getItem('imagesHidden') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    document.querySelectorAll('img').forEach(img => {
      img.style.display = imagesHidden ? 'none' : '';
    });

    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('imagesHidden', imagesHidden);
  }, [darkMode, fontSize, imagesHidden]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  const resetSettings = () => {
    setDarkMode(false);    setFontSize(16);
    setImagesHidden(false);
  };

  return (
    <div className={`floating-toolbar ${expanded ? 'expanded' : ''}`}>
      <button 
        className="toolbar-toggle" 
        onClick={() => setExpanded(!expanded)}
        aria-label={t('toolbar.toggle')}
      >
        {expanded ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <div className="div">⚙️</div>
        )}
      </button>
      
      <div className="toolbar-content">
        <div className="toolbar-header">
          <h3>{t('toolbar.title')}</h3>
         
        </div>
        
        {/* Секция переключения языка */}
        <div className="toolbar-section">
          <label>{t('toolbar.language')}</label>
          <div className="select-wrapper">
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="language-select"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
            <div className="select-arrow">▼</div>
          </div>
        </div>

        <div className="toolbar-section">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={(e) => setDarkMode(e.target.checked)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">{t('toolbar.dark_mode')}</span>
          </label>
        </div>
        
        <div className="toolbar-section">
          <label>{t('toolbar.font_size')}</label>
          <div className="font-size-controls">
            <button 
              className="size-btn decrease" 
              onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
              aria-label={t('toolbar.decrease_font')}
            >
              <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="font-size-visual">
              <span style={{ fontSize: '0.8em' }}>A</span>
              <span style={{ fontSize: '1em' }}>A</span>
              <span style={{ fontSize: '1.2em' }}>A</span>
            </div>
            <button 
              className="size-btn increase" 
              onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
              aria-label={t('toolbar.increase_font')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="toolbar-section">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={imagesHidden} 
              onChange={(e) => setImagesHidden(e.target.checked)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">{t('toolbar.hide_images')}</span>
          </label>
        </div>
      </div>
    </div>
  );
};


export default function WrappeToolBar() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Toolbar />
    </Suspense>
  );
}











/*import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Toolbar.css';

export const Toolbar = () => {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved) : 16;
  });
  
  const [imagesHidden, setImagesHidden] = useState(() => {
    return localStorage.getItem('imagesHidden') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    document.querySelectorAll('img').forEach(img => {
      img.style.display = imagesHidden ? 'none' : '';
    });

    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('imagesHidden', imagesHidden);
  }, [darkMode, fontSize, imagesHidden]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className={`floating-toolbar ${expanded ? 'expanded' : ''}`}>
      <button 
        className="toolbar-toggle" 
        onClick={() => setExpanded(!expanded)}
        aria-label={t('toolbar.toggle')}
      >
        {expanded ? '✕' : '⚙️'}
      </button>
      
      <div className="toolbar-content">
        <h3>{t('toolbar.title')}</h3>
        
        <div className="toolbar-section">
          <label>{t('toolbar.language')}</label>
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-select"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        <div className="toolbar-section">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={(e) => setDarkMode(e.target.checked)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">{t('toolbar.dark_mode')}</span>
          </label>
        </div>
        
        <div className="toolbar-section">
          <label>{t('toolbar.font_size')}</label>
          <div className="font-size-controls">
            <button 
              className="size-btn" 
              onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
              aria-label={t('toolbar.decrease_font')}
            >
              A-
            </button>
            <button 
              className="size-btn" 
              onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
              aria-label={t('toolbar.increase_font')}
            >
              A+
            </button>
          </div>
        </div>
        
        <div className="toolbar-section">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={imagesHidden} 
              onChange={(e) => setImagesHidden(e.target.checked)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">{t('toolbar.hide_images')}</span>
          </label>
        </div>
      </div>
    </div>
  );
};*/
/*
import { useState, useEffect } from 'react';
import './Toolbar.css';

export const Toolbar = () => {
  // Состояния
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [highContrast, setHighContrast] = useState(false);
  const [imagesHidden, setImagesHidden] = useState(false);
  const [language, setLanguage] = useState('ru');

  // Применение настроек
  useEffect(() => {
    document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`);
  
    // Применяем тему
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }

    // Применяем контраст
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Применяем шрифт
    document.documentElement.style.fontFamily = fontFamily;
    document.documentElement.style.fontSize = `${fontSize}px`;

    // Скрытие изображений
    document.querySelectorAll('img').forEach(img => {
      img.style.display = imagesHidden ? 'none' : '';
    });

    // Сохранение настроек
    localStorage.setItem('toolbarSettings', JSON.stringify({
      darkMode,
      fontSize,
      fontFamily,
      highContrast,
      imagesHidden
    }));
  }, [darkMode, fontSize, fontFamily, highContrast, imagesHidden]);

  // Загрузка настроек при монтировании
  useEffect(() => {
    const savedSettings = localStorage.getItem('toolbarSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDarkMode(settings.darkMode || false);
      setFontSize(settings.fontSize || 16);
      setFontFamily(settings.fontFamily || 'sans-serif');
      setHighContrast(settings.highContrast || false);
      setImagesHidden(settings.imagesHidden || false);
    }
  }, []);

  // Функция для смены языка (заглушка)
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Здесь должна быть реализация смены языка
    console.log('Язык изменен на:', lang);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        {/* Переключение темы }
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`toolbar-btn ${darkMode ? 'active' : ''}`}
          title={darkMode ? 'Светлая тема' : 'Тёмная тема'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Размер шрифта }
        <div className="toolbar-group">
          <button
            onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
            className="toolbar-btn"
            title="Уменьшить шрифт"
          >
            A-
          </button>
          <span className="font-size-display">{fontSize}px</span>
          <button
            onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
            className="toolbar-btn"
            title="Увеличить шрифт"
          >
            A+
          </button>
        </div>

        {/* Тип шрифта }
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="toolbar-select"
          title="Выберите шрифт"
        >
          <option value="sans-serif">Без засечек</option>
          <option value="serif">С засечками</option>
          <option value="monospace">Моноширинный</option>
        </select>

        {/* Высокая контрастность }
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`toolbar-btn ${highContrast ? 'active' : ''}`}
          title="Высокая контрастность"
        >
          👁️
        </button>

        {/* Изображения }
        <button
          onClick={() => setImagesHidden(!imagesHidden)}
          className={`toolbar-btn ${imagesHidden ? 'active' : ''}`}
          title={imagesHidden ? 'Показать изображения' : 'Скрыть изображения'}
        >
          {imagesHidden ? '🖼️👁️' : '🖼️🚫'}
        </button>

        {/* Язык }
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="toolbar-select"
          title="Выберите язык"
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};

*/
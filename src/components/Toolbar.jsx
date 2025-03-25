// components/Toolbar.jsx
import { useState, useEffect } from 'react';
import './Toolbar.css';

// Минимальный и максимальный размер шрифта
const MIN_FONT_SIZE = 14; // Минимальный размер шрифта
const MAX_FONT_SIZE = 24; // Максимальный размер шрифта
const DEFAULT_FONT_SIZE = 16; // Размер по умолчанию

export const Toolbar = () => {
  // Состояния
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [highContrast, setHighContrast] = useState(false);
  const [imagesHidden, setImagesHidden] = useState(false);
  const [language, setLanguage] = useState('ru');
  const [isMinFontSize, setIsMinFontSize] = useState(false);
  const [isMaxFontSize, setIsMaxFontSize] = useState(false);

  // Проверка границ размера шрифта
  useEffect(() => {
    setIsMinFontSize(fontSize <= MIN_FONT_SIZE);
    setIsMaxFontSize(fontSize >= MAX_FONT_SIZE);
  }, [fontSize]);

  // Применение настроек
  useEffect(() => {
    // Применяем размер шрифта через CSS переменную
    document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`);
    
    // Применяем тему
    document.documentElement.classList.toggle('dark-theme', darkMode);
    document.documentElement.classList.toggle('light-theme', !darkMode);
    
    // Применяем контраст
    document.documentElement.classList.toggle('high-contrast', highContrast);
    
    // Применяем шрифт
    document.documentElement.style.fontFamily = fontFamily;
    
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
      imagesHidden,
      language
    }));
  }, [darkMode, fontSize, fontFamily, highContrast, imagesHidden]);

  // Загрузка настроек при монтировании
  useEffect(() => {
    const savedSettings = localStorage.getItem('toolbarSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setDarkMode(settings.darkMode ?? false);
      setFontSize(settings.fontSize ?? DEFAULT_FONT_SIZE);
      setFontFamily(settings.fontFamily ?? 'sans-serif');
      setHighContrast(settings.highContrast ?? false);
      setImagesHidden(settings.imagesHidden ?? false);
      setLanguage(settings.language ?? 'ru');
    }
  }, []);

  // Изменение размера шрифта с проверкой границ
  const changeFontSize = (newSize) => {
    const clampedSize = Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, newSize));
    setFontSize(clampedSize);
  };

  // Функция для смены языка
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Здесь должна быть реализация смены языка
    console.log('Язык изменен на:', lang);
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        {/* Переключение темы */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`toolbar-btn ${darkMode ? 'active' : ''}`}
          title={darkMode ? 'Светлая тема' : 'Тёмная тема'}
          aria-pressed={darkMode}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Размер шрифта */}
        <div className="toolbar-group">
          <button
            onClick={() => changeFontSize(fontSize - 1)}
            className={`toolbar-btn ${isMinFontSize ? 'disabled' : ''}`}
            title="Уменьшить шрифт"
            disabled={isMinFontSize}
            aria-label="Уменьшить размер шрифта"
          >
            A-
          </button>
          <span className="font-size-display" aria-live="polite">
            {fontSize}px
          </span>
          <button
            onClick={() => changeFontSize(fontSize + 1)}
            className={`toolbar-btn ${isMaxFontSize ? 'disabled' : ''}`}
            title="Увеличить шрифт"
            disabled={isMaxFontSize}
            aria-label="Увеличить размер шрифта"
          >
            A+
          </button>
        </div>

        {/* Тип шрифта */}
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="toolbar-select"
          title="Выберите шрифт"
          aria-label="Выберите тип шрифта"
        >
          <option value="sans-serif">Без засечек</option>
          <option value="serif">С засечками</option>
          <option value="monospace">Моноширинный</option>
        </select>

        {/* Высокая контрастность */}
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`toolbar-btn ${highContrast ? 'active' : ''}`}
          title="Высокая контрастность"
          aria-pressed={highContrast}
        >
          👁️
        </button>

        {/* Изображения */}
        <button
          onClick={() => setImagesHidden(!imagesHidden)}
          className={`toolbar-btn ${imagesHidden ? 'active' : ''}`}
          title={imagesHidden ? 'Показать изображения' : 'Скрыть изображения'}
          aria-pressed={imagesHidden}
        >
          {imagesHidden ? '🖼️👁️' : '🖼️🚫'}
        </button>

        {/* Язык */}
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="toolbar-select"
          title="Выберите язык"
          aria-label="Выберите язык интерфейса"
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};
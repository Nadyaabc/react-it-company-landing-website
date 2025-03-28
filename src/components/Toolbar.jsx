import { useState, useEffect } from 'react';
import './Toolbar.css';

export const Toolbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [highContrast, setHighContrast] = useState(false);
  const [imagesHidden, setImagesHidden] = useState(false);
  const [language, setLanguage] = useState('ru');

  // Применение настроек при изменении
  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    document.documentElement.style.fontFamily = fontFamily;
    
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }

    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    document.querySelectorAll('img').forEach(img => {
      img.style.display = imagesHidden ? 'none' : '';
    });

    localStorage.setItem('toolbarSettings', JSON.stringify({
      darkMode,
      fontSize,
      fontFamily,
      highContrast,
      imagesHidden
    }));
  }, [darkMode, fontSize, fontFamily, highContrast, imagesHidden]);

  // Загрузка сохраненных настроек
  useEffect(() => {
    // Применяем размер шрифта через CSS переменную
    document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`);
    
    // Остальные настройки...
    document.documentElement.style.fontFamily = fontFamily;
    
    if (darkMode) {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  
    document.querySelectorAll('img').forEach(img => {
      img.style.display = imagesHidden ? 'none' : '';
    });
  
    localStorage.setItem('toolbarSettings', JSON.stringify({
      darkMode,
      fontSize,
      fontFamily,
      highContrast,
      imagesHidden
    }));
  }, [darkMode, fontSize, fontFamily, highContrast, imagesHidden]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    console.log('Язык изменен на:', lang);
  };

  return (
    <div className={`floating-toolbar ${expanded ? 'expanded' : ''}`}>
      {/* Кнопка-иконка для раскрытия */}
      <button className="toolbar-toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? '✕' : '⚙️'}
      </button>
      
      {/* Содержимое панели */}
      <div className="toolbar-content">
        <h3>Настройки доступности</h3>
        
        <div className="toolbar-section">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={(e) => setDarkMode(e.target.checked)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">Тёмная тема</span>
          </label>
        </div>
        
        <div className="toolbar-section">
          <label>Размер текста: {fontSize}px</label>
          <div className="font-size-controls">
            <button 
              className="size-btn" 
              onClick={() => setFontSize(prev => Math.max(12, prev - 1))}
            >
              A-
            </button>
            <span className="font-size-value">{fontSize}px</span>
            <button 
              className="size-btn" 
              onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
            >
              A+
            </button>
          </div>
        </div>
        
        <div className="toolbar-section">
          <label>Шрифт:</label>
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="font-select"
          >
            <option value="sans-serif">Без засечек</option>
            <option value="serif">С засечками</option>
            <option value="monospace">Моноширинный</option>
          </select>
        </div>
        
        <div className="toolbar-section">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={highContrast} 
              onChange={(e) => setHighContrast(e.target.checked)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">Высокий контраст</span>
          </label>
        </div>
        
        <div className="toolbar-section">
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={imagesHidden} 
              onChange={(e) => setImagesHidden(e.target.checked)} 
            />
            <span className="slider round"></span>
            <span className="toggle-label">Скрыть изображения</span>
          </label>
        </div>
        
        <div className="toolbar-section">
          <label>Язык:</label>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="lang-select"
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
};

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
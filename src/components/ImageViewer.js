import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/image-viewer.module.css';

const ImageViewer = ({ src, onClose }) => {
  const [scale, setScale] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState('50% 50%');
  const imgRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;
    
    setTransformOrigin(`${x}% ${y}%`);
    
    let newScale = scale + e.deltaY * -0.01;
    newScale = Math.min(Math.max(1, newScale), 3);
    setScale(newScale);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Восстанавливаем прокрутку страницы
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className={styles.viewer} 
      onClick={onClose}
    >
      <img 
        ref={imgRef}
        src={src} 
        className={styles.zoomable} 
        style={{
          transform: `scale(${scale})`,
          transformOrigin: transformOrigin
        }}
        onWheel={handleWheel}
        onClick={(e) => e.stopPropagation()}
        alt="Увеличенное изображение"
      />
    </div>
  );
};

export default ImageViewer;
import React, { useState, memo } from 'react';
import '../styles/components/Footer.css';

// Array delle foto di Londra
const londonPhotos = [
  {
    id: 1,
    url: "https://www.abta.com/sites/default/files/styles/large/public/media/uploads/london-400x400-compressor_0.jpg",
    alt: "Millennium Bridge",
    caption: "Millennium Bridge con vista sulla cattedrale di St. Paul"
  },
  {
    id: 2,
    url: "https://imgc.allpostersimages.com/img/posters/evening-tower-bridge-and-river-thames-london_u-L-P2QVZJ0.jpg?artPerspective=n",
    alt: "Tower Bridge",
    caption: "Tower Bridge e il Tamigi al tramonto"
  },
  {
    id: 3,
    url: "https://cdn.pixabay.com/photo/2014/11/13/23/34/london-530055_960_720.jpg",
    alt: "Big Ben",
    caption: "Il famoso Big Ben e il palazzo di Westminster"
  },
  {
    id: 4,
    url: "https://cdn.pixabay.com/photo/2016/10/17/10/52/london-eye-1747353_960_720.jpg",
    alt: "London Eye",
    caption: "La ruota panoramica London Eye"
  }
];

// Componente ottimizzato con memo
const Footer = memo(() => {
  // Stato per gestire l'immagine attualmente visualizzata a schermo intero
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Funzione per aprire la visualizzazione a schermo intero
  const openFullScreen = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden'; // Impedisce lo scroll quando la foto è aperta
  };
  
  // Funzione per chiudere la visualizzazione a schermo intero
  const closeFullScreen = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto'; // Ripristina lo scroll
  };
  
  return (
    <footer>
      <h3 className="title">Le foto</h3>
      
      <div className="photo-grid">
        {londonPhotos.map((photo) => (
          <div key={photo.id} className="photo-container" onClick={() => openFullScreen(photo)}>
            <img
              src={photo.url}
              alt={photo.alt}
              className="london-photo"
              loading="lazy" // Lazy loading per migliorare le performance
            />
            <div className="photo-overlay">
              <p>{photo.caption}</p>
              <span className="zoom-icon">🔍</span>
            </div>
          </div>
        ))}
      </div>
      
      <p className="photo-tip">Clicca su una foto per ingrandirla</p>
      
      {/* Modale per la visualizzazione a schermo intero */}
      {selectedPhoto && (
        <div className="fullscreen-overlay" onClick={closeFullScreen}>
          <div className="fullscreen-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeFullScreen} aria-label="Chiudi visualizzazione">×</button>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.alt} 
              className="fullscreen-image"
            />
            <div className="fullscreen-caption">
              <p>{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="footer-info">
        <p>© 2025 Il mio viaggio a Londra</p>
        <p>Creato con React e tanto amore per i viaggi</p>
      </div>
    </footer>
  );
});

export default Footer;
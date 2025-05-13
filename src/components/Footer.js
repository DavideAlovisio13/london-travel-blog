import React from 'react';
import '../styles/components/Footer.css';

function Footer() {
  return (
    <footer>
      <h3 className="title">Le foto</h3>
      <div className="photo-grid">
        <img 
          src="https://www.abta.com/sites/default/files/styles/large/public/media/uploads/london-400x400-compressor_0.jpg" 
          alt="Millennium Bridge"
          className="london-photo"
        />
        <img 
          src="https://imgc.allpostersimages.com/img/posters/evening-tower-bridge-and-river-thames-london_u-L-P2QVZJ0.jpg?artPerspective=n" 
          alt="Tower Bridge bottom view"
          className="london-photo"
        />
      </div>
    </footer>
  );
}

export default Footer;
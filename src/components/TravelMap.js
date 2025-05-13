import React, { useState, useEffect, memo } from 'react';
import '../styles/components/TravelMap.css';

// Dati dei luoghi di Londra
const places = [
    { id: 1, name: 'Tower of London', x: 30, y: 60, visited: false },
    { id: 2, name: 'Greenwich', x: 45, y: 70, visited: true },
    { id: 3, name: 'Covent Garden', x: 20, y: 40, visited: true },
    { id: 4, name: 'Buckingham Palace', x: 15, y: 50, visited: false }
];

// Dati delle etichette sulla mappa
const labels = [
    { id: 1, text: 'Tamigi', x: 50, y: 30, rotate: -15 },
    { id: 2, text: 'Hyde Park', x: 25, y: 20, rotate: 0 },
    { id: 3, text: 'City', x: 70, y: 45, rotate: 0 }
];

// Utilizziamo React.memo per prevenire re-render non necessari
const TravelMap = memo(() => {
    const [loading, setLoading] = useState(true);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Simuliamo il caricamento della mappa
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            setMapLoaded(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Gestisce il click su un marker
    const handleMarkerClick = (place) => {
        setSelectedPlace(place);
    };

    // Chiude il popup
    const closePopup = () => {
        setSelectedPlace(null);
    };

    return (
        <section className="bgsect">
            <h3 className="title">I luoghi visitati</h3>
            <div className="map-container">
                <div className={`travel-map ${mapLoaded ? 'map-loaded' : ''}`}>
                    {loading ? (
                        <div className="map-loading">Caricamento mappa...</div>
                    ) : (
                        <>
                            {/* Marker dei luoghi */}
                            {places.map(place => (
                                <button
                                    key={place.id}
                                    className={`map-marker ${place.visited ? 'visited' : 'not-visited'}`}
                                    style={{
                                        left: `${place.x}%`,
                                        top: `${place.y}%`
                                    }}
                                    onClick={() => handleMarkerClick(place)}
                                    aria-label={place.name}
                                >
                                    <div className="map-tooltip">{place.name}</div>
                                </button>
                            ))}

                            {/* Etichette dei quartieri */}
                            {labels.map(label => (
                                <div
                                    key={label.id}
                                    className="map-label"
                                    style={{
                                        left: `${label.x}%`,
                                        top: `${label.y}%`,
                                        transform: `translate(-50%, -50%) rotate(${label.rotate}deg)`
                                    }}
                                >
                                    {label.text}
                                </div>
                            ))}

                            {/* Popup con info sul luogo selezionato */}
                            {selectedPlace && (
                                <div className="place-popup">
                                    <button className="close-popup" onClick={closePopup}>×</button>
                                    <h4>{selectedPlace.name}</h4>
                                    <p>
                                        {selectedPlace.visited
                                            ? "Hai visitato questo luogo durante il tuo viaggio!"
                                            : "Non hai ancora visitato questo luogo."}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <p className="map-instructions">
                    Clicca sui marker per esplorare i luoghi visitati durante il viaggio
                </p>
            </div>
        </section>
    );
});

export default TravelMap;

import React, { useState, memo } from 'react';
import { usefulInfo } from '../data/usefulInfo';
import '../styles/components/UsefulInfo.css';

// Utilizziamo memo per ottimizzare le performance
const UsefulInfo = memo(() => {
    // Stato per tenere traccia di quale informazione è espansa
    const [expandedItem, setExpandedItem] = useState(null);

    // Funzione per gestire il click su una categoria
    const toggleExpand = (categoryIndex) => {
        if (expandedItem === categoryIndex) {
            setExpandedItem(null); // chiude se già aperto
        } else {
            setExpandedItem(categoryIndex); // apre la nuova categoria
        }
    };

    // Icone per le categorie
    const getCategoryIcon = (title) => {
        switch (title.toLowerCase()) {
            case 'numeri utili di emergenza':
                return '🆘';
            case 'hotel':
                return '🏨';
            case 'aereo':
                return '✈️';
            default:
                return '📌';
        }
    };

    return (
        <section className="bgsect">
            <h3 className="title">Info utili</h3>

            <div className="info-categories">
                {usefulInfo.map((category, categoryIndex) => (
                    <div
                        key={categoryIndex}
                        className={`info-category ${expandedItem === categoryIndex ? 'expanded' : ''}`}
                    >
                        <div
                            className="category-header"
                            onClick={() => toggleExpand(categoryIndex)}
                            role="button"
                            aria-expanded={expandedItem === categoryIndex}
                            tabIndex={0}
                        >
                            <span className="category-icon">{getCategoryIcon(category.title)}</span>
                            <h4 className="category-title">{category.title}</h4>
                            <span className="expand-icon">{expandedItem === categoryIndex ? '−' : '+'}</span>
                        </div>

                        <div className="category-content">
                            <ul className="info-list">
                                {category.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="info-item">
                                        <div className="info-item-label">{item.label}</div>
                                        <div className="info-item-description">{item.description}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="useful-tips">
                <h4 className="tips-title">Consigli utili per Londra</h4>
                <ul className="tips-list">
                    <li>Acquista una Oyster Card per i mezzi pubblici</li>
                    <li>Molti musei sono gratuiti (British Museum, Tate Modern, National Gallery)</li>
                    <li>Il tempo può cambiare rapidamente, porta sempre un ombrello</li>
                    <li>Prova lo street food ai mercati di Borough o Camden</li>
                </ul>
            </div>
        </section>
    );
});

export default UsefulInfo;
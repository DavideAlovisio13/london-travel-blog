import React from 'react';
import { usefulInfo } from '../data/usefulInfo';
import '../styles/components/UsefulInfo.css';

function UsefulInfo() {
  return (
    <section className="bgsect">
      <h3 className="title">Info utili:</h3>
      <ol>
        {usefulInfo.map((category, categoryIndex) => (
          <li key={categoryIndex}>
            <p className="par">{category.title}</p>
            <ul>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <p>
                    <strong>{item.label}</strong> - {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default UsefulInfo;
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="container container-padding error-page fade-in lang-fade-transition" key={i18n.language}>
      <div className="error-code">404</div>
      <h2>{t('not_found.title')}</h2>
      <p>{t('not_found.desc')}</p>
      <Link to="/" className="btn btn-primary">
        {i18n.language.startsWith('kn') ? 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Go Back to Home'}
      </Link>
    </div>
  );
};

export default NotFound;

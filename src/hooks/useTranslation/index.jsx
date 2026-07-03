import { useContext, createContext } from 'react';
import translations from '../locales/uz.json';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    return {
      t: (key) => {
        const keys = key.split('.');
        let value = translations;
        for (let k of keys) {
          value = value?.[k];
        }
        return value || key;
      }
    };
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    for (let k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default translations;

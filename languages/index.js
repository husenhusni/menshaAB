import i18n from 'i18n-js';
import en from './en'
import sv from './sv'


i18n.translations = {
    en,
    sv
}
i18n.fallbacks = true;

export function t(name) {
    return i18n.t(name)
    
};
export default i18n


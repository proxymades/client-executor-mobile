//core
import { useMMKVString } from "react-native-mmkv"
import dayjs from 'dayjs'
import locale_ru from 'dayjs/locale/ru'
import locale_en from 'dayjs/locale/en'

export const useLanguage = () => {

    //variables
    let lang

    //hooks
    const [language, setLanguage] = useMMKVString('language')

    if (language) {
        if (language === 'ru') {
            lang = require('../../locale/ru').locale
            dayjs.locale(locale_ru)
        }
        if (language === 'en') {
            lang = require('../../locale/eng').locale
            dayjs.locale(locale_en)
        }
    } else {
        lang = require('../../locale/ru').locale
        dayjs.locale(locale_ru)
    }

    return { lang }
}
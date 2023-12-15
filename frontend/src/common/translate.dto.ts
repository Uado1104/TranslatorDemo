enum ELanguage {
    en = 'en',  // English
    ko = 'ko',  // Korean
    ja = 'ja',  // Japanese
    fr = 'fr',  // French
    de = 'de',  // German
    es = 'es',  // Spanish
    it = 'it',  // Italian
    ru = 'ru',  // Russian
    pt = 'pt',  // Portuguese
    vi = 'vi',  // Vietnamese
}

export type TLanguage = keyof typeof ELanguage;

export type TTranslateTool = 'google' | 'chatGpt';

export interface ITranslate {
    /** 翻译的时间 */
    date: string;

    /** 工具 */
    tool: TTranslateTool;

    /** 原文 */
    originalText: string;

    /** 译文 */
    translatedText?: string;

    /** 译文的语言 */
    to: TLanguage;
}
  
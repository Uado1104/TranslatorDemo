import axios from "axios";

const languages = {
    'af': 'afrikaans',
    'sq': 'albanian',
    'am': 'amharic',
    'ar': 'arabic',
    'hy': 'armenian',
    'az': 'azerbaijani',
    'eu': 'basque',
    'be': 'belarusian',
    'bn': 'bengali',
    'bs': 'bosnian',
    'bg': 'bulgarian',
    'ca': 'catalan',
    'ceb': 'cebuano',
    'ny': 'chichewa',
    'zh-cn': 'chinese (simplified)',
    'zh-tw': 'chinese (traditional)',
    'co': 'corsican',
    'hr': 'croatian',
    'cs': 'czech',
    'da': 'danish',
    'nl': 'dutch',
    'en': 'english',
    'eo': 'esperanto',
    'et': 'estonian',
    'tl': 'filipino',
    'fi': 'finnish',
    'fr': 'french',
    'fy': 'frisian',
    'gl': 'galician',
    'ka': 'georgian',
    'de': 'german',
    'el': 'greek',
    'gu': 'gujarati',
    'ht': 'haitian creole',
    'ha': 'hausa',
    'haw': 'hawaiian',
    'iw': 'hebrew',
    'hi': 'hindi',
    'hmn': 'hmong',
    'hu': 'hungarian',
    'is': 'icelandic',
    'ig': 'igbo',
    'id': 'indonesian',
    'ga': 'irish',
    'it': 'italian',
    'ja': 'japanese',
    'jw': 'javanese',
    'kn': 'kannada',
    'kk': 'kazakh',
    'km': 'khmer',
    'ko': 'korean',
    'ku': 'kurdish (kurmanji)',
    'ky': 'kyrgyz',
    'lo': 'lao',
    'la': 'latin',
    'lv': 'latvian',
    'lt': 'lithuanian',
    'lb': 'luxembourgish',
    'mk': 'macedonian',
    'mg': 'malagasy',
    'ms': 'malay',
    'ml': 'malayalam',
    'mt': 'maltese',
    'mi': 'maori',
    'mr': 'marathi',
    'mn': 'mongolian',
    'my': 'myanmar (burmese)',
    'ne': 'nepali',
    'no': 'norwegian',
    'ps': 'pashto',
    'fa': 'persian',
    'pl': 'polish',
    'pt': 'portuguese',
    'pa': 'punjabi',
    'ro': 'romanian',
    'ru': 'russian',
    'sm': 'samoan',
    'gd': 'scots gaelic',
    'sr': 'serbian',
    'st': 'sesotho',
    'sn': 'shona',
    'sd': 'sindhi',
    'si': 'sinhala',
    'sk': 'slovak',
    'sl': 'slovenian',
    'so': 'somali',
    'es': 'spanish',
    'su': 'sundanese',
    'sw': 'swahili',
    'sv': 'swedish',
    'tg': 'tajik',
    'ta': 'tamil',
    'te': 'telugu',
    'th': 'thai',
    'tr': 'turkish',
    'uk': 'ukrainian',
    'ur': 'urdu',
    'uz': 'uzbek',
    'vi': 'vietnamese',
    'cy': 'welsh',
    'xh': 'xhosa',
    'yi': 'yiddish',
    'yo': 'yoruba',
    'zu': 'zulu',
    'fil': 'Filipino',
    'he': 'Hebrew'
}


class BaseTranslator {
    languages: typeof languages;
    Configs: any;
    From: string;
    To: string;

    constructor(to: string, from: string) {
        
        this.languages = languages;
        this.From = from;
        this.To = to;
        this.Configs = {
            google: {
                url: "https://translate.google.com/m?",
                pattern: 'class="result-container">',
                supportedLanguages: this.languages,
                key: "q",
                minChars: 1,
                maxChars: 5000,
            },
            mymemory: {
                url: "http://api.mymemory.translated.net/get",
                minChars: 1,
                maxChars: 5000,
                supportedLanguages: this.languages,
                key: "q",
            },
        };
    }
    

    async _request(url: string, params: any): Promise<any> {
        try {
            const response = await axios.get(url, { params: params });
            return response.data;
        } catch (err) {
            console.warn(err);
        }
    }
}
  
export class GoogleTranslator extends BaseTranslator {

    url: string;
    params: any;
    constructor(to: string, from = "auto") {
        super(to, from);
        this.url = this.Configs.google.url;
        this.params = {
            sl: 'english',
            hl: 'chinese (simplified)',
            q: "",
        };
    }

    static getSupportedLanguages(asList=false) {
        if (asList) return Object.keys(languages);
        return languages;
    }

    async translateText(text: string): Promise<string> {
        this.params.q = text.trim();
        try {
            const html = await this._request(this.url, this.params);
            const idx = html.search(this.Configs.google.pattern) +
                this.Configs.google.pattern.length;
            const body = html.slice(idx);
            const translated = body.substring(0, body.indexOf("<"));
            return translated ?? '';
        } catch (err) {
            console.warn(err);
            return '待翻译文本为空';
        }
    }

    // async translateBatch(texts) {
    //   const arr = [];

    //   try {
    //     for (const text of texts) {
    //       const res = await this.translateText(text);
    //       arr.push(res);
    //     }
    //   } catch (err) {
    //     throw `error translating batch: ${err}`;
    //   }

    //   return arr;
    // }

    // async translateFile(f, readAsync = false) {
    //   try {
    //     const text = readAsync
    //       ? await fs.promises.readFile(f, "utf8")
    //       : fs.readFileSync(f, "utf-8");
    //     const result = await this.translateText(text);
    //     return result;
    //   } catch (err) {
    //     throw `translation file error: ${err}`;
    //   }
    // }
}
  
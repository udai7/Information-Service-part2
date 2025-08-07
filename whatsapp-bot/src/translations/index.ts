import { englishTranslations } from "./english";
import { bengaliTranslations } from "./bengali";
import { Translation } from "../types";

export class TranslationService {
  private translations: { [key: string]: Translation } = {
    en: englishTranslations,
    bn: bengaliTranslations,
  };

  translate(key: string, language: "en" | "bn" = "en"): string {
    const keys = key.split(".");
    let value: any = this.translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found in selected language
        value = this.translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return `[Missing translation: ${key}]`;
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : `[Invalid translation: ${key}]`;
  }

  // Helper method to get nested object
  getTranslationObject(key: string, language: "en" | "bn" = "en"): any {
    const keys = key.split(".");
    let value: any = this.translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = this.translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return null;
          }
        }
        break;
      }
    }

    return value;
  }

  // Get all available languages
  getAvailableLanguages(): {
    code: string;
    name: string;
    nativeName: string;
  }[] {
    return [
      { code: "en", name: "English", nativeName: "English" },
      { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    ];
  }
}

export const translationService = new TranslationService();

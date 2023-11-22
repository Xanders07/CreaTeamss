// translation.service.ts
import { Injectable } from '@angular/core';
import translations from './translate.json';
import { TranslationInterface } from './translate-interface';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = 'fr'; //default language
  private translations: TranslationInterface;

  constructor() {
    this.translations = translations as TranslationInterface;
  }

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let current = this.translations[this.currentLang];

    for (const k of keys) {

      if (current && current[k]) {
        current = current[k];
      } else {
        return 'Translation not found';
      }
    }

    return current;
  }
}

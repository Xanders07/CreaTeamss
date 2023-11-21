// translation.service.ts
import { Injectable } from '@angular/core';
import translations from './translate.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = 'fr'; // Langue par défaut

  constructor() {}

  setLanguage(lang: string) {
    this.currentLang = lang;
  }

  translate(key: string): string {
    const translation = translations[this.currentLang];
    const keys = key.split('.');
    let current = translation;

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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageGenerate'
})
export class ImageGeneratePipe implements PipeTransform {

  transform(hexString: string | undefined, mimeType: string = 'image/jpeg'): string | null {
    if (!hexString) {
      return null;
    }

    try {
      const byteArray = this.hexStringToByteArray(hexString);
      const blob = new Blob([byteArray], { type: mimeType });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Erreur lors de la conversion de la chaîne hexadécimale en URL :', error);
      return null;
    }
  }

  private hexStringToByteArray(hexString: string): Uint8Array {
    const len = hexString.length;
    const byteArray = new Uint8Array(len / 2);

    for (let i = 0; i < len; i += 2) {
      byteArray[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }

    return byteArray;
  }
}

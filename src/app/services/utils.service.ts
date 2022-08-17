import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  extractAssetIdFromOfferId(offerId: string) {
    const elements = offerId.split(':');
    if (elements.length != 2) {
      throw 'Invalid offer id: ' + offerId;
    }
    return elements[0];
  }
}

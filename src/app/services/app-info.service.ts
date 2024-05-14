import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return 'Vagas Internas';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}

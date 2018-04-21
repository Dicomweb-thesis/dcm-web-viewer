import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class DataService{
  private storageSub = new BehaviorSubject<string>("");

  constructor(private localStorageService: LocalStorageService){
  }

  getData(key) {
    let data = this.localStorageService.getValue(key);
    this.storageSub.next(data);
    return this.storageSub.asObservable();
  }

  setData(key, data) {
    this.localStorageService.setValue(key, data);
    this.storageSub.next(data);
  }
}

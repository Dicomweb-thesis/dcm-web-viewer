import {Component, OnChanges, OnInit} from '@angular/core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';
import {DataService} from './services/data.service';
import {USER_ID} from './services/local-storage.service';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

interface AppState {
  login: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, UserService]
})
export class AppComponent implements OnInit {
  userId: string;
  login$: Observable<boolean>;

  constructor(private dataService: DataService,
              private userService: UserService,
              private router: Router,
              private store: Store<AppState>) {
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
      webWorkerPath: '/assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask': {
          codecsPath: 'cornerstoneWADOImageLoaderCodecs.js'
        }
      }
    });

    this.login$ = this.store.select('login');

  }

  ngOnInit() {
    this.dataService.getData(USER_ID).subscribe(value => this.userId = value);

  }


  onLogout() {
    let log = confirm('Are you sure want to log out?');
    if (log) {
      this.userService.tryLogout();
      this.store.dispatch({type: 'LOGOUT'});
      this.router.navigate(['/login']);
    }
  }


}



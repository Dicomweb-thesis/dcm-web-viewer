import {Component, OnChanges, OnInit} from '@angular/core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.js';
import {DataService} from './services/data.service';
import {USER_ID} from './services/local-storage.service';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService,UserService]
})
export class AppComponent implements OnInit, OnChanges {
  userId: string;

  constructor(private dataService: DataService, private userService: UserService,private router:Router) {
    cornerstoneWADOImageLoader.webWorkerManager.initialize({
      webWorkerPath: '/assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask': {
          codecsPath: 'cornerstoneWADOImageLoaderCodecs.js'
        }
      }
    });
  }

  ngOnInit() {
    this.dataService.getData(USER_ID).subscribe(value => this.userId = value);

  }

  ngOnChanges(){
    this.dataService.getData(USER_ID).subscribe(value => this.userId = value);

  }

  onLogout() {
    let log = confirm('Are you sure want to log out?');
    if(log){
      this.userService.tryLogout();
      this.router.navigate(["/login"]);
    }
  }


}



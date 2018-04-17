import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {DataService} from '../../services/data.service';
import {UserService} from '../../services/user.service';
import {Router, ActivatedRoute} from '@angular/router';
import {LocalStorageService, USER_ID} from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[DataService,UserService,LocalStorageService]
})
export class LoginComponent implements OnInit {
  user: User;
  isLoginFailed = false;
  returnUrl: string;

  constructor(private dataService: DataService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = new User();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {
    let newUser = new User();
    newUser.username = this.user.username;
    newUser.password = btoa(this.user.username + ':' + this.user.password);
    this.userService.tryLogin(newUser)
      .subscribe(

        data => {
          this.dataService.setData(USER_ID, data.userId);
          // this.router.navigateByUrl('/users/'+ data.userId);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.isLoginFailed = true;
        });
  }
}

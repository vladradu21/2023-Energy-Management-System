import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginData } from 'src/app/model/LoginData';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  loginData: LoginData = new LoginData();

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private userService: UserService
              ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser() {
    this.loginData.username = this.loginForm.value.username;
    this.loginData.password = this.loginForm.value.password;

    this.loginService.loginUser(this.loginData).subscribe(
      (response: any) => {

        console.log(response);
        localStorage.setItem('tokenLogin', JSON.stringify(response.token));
        localStorage.setItem('username', response.user.username);

        if (response.user.authorities.some((authority: { authority: string; }) => authority.authority === "USER")) {
          this.router.navigate(['/user']);
        }

        if (response.user.authorities.some((authority: { authority: string; }) => authority.authority === "ADMIN")) {
          this.router.navigate(['/admin']);
        }
      },(error) => {
        error.status === 409 ? alert('Invalid username or password') : alert('Server error');
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';
import { RegisterService } from 'src/app/service/register.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    })
  }

  registerNow() {
    var user: any = {};
    user.username = this.registerForm.value.username;
    user.password = this.registerForm.value.password;
    user.email = this.registerForm.value.email;
    user.firstname = this.registerForm.value.firstname;
    user.lastname = this.registerForm.value.lastname;

    this.createAccount(user);
    this.router.navigate(['login']);
  }

  createAccount(user: User) {
    this.registerService.registerUser(user).subscribe(
      (data) => {
        console.log(data);
        this.addUserToDeviceMicroservice(user.username || this.registerForm.value.username);
      }
    )
  }

  addUserToDeviceMicroservice(username: string) {
    this.userService.addUserDeviceMicroservice(username).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }
}

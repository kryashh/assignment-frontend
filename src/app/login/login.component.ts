import { Router } from '@angular/router';
import { LoginServiceService } from './../login-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', []],
      phoneNumber: ['', []],
      role: []
    });
  }

  login(): void {
    const user = {
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.password,
      'address': this.loginForm.value.address,
      'phoneNumber': this.loginForm.value.phoneNumber,
      'role': this.loginForm.value.role
    }
    console.log(user);
    this.loginService.login(user).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.setItem('ROLE', this.loginForm.value.role);
        sessionStorage.setItem('LoggedIn', 'Yes');
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  changeRole(e): void {

  }

}

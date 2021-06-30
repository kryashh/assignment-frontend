import { LoginServiceService } from './../login-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: any;
  isRoleAdmin: boolean;
  loginForm: FormGroup;
  addUser: boolean = false;

  constructor(private loginService: LoginServiceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllUsers();
    if (sessionStorage.getItem('ROLE') === 'Admin') {
      this.isRoleAdmin = true;
      this.createForm();
    }
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

  getAllUsers(): void {
    this.loginService.getAllUsers().subscribe(
      (res) => { this.users = res.data },
      (err) => {
        console.log(err);
      }
    )
  }

  addUsers(): void {
    this.addUser = true;
  }

  submit(): void {
    const user = {
      'username': this.loginForm.value.username,
      'password': this.loginForm.value.password,
      'address': this.loginForm.value.address,
      'phoneNumber': this.loginForm.value.phoneNumber,
      'role': this.loginForm.value.role
    }
    console.log(user);
    this.loginService.addUser(user).subscribe(
      (res) => {
        console.log(res);
        this.getAllUsers();
      },
      (err) => {
        console.log(err);
      }
    )
  }

}

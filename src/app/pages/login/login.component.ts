import { Component, OnInit, OnDestroy } from '@angular/core';
import { AjaxService } from 'src/app/common/service/ajax-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/common/service/auth-service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup: FormGroup
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    console.log('login...')
    this.auth.login(this.formGroup.value)
  }
}

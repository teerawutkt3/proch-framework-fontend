import { Component, OnInit, OnDestroy } from '@angular/core';
import { AjaxService } from 'src/app/common/service/ajax-service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup: FormGroup
  constructor(
    private ajax: AjaxService,
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
    console.log('formGroup: ', this.formGroup.value)
  }
}

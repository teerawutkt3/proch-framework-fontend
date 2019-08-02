import { Component, OnInit } from '@angular/core';
import { AjaxService } from 'src/app/common/service/ajax-service';
import { ResponseData } from 'src/app/common/model/response-data.model';
import { UserModel } from '../user-model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userModelList: UserModel[];
  constructor(
    private ajax: AjaxService
  ) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.getUserAll();
  }

  getUserAll() {
    this.ajax.doGet('/user/user-all').subscribe((res: ResponseData<UserModel[]>) => {
      console.log('res.data', res.data)
      this.userModelList = res.data;
    })
  }
}

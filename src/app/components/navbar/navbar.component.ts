import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/service/auth-service';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { UserProflie } from 'src/app/common/model/user-profile.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  username: string;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private auth: AuthService,
    private store: Store<any>
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getUserProfile();
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  async getUserProfile() {
    await this.auth.getUserProfile();    
    await this.store.select(state => state.user).subscribe((res:UserProflie) => {
        this.username = res.username;
    })
  }
  logout() {
    this.auth.logout();
  }

}

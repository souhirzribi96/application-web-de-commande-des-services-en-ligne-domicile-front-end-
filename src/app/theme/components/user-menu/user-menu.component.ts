import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TokenStorageService} from '../../../pages/_services/token-storage.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {

  currentUser: any;
  a=':';
  b=';';
  c=',';
  img: string;
  constructor(private token: TokenStorageService) { }
  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.roles);
    this.img=[this.currentUser.data.slice(0,4),this.a,this.currentUser.data.slice(4,14),this.b,this.currentUser.data.slice(14,20),this.c,this.currentUser.data.slice(20)].join('');
    console.log("img",this.img);
  }

}

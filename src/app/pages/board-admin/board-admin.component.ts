import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from '../../theme/components/menu/menu.service';
import {UserService} from '../_services/user.service';
import {TutorialService} from '../_services/tutorial.service';
 
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardAdminComponent implements OnInit {
    content : any;
    constructor(private userService: UserService) { }
    ngOnInit() {
        this.userService.getAdminBoard().subscribe(
            data => {
                this.content = data;
                console.log(data);
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
    }
}

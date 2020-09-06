import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from '../../theme/components/menu/menu.service';
import {UserService} from '../_services/user.service';
 
@Component({
  selector: 'app-client-admin',
  templateUrl: './board-client.component.html',
  styleUrls: ['./board-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardClientComponent implements OnInit {
    content :any;
    constructor(private userService: UserService) { }
    ngOnInit() {
        this.userService.getModerator().subscribe(
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

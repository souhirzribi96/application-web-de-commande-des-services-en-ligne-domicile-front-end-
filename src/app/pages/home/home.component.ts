import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from '../../theme/components/menu/menu.service';
import { UserService } from '../_services/user.service';
import {CategorieService} from '../_services/categorie.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    content: string;
    constructor(private userService: UserService,
                private categorieService: CategorieService,
                private tokenStorageService: TokenStorageService) { }

    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;
    tutorials: any;
    currentcat = null;
    currentIndex = -1;
    title = '';
    ngOnInit() {
        this.userService.getPublicContent().subscribe(
            data => {
                this.content = data;
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
        this.retrieveTutorials();
        /*rollllllllllllllllle*/
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            /*
                        console.log(user);
            */
            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_ETUDIANT');
            // console.log( this.roles);
            this.username = user.username;
        }
    }
    retrieveTutorials() {
        this.categorieService.getAll()
            .subscribe(
                data => {
                    this.tutorials = data;
                    console.log("ssssss : ", data);
                },
                error => {
                    console.log(error);
                });
    }
    setActiveTutorial(tutorial, index) {
        this.currentcat = tutorial;
        this.currentIndex = index;
        console.log(this.currentIndex );
    }
    getTutorial(id) {
        this.categorieService.get(id)
            .subscribe(
                data => {
                    this.currentcat = data;
                    console.log(data);
                },
                error => {
                    console.log(error);
                });
    }
}

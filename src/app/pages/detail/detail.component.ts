import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from '../../theme/components/menu/menu.service';
import {UserService} from '../_services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TutorialService} from '../_services/tutorial.service';
import {FormControl, Validators} from '@angular/forms';
import {TokenStorageService} from '../_services/token-storage.service';
import {NoteService} from '../_services/note.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailComponent implements OnInit {
    user = null;
    message = '';
    isLoggedIn = false;
    username: string;
    showUserBoard = false
    private roles: string[];
    notes: any;
    note = {
        num: '',
        noter: '',
        id_etd: '',
        id_user: '',
    };
    idetd:any;
    userr ;
    submitted = false;
    somme = 0;
    moy=0
    a=':';
    b=';';
    c=',';
    liste: Array<any> = [];
    image: string;
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private tokenStorageService: TokenStorageService,
        private noteService: NoteService ) { }

    ngOnInit() {
        this.message = '';
        this.getTutorial(this.route.snapshot.paramMap.get('id'));
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
             this.userr = this.tokenStorageService.getUser();
            this.roles = this.userr.roles;
            this.showUserBoard = this.roles.includes('ROLE_USER');
        }
        this.noteService.getAll(this.idetd)
            .subscribe(
                data => {
                    this.notes = data;
                    this.somme=0;
                    this.moy=0
                    console.log('hohohoh',this.notes);
                    for(var i=0;i<this.notes.length;i++) {
                        if(this.notes[i].id_etd==this.idetd)
                            this.liste.push(this.notes[i]);
                    }
                    for(var i=0;i<this.liste.length;i++) {
                        this.somme =this.somme + this.notes[i].num;
                    }
                    console.log('haaaaa',this.somme);
                    this.moy=this.somme/this.liste.length;
                    console.log('moy',this.moy);
                },
                error => {
                    console.log(error);
                });
    }

    getTutorial(id) {
        this.userService.get(id)
            .subscribe(
                data => {
                    this.user = data;
                    console.log('zribia',data);
                    this.idetd=this.user.id;
                    this.image=[this.user.data.slice(0,4),this.a,this.user.data.slice(4,14),this.b,this.user.data.slice(14,20),this.c,this.user.data.slice(20)].join('');
                    console.log("img",this.image);
                },
                error => {
                    console.log(error);
                });
    }
    public ctrlFormIntegration = new FormControl(null, Validators.required);
     saveTutorial() {
        const data = {
            num: this.note.num,
            noter: this.note.noter,
            id_etd: this.user.id,
            id_user: this.userr.id,
        };
        this.noteService.create(data)
            .subscribe(
                response => {
                    console.log(response);
                },
                error => {
                    console.log(error);
                });
        this.submitted = true;
    }

}

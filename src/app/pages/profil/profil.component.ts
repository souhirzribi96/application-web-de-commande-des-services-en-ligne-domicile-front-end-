import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from '../../theme/components/menu/menu.service';
import { UserService } from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {NoteService} from '../_services/note.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfilComponent implements OnInit {
    currentUser: any;
    message = '';
    liste: Array<any> = [];

    somme = 0;
    moy=0
    notes:any;
    a=':';
    b=';';
    c=',';
    img: string;

    constructor(private token: TokenStorageService, private noteService: NoteService,private userService: UserService ) { }
    ngOnInit() {
        this.currentUser = this.token.getUser();
        console.log("user",this.currentUser.data);
        this.img=[this.currentUser.data.slice(0,4),this.a,this.currentUser.data.slice(4,14),this.b,this.currentUser.data.slice(14,20),this.c,this.currentUser.data.slice(20)].join('');
        console.log("img",this.img);
        this.noteService.getAll(this.currentUser.id)
            .subscribe(
                data => {
                    this.somme=0;
                    this.moy =0;
                    this.notes = data;
                    console.log('hohohoh',this.notes);
                    this.liste=[];
                    this.somme=0;
                    this.moy=0;
                    for(var i=0;i<this.notes.length;i++) {
                        if(this.notes[i].id_etd==this.currentUser.id)
                            this.liste.push(this.notes[i]);
                    }

                    for(var i=0;i<this.liste.length;i++) {
                        this.somme =this.somme + this.notes[i].num;
                    }
                    console.log('haaaaa',this.somme);
                    this.moy=this.somme/this.liste.length;
                    console.log('moy',this.moy);
                    this.ctrlFormIntegration.disable();
                },
                error => {
                    console.log(error);
                });
    }
    user:null
    public ctrlFormIntegration = new FormControl(null, Validators.required);
    updateTutorial() {
        this.userService.update(this.currentUser.id, this.currentUser)
            .subscribe(
                response => {
                    console.log(this.currentUser);
                    this.message = 'The user was updated successfully!';

                },
                error => {
                    console.log(error);
                });
    }
}

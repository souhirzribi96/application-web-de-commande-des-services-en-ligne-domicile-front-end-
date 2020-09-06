import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from '../../theme/components/menu/menu.service';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {NoteService} from '../_services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-admin',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BoardUserComponent implements OnInit {
    content: any ;
    private roles: string[];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username: string;
    listeuserser: Array<any> = []
    liste: Array<any> = []
    fin: Array<any> = []
    notes: any;
    noteetd: Array<any> = []
    serv = null;
    ind = -1;
    constructor(private userService: UserService,
                private tokenStorageService: TokenStorageService,
                private noteService: NoteService,
                private router: Router,
                private toastr: ToastrService,
                public modalService: NgbModal,
    ) { }
    ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_ETUDIANT');
            this.username = user.username;
            this.getAllUser();
        }
    }
    getnote(id) {
        this.noteService.getAll(id)
            .subscribe(
                data => {
                    this.notes = data;
                    console.log('hohohoh', this.notes);
                    for (var i = 0; i < this.notes.length;i++)
                    this.noteetd.push(this.notes[i].noter);
                    console.log('noteeeee fiha',this.noteetd);
                },
                error => {
                    console.log(error);
                });
    }

    /*admiiiiiiiiiiiiiiiiiiiiiiiiin*/
    getAllUser() {
        this.userService.getAdminBoard().subscribe(
            data => {
                this.content = data;
                // console.log('hohohoh', this.content);
                for (var i = 0; i < this.content.length; i++) {
                    if (this.content[i].id_role==2)
                    (this.getnote(this.content[i].id));
                }
                    // console.log(this.content);
                this.listeuserser = this.content;
                console.log('kakakak', this.listeuserser);
                for (var i = 0; i < this.listeuserser.length; i++){
                    for (var j=0; j< this.listeuserser[i].tutorials.length;j++) {
                        if(this.listeuserser[i].tutorials[j].etat==='Validé'||this.listeuserser[i].tutorials[j].etat==='Prise')
                        this.liste.push(this.listeuserser[i].tutorials[j]);
                    }
                }
                console.log('servicesssss',this.liste);
                for (var i = 0; i < this.listeuserser.length; i++){
                for(var j=0; j<this.liste.length;j++){
                    if(this.listeuserser[i].id==this.liste[j].id_user)
                        this.fin.push(this.listeuserser[i]);
                }
                }
                    console.log('souhiraa',this.fin);
            },
            err => {
                // this.content = JSON.parse(err.error).message;
            }
        );
    }
    currentTutorial = null;
    currentIndex = -1;

    deleteTutorial(tutorial, index) {
        this.currentTutorial = tutorial;
        this.currentIndex = index;
        this.userService.delete(this.currentTutorial.id)
            .subscribe(
                response => {
                    console.log(response);
                    // this.router.navigate(['/pages/service']);
                    this.toastr.error('Done', 'Etudiant supprimer!' );

                },
                error => {
                    console.log(error);
                });
    }

    setActive(tutorial, index) {
        this.serv = tutorial;
        this.ind = index;
        console.log(this.serv);
    }

    setActiveTutorial(tutorial, index,modalContent) {
        this.modalRef = this.modalService.open(modalContent, {  size: 'lg'});
        this.serv = tutorial;
        this.ind = index;
        console.log(this.serv);
    }
    public modalRef: NgbModalRef;
    public closeModal(){
        this.modalRef.close();
    }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MessagesService} from './messages.service';
import {UserService} from '../../../pages/_services/user.service';
import {TokenStorageService} from '../../../pages/_services/token-storage.service';
import {TutorialService} from '../../../pages/_services/tutorial.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MessagesService ]
})
export class MessagesComponent implements OnInit {
  public messages:Array<Object>;
  public files:Array<Object>;
  public meetings:Array<Object>;

    content : any;
    listeuserser: Array<any> = []
    liste: Array<any> = []
    etdfin: Array<any> = []
    etd: Array<any> = []
    use: Array<any> = []
    title = '';
    tutorials: any;
    isLoggedIn = false;
    user: any;

    private roles: string[];
    showAdminBoard = false;
    showModeratorBoard = false;
    showUserBoard = false
    username: string;

    listeservice: Array<any> = []
    listeservicevalide: Array<any> = []

    servicess: Array<any> = []

    constructor(private messagesService:MessagesService, private userService: UserService,
              private tutorialService: TutorialService,
     private tokenStorageService: TokenStorageService) {
    this.messages = messagesService.getMessages();
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
      this.findaddl();
  }

  ngOnInit() {
    jQuery('#messagesTabs').on('click', '.nav-item a', function(){
        setTimeout(() => jQuery(this).closest('.dropdown').addClass('show')); 
    })
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn) {
          this.user = this.tokenStorageService.getUser();
          console.log("userrr",this.user);
          this.roles = this.user.roles;
          this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.showModeratorBoard = this.roles.includes('ROLE_ETUDIANT');
          this.showUserBoard = this.roles.includes('ROLE_USER');
          console.log(this.showUserBoard);
          this.username = this.user.username;
      }
     this.GetEtdServ();
      this.retrieveTutorials();
  }
  findaddl(){
    this.userService.getUserBoard().subscribe(
        data => {
          this.content = data;
          console.log("serv",this.content);
          this.listeuserser = this.content;
          for (var i = 0; i < this.listeuserser.length; i++){
            for(var j=0; j< this.listeuserser[i].serv.length;j++) {
                if(this.listeuserser[i].serv[j].etat==='Prise' && this.listeuserser[i].serv[j].id_user==this.user.id )
                this.liste.push(this.listeuserser[i].serv[j]);
              console.log('reserver',this.liste[j]);
            }
          }
            for (var i = 0; i < this.listeuserser.length; i++){
            for(var j=0;j<this.liste.length;j++){
            if(this.listeuserser[i].id==this.liste[j].id_etd){
                this.etd.push(this.listeuserser[i]);
                // console.log('etd',this.listeuserser[i]);
            }
                for(var k=1;k<this.etd.length;k++){
                    if(this.etdfin.indexOf(this.etd[k]) == -1)
                        this.etdfin.push(this.etd[k]);
                    // console.log("aaaa",this.etdfin);
                }
            }
            }
            },
        err => {
          // this.content = JSON.parse(err.error).message;
        }
    );
  }
  GetEtdServ(){
      this.userService.getModerator().subscribe(
          data => {
              this.content = data;
              console.log('aaa',this.content);
              this.listeservice=this.content.tutorials;
              // console.log(this.listeservice);
              for (var i = 0; i < this.listeservice.length; i++){
                  if (this.listeservice[i].etat==='Validé')
                      this.listeservicevalide.push(this.listeservice[i]);
              }
              console.log(this.listeservicevalide);
          },
          err => {
              // this.content = JSON.parse(err.error).message;
          }
      );
  }

    retrieveTutorials() {
        this.tutorialService.getAll()
            .subscribe(
                data => {
                    this.tutorials = data;
                    console.log('dataa', data);
                    for (var i = 0; i < this.tutorials.length; i++) {
                        if (this.tutorials[i].id_etd == this.user.id && this.tutorials[i].etat == "Prise")
                            this.servicess.push(this.tutorials[i]);
                        console.log('servicet', this.servicess[i]);
                    }
                    // for (var i = 0; i < this.servicess.length; i++) {
                    //     for (var j = 0; j < this.listeuserser.length; j++) {
                    //         if (this.listeuserser[j].id === this.servicess[j].id_user) {
                    //             this.use.push(this.servicess[j]);
                    //             console.log('hahahaha', this.use);
                    //         }
                    //     }
                    // }
                },
                error => {
                    console.log(error);
                });
    }

}

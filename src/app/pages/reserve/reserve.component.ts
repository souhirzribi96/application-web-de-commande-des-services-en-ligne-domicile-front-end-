import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { MenuService } from '../../theme/components/menu/menu.service';
import { UserService } from '../_services/user.service';
import {CategorieService} from '../_services/categorie.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {TutorialService} from '../_services/tutorial.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-reserve',
    templateUrl: './reserve.component.html',
    styleUrls: ['./reserve.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ReserveComponent implements OnInit {
    content : any;
    listeuserser: Array<any> = []
    liste: Array<any> = []
    title = '';
    tutorials: any;
    isLoggedIn = false;
    listefin: Array<any> = []
    currentIndex = -1;
    user: any;
    l: any;
    constructor(private userService: UserService,
                private tutorialService: TutorialService,
                private tokenStorageService: TokenStorageService,
                private toastr: ToastrService) { this.findaddl();}
    ngOnInit() {
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            this.user = this.tokenStorageService.getUser();
            console.log("userrr",this.user);
        }
    }
    wishList(){
        var list = document.getElementById("toast");
        list.classList.add("show");
        list.innerHTML = '<i class="far fa-heart wish"></i> Product added to List';
        setTimeout(function(){
            list.classList.remove("show");
        },3000);
    }

    addCart(){
        var cart = document.getElementById("toast-cart");
        cart.classList.add("show");
        cart.innerHTML = '<i class="fas fa-shopping-cart cart"></i> Product added to cart';
        setTimeout(function(){
            cart.classList.remove("show");
        }, 3000);
    }
    findaddl(){
        this.userService.getUserBoard().subscribe(
            data => {
                this.content = data;
                console.log("userr",this.content);
                    this.listeuserser = this.content;
                for (var i = 0; i < this.listeuserser.length; i++){
                    for(var j=0; j< this.listeuserser[i].tutorials.length;j++) {
                        if(this.listeuserser[i].tutorials[j].etat==='Validé')
                        this.liste.push(this.listeuserser[i].tutorials[j]);
                        // console.log('lonheur',this.listeuserser[i].tutorials.length);
                    }}
                console.log('les service',this.liste);

                /*table distincit el s7i7aaa*/
                // const l=this.liste.length;
                // console.log("longeur",l/2)
                // for(var k=4;k<this.liste.length;k++){
                //     if(this.listefin.indexOf(this.liste[k]) == -1)
                //         this.listefin.push(this.liste[k]);
                //     console.log("finn",this.listefin);
                // }
                        },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
    }

    refreshList() {
        this.liste = null;
        this.currentIndex = -1;

    }
    /*fiiiiiiiiiiiiiiiiiiiiiiiiiiiiind*/
    searchTitle() {
        this.tutorialService.findByTitle(this.title)
            .subscribe(
                data => {
                    this.tutorials = data;
                    console.log("recherche",this.tutorials ,this.title);
                    this.refreshList();
                    this.liste=this.tutorials;
                    console.log("recherche222222",this.tutorials);
                },
                error => {
                    console.log(error);
                });
    }
    currentTutorial1 = null;
    setActiveTutorial(tutorial, index) {
        this.currentTutorial1 = tutorial;
        this.currentIndex = index;
        console.log(this.currentIndex );
    }
    updateetat(tutorial, index) {
        const data = {
            etat:"Prise"
        };
        this.currentTutorial1 = tutorial;
        this.currentIndex = index;
        this.tutorialService.update(this.currentTutorial1.id, data)
            .subscribe(
                response => {
                    this.currentTutorial1.etat = data;
                    console.log("newww",this.currentTutorial1.etat );
                    const data1 = {
                        id_user: this.user.id,
                    };
                    this.tutorialService.update(this.currentTutorial1.id,data1)
                        .subscribe(
                            response => {
                                this.currentTutorial1.id_user = data1;
                                console.log("userrr",this.currentTutorial1.id_user );
                                console.log("service",this.currentTutorial1 );
                                window.location.reload();
                                this.toastr.success('Réservation Done', 'Félicitation!' );

                            },
                        );
                },
                error => {
                    console.log(error);
                });
    }
}

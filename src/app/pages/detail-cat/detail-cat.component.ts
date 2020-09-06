import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TutorialService} from '../_services/tutorial.service';
import {CategorieService} from '../_services/categorie.service';
import {FormGroup} from '@angular/forms';
import {NgbModal, NgbModalRef , } from '@ng-bootstrap/ng-bootstrap';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Injectable} from '@angular/core';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {UserService} from '../_services/user.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ToastrService} from 'ngx-toastr';

const pad = (i: number): string => i < 10 ? `0${i}` : `${i}`;

/**************************************************************************************************************lele date + w9et */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

    fromModel(value: string| null): NgbTimeStruct | null {
        if (!value) {
            return null;
        }
        const split = value.split(':');
        return {
            hour: parseInt(split[0], 10),
            minute: parseInt(split[1], 10),
            second: parseInt(split[2], 10)
        };
    }

    toModel(time: NgbTimeStruct | null): string | null {
        return time != null ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}` : null;
    }
}

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

    readonly DELIMITER = '-';

    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            let date = value.split(this.DELIMITER);
            return {
                day : parseInt(date[0], 10),
                month : parseInt(date[1], 10),
                year : parseInt(date[2], 10)
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
    }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            let date = value.split(this.DELIMITER);
            return {
                day : parseInt(date[0], 10),
                month : parseInt(date[1], 10),
                year : parseInt(date[2], 10)
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }
}
/**************************************************************************************************************lele date + w9et */
@Component({
    selector: 'app-detail-cat',
    templateUrl: './detail-cat.component.html',
    styleUrls: ['./detail-cat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NgbDateAdapter, useClass: CustomAdapter},
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
        {provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}
    ]
})
export class DetailCatComponent implements OnInit {
    currentcat = null;
    servi=null;
    message = '';
    content=null;
    contentt=null;
    service=null;
    list: Array<any> = [];
    listeee: Array<any> = [];
    listaa: Array<any> = [];
    lis: Array<any> = [];
    etat: Array<any> = [];

    a=':';
    b=';';
    c=',';
    img: string;

    private roles: string[];
    isLoggedIn = false;
    showModeratorBoard = false;
    showAdminBoard = false;
    username: string;

    constructor(private catergorieservice: CategorieService,
                private route: ActivatedRoute, private router: Router,
                private tutorialService: TutorialService,
                public modalService: NgbModal,
                private ngbCalendar: NgbCalendar,
                private dateAdapter: NgbDateAdapter<string>,
                private userService: UserService,
                private tokenStorageService: TokenStorageService,
private toastr: ToastrService) {}

    ngOnInit() {
        /*lel id mte3 user w role*/
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            this.showModeratorBoard = this.roles.includes('ROLE_ETUDIANT');
            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.username = user.username;
        }
        this.message = '';
        this.getTutorial(this.route.snapshot.paramMap.get('id'));
        this.retrieveTutorials();
        this.getAllservice(this.route.snapshot.paramMap.get('id'));
    }
    /*get mt3 admin******************************************************************************************************************/
    getAllservice(id) {
        this.catergorieservice.get(id)
            .subscribe(
                data => {
                    this.currentcat = data;
                    this.servi = this.currentcat.tutorials;
                    console.log("catCat",this.servi);
                    for (var a = 0; a < this.servi.length; a++) {
                        if (this.servi[a].etat=='Non validé')
                            this.etat.push(this.servi[a]);
                    }
                        this.userService.getAdminBoard().subscribe(
                        data => {
                            this.contentt = data;
                            console.log("sss",data);
                            for (var a = 0; a < this.currentcat.tutorials.length; a++) {
                                for(var b=0 ; b<this.contentt.length; b++)  {
                                    if(this.currentcat.tutorials[a].id_etd===this.contentt[b].id)
                                        this.listeee.push(this.contentt[b]);
                                }}
                            console.log("uuuuuuuuuuuuuuserrr",this.listeee);
                            for(var k=0;k<this.listeee.length;k++){
                                if(this.listaa.indexOf(this.listeee[k]) == -1)
                                    this.listaa.push(this.listeee[k]);
                            }
                            console.log('taille',this.listaa.length);
                            for(var k=0;k<this.listaa.length;k++){
                                this.listaa[k].data=this.img=[this.listaa[k].data.slice(0,4),this.a,this.listaa[k].data.slice(4,14),this.b,this.listaa[k].data.slice(14,20),this.c,this.listaa[k].data.slice(20)].join('');
                                console.log("taswiraa ",this.listaa);

                            }
                        },
                        err => {
                            // this.contentt = JSON.parse(err.error).message;
                        }
                    );
                },
                error => {
                    console.log(error);
                });
    }
    /*get mt3 etudient******************************************************************************************************************/
    getTutorial(id) {
        this.catergorieservice.get(id)
            .subscribe(
                data => {
                    this.currentcat = data;
                    console.log('categorie :',data);
                    this.userService.getModerator().subscribe(
                        data => {
                            this.content = data;
                            console.log('sousou', this.content.id);
                            for (var i = 0; i < this.content.tutorials.length; i++) {
                                if (this.currentcat.name === this.content.tutorials[i].category.name) {
                                    this.service = this.content.tutorials[i];
                                    console.log(this.service);
                                    this.list.push(this.service);
                                }
                                console.log('yayay',this.list);
                            }
                            for (var i = 0; i < this.list.length; i++) {
                                if (this.list[i].etat =='Non validé')
                                    this.lis.push(this.list[i]);
                                console.log('that',this.lis);

                            }
                        } )
                },
                error => {
                    console.log(error);
                });
    }
    /*ajouterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr*/
    tutorial = {
        libelle: '',
        date: '',
        heure_deb: '',
        heure_fin: '',
        prix: '',
        etat: '',
        description: ''
    };
    submitted = false;
    is = false;

    saveTutorial() {
        const data = {
            libelle: this.tutorial.libelle,
            date: this.tutorial.date,
            heure_deb: this.tutorial.heure_deb,
            heure_fin: this.tutorial.heure_fin,
            prix: this.tutorial.prix,
            etat: 'Non validé',
            description: this.tutorial.description,
            categorieCode: this.currentcat.id,
            id_etd: this.content.id,
        };
        this.tutorialService.create(data)
            .subscribe(
                response => {
                    console.log("sav",response);
                    this.toastr.info('Votre publication est en attente de validation', 'Bonjour M./Mme/Mlle!' );
                    this.retrieveTutorials();
                    this.currentTutorial = null;
                    this.currentIndex = -1;
this.is=false;
                    // window.location.reload();

                },
                error => {
                    console.log(error);
                    this.is=true;
                });
        this.submitted = true;
        // this.router.navigate(['/pages/categories/',this.currentcat.id]);

    }
    newTutorial() {
        this.submitted = false;
        this.tutorial = {
            libelle: '',
            date: '',
            heure_deb: '',
            heure_fin: '',
            prix: '',
            etat: '',
            description: ''
        };
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
        // this.router.navigate(['/pages/categories/',this.currentcat.id]);
    }
    /*ajouterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr*/
    tutorials: any;
    currentTutorial = null;
    currentIndex = -1;
    retrieveTutorials() {
        this.tutorialService.getAll()
            .subscribe(
                data => {
                    this.tutorials = data;
                },
                error => {
                    console.log(error);
                });
    }
    refreshList() {
        this.retrieveTutorials();
        this.currentTutorial = null;
        this.currentIndex = -1;
    }

    // removeAllTutorials() {
    //     this.servi.deleteAll()
    //         .subscribe(
    //             response => {
    //                 console.log(response);
    //                 this.retrieveTutorials();
    //             },
    //             error => {
    //                 console.log(error);
    //             });
    // }
    public modalRef: NgbModalRef;
    public form:FormGroup;
    public openModal(modalContent) {
        this.modalRef = this.modalService.open(modalContent, {  size: 'lg'});}


    public closeModal(){
        this.modalRef.close();
    }
    public type:string = 'grid';

    public toggle(type){
        this.type = type;
    }
    //Meridian
    public timeMeridian = { hour: 15, minute: 20, second: 25 };
    public meridian: boolean = true;
    get today() {
        return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
    }
    /*listtttttttttttttt*/
    public p:any;
    public openMenuAssign(event){
        let parent = event.target.parentNode;
        while (parent){
            parent = parent.parentNode;
            if(parent.classList.contains('content')){
                parent.classList.add('flipped');
                parent.parentNode.parentNode.classList.add('z-index-1');
                break;
            }
        }
    }
    public closeMenuAssign(event){
        let parent = event.target.parentNode;
        while (parent){
            parent = parent.parentNode;
            if(parent.classList.contains('content')){
                parent.classList.remove('flipped');
                parent.parentNode.parentNode.classList.remove('z-index-1');
                break;
            }
        }
    }
    public menuSelectOptions: IMultiSelectOption[] = [];
    public menuSelectTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'menu item selected',
        checkedPlural: 'menu items selected',
        searchPlaceholder: 'Find menu item...',
        defaultTitle: 'Select menu items for user',
        allSelected: 'All selected',
    };
    public menuSelectSettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-secondary btn-block',
        dynamicTitleMaxItems: 0,
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true
    };
    currentTutorial1 = null;
    public openM(modal) {
     }
    setActiveTutorial(tutorial, index,modal) {
        this.currentTutorial1 = tutorial;
        this.currentIndex = index;
        console.log(this.currentTutorial1);
        this.modalRef = this.modalService.open(modal, {  size: 'lg'});
    }
    updateetat(tutorial, index) {
        const data = {
            etat:"Validé"
        };
        this.currentTutorial1 = tutorial;
        this.currentIndex = index;
        this.tutorialService.update(this.currentTutorial1.id, data)
            .subscribe(
                response => {
                    this.currentTutorial1.etat = data;
                    console.log("newww",this.currentTutorial1.etat );
                    this.toastr.success('Done', 'Publication accepter ' );
                    // window.location.reload();


                },
                error => {
                    console.log(error);
                });
    }
    deleteTutorial(tutorial, index) {
        this.currentTutorial1 = tutorial;
        this.currentIndex = index;
        this.tutorialService.delete(this.currentTutorial1.id)
            .subscribe(
                response => {
                    console.log(response);
                    // this.router.navigate(['/pages/categories/',this.currentcat.id]);
                    Error
                    this.toastr.error('Done', 'Publication supprimer ' );
                    // window.location.reload();

                },
                error => {
                    console.log(error);
                    // this.router.navigate(['/pages/categories/',this.currentcat.id]);
                });
    }
    /*EDIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIT*/

    updateTutorial(tutorial, index) {
        this.currentTutorial1 = tutorial;
        this.currentIndex = index;
        this.modalRef.close();
        this.tutorialService.update(this.currentTutorial1.id, this.currentTutorial1)
            .subscribe(
                response => {
                    console.log(response);
                    this.message = 'The tutorial was updated successfully!';
                },
                error => {
                    console.log(error);
                });
    }


}


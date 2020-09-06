import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {FormControl, Validators,} from '@angular/forms';
import {
    NgbCalendar,
    NgbDateAdapter,
    NgbDateStruct,
    NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

    readonly DELIMITER = '-';

    fromModel(value: string): NgbDateStruct {
        let result: NgbDateStruct = null;
        if (value) {
            let date = value.split(this.DELIMITER);
            result = {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return result;
    }

    toModel(date: NgbDateStruct): string {
        let result: string = null;
        if (date) {
            result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
        }
        return result;
    }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct {
        let result: NgbDateStruct = null;
        if (value) {
            let date = value.split(this.DELIMITER);
            result = {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10)
            };
        }
        return result;
    }

    format(date: NgbDateStruct): string {
        let result: string = null;
        if (date) {
            result = date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
        }
        return result;
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        {provide: NgbDateAdapter, useClass: CustomAdapter},
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ]
})
export class LoginComponent implements OnInit {
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage='' ;
    roles: string[] = [];
    public router: Router;
    /*lel sign up*/
    forms: any = {};
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessages = '';
    public ctrlFormIntegration = new FormControl(null, Validators.required);
    public file: any;

    constructor(private authService: AuthService,
                private tokenStorage: TokenStorageService,
                router: Router,
                private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {
        this.router = router;
    }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }

    onSubmit() {
        this.authService.login(this.form).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
                this.reloadPage();
                // console.log('souhiiiiiiiiiiiiiiiiiiiiiiiiiiiir')

                console.log(data);
                console.log(this.roles);
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
                console.log(err);
                console.log('lerrrur',this.errorMessage);

            }
        );
    }

    onSubmits() {
        this.authService.register(this.forms).subscribe(
            data => {
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            err => {
                console.log(err);
                // HttpErrorResponse
                this.errorMessage = err.error.message;
                console.log('ororor',this.errorMessage );
                this.isSignUpFailed = true;
            }
        );
    }

    onSubmitet() {
        this.authService.registeret(this.forms).subscribe(
            data => {
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            err => {
                console.log(err);
                this.errorMessage = err.error.message;
                console.log('ririri',this.errorMessage);

                this.isSignUpFailed = true;
            }
        );
    }
    ngAfterViewInit() {
        document.getElementById('preloader').classList.add('hide');
    }

    reloadPage() {
        window.location.reload();
    }

    moveSliderRight = () => {
        document.getElementById('overlay').classList.remove('overlay-moveHalfLeft');
        document.getElementById('overlayInner').classList.remove('overlayInner-moveHalfRight');
        document.getElementById('signInForm').classList.remove('shiftRight');

        document.getElementById('overlay').classList.add('overlay-moveHalfRight');
        document.getElementById('overlayInner').classList.add('overlayInner-moveHalfLeft');
        document.getElementById('signUpForm').classList.add('shiftLeft');
    };

    moveSliderLeft = () => {
        document.getElementById('overlay').classList.remove('overlay-moveHalfRight');
        document.getElementById('overlayInner').classList.remove('overlayInner-moveHalfLeft');
        document.getElementById('signUpForm').classList.remove('shiftLeft');


        document.getElementById('overlay').classList.add('overlay-moveHalfLeft');
        document.getElementById('overlayInner').classList.add('overlayInner-moveHalfRight');
        document.getElementById('signInForm').classList.add('shiftRight');
    }

    public toggle() {
        if (this.ctrlFormIntegration.disabled) {
            this.ctrlFormIntegration.enable();
        } else {
            this.ctrlFormIntegration.disable();
        }
    }
    public image:any;

    fileChange(input){
        const reader = new FileReader();
        if (input.files.length) {
            const filename = input.files[0];
            reader.onload = () => {
                this.image = reader.result;
                console.log(this.image);
                this.forms.data = this.image;
            }
            reader.readAsDataURL(filename);
        }
    }
    removeImage():void{
        this.image = '';
    }

}

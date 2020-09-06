import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipesModule} from '../../theme/pipes/pipes.module';

import {DetailCatComponent} from './detail-cat.component';

export const routes = [
  { path: '', component: DetailCatComponent, pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule
  ],
  declarations: [
    DetailCatComponent
  ]
})
export class  DetailCatModule { }

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'home', pathMatch:'full' },
            // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }  },
            { path: 'home', loadChildren: './home/home.module#HomeModule', data: { breadcrumb: 'Accueil' }  },
            { path: 'admin', loadChildren: './board-admin/board-admin.module#BoardAdminModule', data: { breadcrumb: 'Admin espace' }  },
            { path: 'service', loadChildren: './board-user/board-user.module#BoardUserModule', data: { breadcrumb: 'User espace' }  },
            { path: 'client', loadChildren: './board-client/board-client.module#BoardClientModule', data: { breadcrumb: 'Client espace' }  },
            { path: 'profil', loadChildren: './profil/profil.module#ProfilModule', data: { breadcrumb: 'Profil' }  },
            { path: 'user/:id', loadChildren: './detail/detail.module#DetailModule', data: { breadcrumb: 'detail' }  },
            { path: 'categories/:id', loadChildren: './detail-cat/detail-cat.module#DetailCatModule', data: { breadcrumb: 'cat' }  },
            { path: 'reserver', loadChildren: './reserve/reserve.module#ReserveModule', data: { breadcrumb: 'Admin espace' }  },

            // { path: 'membership', loadChildren: './membership/membership.module#MembershipModule', data: { breadcrumb: 'Membership' } },
            // { path: 'ui', loadChildren: './ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
            // { path: 'form-elements', loadChildren: './form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
            // { path: 'tools', loadChildren: './tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
            // { path: 'calendar', loadChildren: './calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' } },
            // { path: 'mailbox', loadChildren: './mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            // { path: 'maps', loadChildren: './maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
            // { path: 'dynamic-menu', loadChildren: './dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },
            // { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            // { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

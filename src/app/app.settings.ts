import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'Petit service',
        'app',
        {
            menu: 'vertical', //horizontal , vertical
            menuType: 'mini', //default, compact, mini
            showMenu: true,
            navbarIsFixed: true,
            footerIsFixed: true,
            sidebarIsFixed: true,
            showSideChat: false,
            sideChatIsHoverable: true,
            skin:'light'  //light , dark, blue, green, combined, purple, orange, brown, grey, pink
        }
    )
}

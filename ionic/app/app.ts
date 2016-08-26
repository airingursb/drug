import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Storage, LocalStorage} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

    private rootPage:any;
    local:Storage;

    constructor(private platform:Platform) {
        this.rootPage = TabsPage;
        this.local = new Storage(LocalStorage);

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // this.local.set('host', 'http://localhost:8080/drug/');
            this.local.set('host', 'http://121.42.195.113/drug/');
            // this.local.set('host', 'http://airingursb-drug.daoapp.io/drug/');
            // this.local.set('host', 'http://airing.tunnel.qydev.com/drug/');
            StatusBar.styleDefault();
        });
    }
}

ionicBootstrap(MyApp);

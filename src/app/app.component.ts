import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PeoplePage } from '../pages/people/people';
import { JobsPage } from '../pages/jobs/jobs';
import { DataService } from '../services/data.service';

import { OnboardPage } from '../pages/onboard/onboard';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  tasks: any[] = [];
  profiles: any[] = [];

  constructor(
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public service: DataService,
              public storage: Storage
            ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      
    ];

    this.reset();

    this.service.people$.subscribe(x => {
      this.profiles = x;
      this.setRoot();
    });

    this.service.jobs$.subscribe(x => {
      this.tasks = x;
      this.setRoot();
    });


  }

  setRoot() {
    if(this.tasks.length > 0 && this.profiles.length > 0) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = OnboardPage;
    }
  }

  reset() {
    this.storage.set('onboard', false);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('ios')) {
        this.service.setPlatform('ios');
      } else {
        this.service.setPlatform('android');
      }

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

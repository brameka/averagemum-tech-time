import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PeoplePage } from '../pages/people/people';
import { CreatePeoplePopover } from '../pages/people/create-people-popover';

import { JobsPage } from '../pages/jobs/jobs';
import { CreateJobPopover } from '../pages/jobs/create-job-popover';

import { OnboardPage } from '../pages/onboard/onboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { DataService } from '../services/data.service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PeoplePage,
    CreatePeoplePopover,
    JobsPage,
    CreateJobPopover,
    OnboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PeoplePage,
    CreatePeoplePopover,
    JobsPage,
    CreateJobPopover,
    OnboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

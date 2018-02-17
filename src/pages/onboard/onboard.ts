import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { JobsPage } from '../../pages/jobs/jobs';
import { PeoplePage } from '../../pages/people/people';

@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html'
})
export class OnboardPage {
  profiles: any[] = [];
  tasks: any[] = [];

  constructor(
    private nav: NavController, 
    private service: DataService,
    private modalController: ModalController
  ) {
    this.service.jobs$.subscribe(x => {
      this.tasks = x;
    });

    this.service.people$.subscribe(x => {
      this.profiles = x;
    });

  }

  onboardProfiles() {
    const modal = this.modalController.create(PeoplePage, {
      modal: true
    });
    modal.present();
  }

  onboardTasks() {
    const modal = this.modalController.create(JobsPage, {
      modal: true
    });
    modal.present();
  }

}

import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'; 
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import * as moment from 'moment';

export interface CountdownTimer {
  seconds: number;
  secondsRemaining: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
}

@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class Timer implements OnChanges {
  @Input() person: any;
  @Input() timeInSeconds: number;
  @Input() platform: string;
  @Output() update = new EventEmitter();
  @Input() id: number;

  timer: CountdownTimer;

  subscription: Observable<any>;
  subject = new Subject();
  backgroundActive: boolean = false;

  start: number;
  end: number;

  constructor(
      private localNotifications: LocalNotifications,
      private backgroundMode: BackgroundMode
    ) {
    
  }

  reset() {
    this.update.emit();
    this.subject.next();
  }

  ngOnInit() {
    this.initTimer();
  }

  ngOnChanges() {
    this.initTimer();

  }

  hasFinished() {
    this.timeInSeconds = 0;
    return this.timer.hasFinished;
  }

  sendNotification(date: Date, message: string) {
    // this.localNotifications.schedule({
    //   id: this.id,
    //   text: 'Technology Time for ' + this.person.name + ' is up',
    //   sound: this.platform == 'android'? 'file://sound.mp3': 'file://alarmsound.caf'
    // });

    this.localNotifications.schedule({
      id: this.id,
      text: message,
      at: date,
      led: 'FF0000',
      sound: this.platform == 'android'? 'file://sound.mp3': 'file://alarmsound.caf'
    });


    //alarmsound.caf
    // sound: this.platform == 'android'? 'file://sound.mp3': 'file://beep.caf'
  }

  initTimer() {
    if (!this.timeInSeconds) { this.timeInSeconds = 0; }

    this.timer = <CountdownTimer>{
      seconds: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.start = moment().unix();
    this.end = this.start + this.timer.secondsRemaining;
    const date = moment().add(this.timer.secondsRemaining, 's').toDate();
    const message = 'Technology Time for ' + this.person.name + ' is up';
    this.sendNotification(date, message);
    this.timerTick();
  }

  pauseTimer() {
    this.timer.runTimer = false;
    const date = moment().add(2, 'M').toDate();
    const message = 'Technology Time for ' + this.person.name + ' is up';
    this.sendNotification(date, message);
    
  }

  resumeTimer() {
    this.start = moment().unix();
    this.end = this.start + this.timer.secondsRemaining;
    const date = moment().add(this.timer.secondsRemaining, 's').toDate();
    const message = 'Technology Time for ' + this.person.name + ' is up';
    this.sendNotification(date, message);
    this.timer.runTimer = true;
  }

  timerTick() {

    this.subscription = Observable.timer(0, 1000) 
    this.subscription
        .takeUntil(this.subject)
        .subscribe(t => {

            if (!this.timer.runTimer) { 
              return; 
            }

            const now = moment().unix();
            const remaining = this.end - now;
            this.timer.secondsRemaining = remaining;

            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (remaining < 1) {
              this.hasFinished();
              this.timer.hasFinished = true;
              this.person.seconds = 0;
              this.subject.next();
            }

            // this.timer.secondsRemaining--;
            // this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            // if (this.timer.secondsRemaining == 0) {
            //   this.hasFinished();
            //   this.timer.hasFinished = true;
            //   this.subject.next();
            // }
        });
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  min() {
    const min = 15 * 60;
    if(this.timer.secondsRemaining < min) {
      this.timer.secondsRemaining = 0;
    } else {
      this.timer.secondsRemaining -= (15 * 60);
    }
    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

  add() {
    this.timer.secondsRemaining += (15 * 60);
    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
  }

}

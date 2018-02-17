```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
$ ionic cordova run ios --device --livereload
```

Substitute ios for android if not on a Mac.

https://github.com/ionic-team/ionic/issues/12849#issuecomment-328472880
https://issues.apache.org/jira/browse/CB-12890
https://issues.apache.org/jira/browse/CB-12886
https://github.com/kim3er/ios11-scroll-offset

https://weibomiaopai.com/online-video-downloader/youtube

https://ezgif.com/optimize/ezgif-5-cedce90c59.gif

https://github.com/ionic-team/ionic/issues/12849#issuecomment-328472880

cordova plugin save
	cordova platform rm ios
	cordova platform add ios

***very important***
ionic cordova platform add ios@4.4.0

error in background mode:
1. Open in xcode
2. Navigate to cordovaLib
3. Open AppBackgroundMode.m
4. remove _ from arequiresUserActionForMediaPlayback

https://github.com/katzer/cordova-plugin-background-mode/issues/333

ionic cordova build android --prod --release

ionic cordova build ios --prod --release

ionic cordova plugin add cordova-plugin-ionic-webview --save
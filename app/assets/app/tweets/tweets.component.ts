import { Component, Input, OnInit } from '@angular/core';

declare var Pusher: any;

/*
 * From tutorial : https://blog.pusher.com/revisiting-realtime-angular-2/
 */

@Component({
    selector: 'pz-tweets'
  , templateUrl: 'assets/app/tweets/tweets.component.html'
})
export class PzTweetsComponent implements OnInit {
  @Input()
  term: string;
  tweets: Object[] = [];
  channel: any;

  private pusher: any;

  constructor() {
    this.pusher = new Pusher('9fd1b33fcb36d968145f');
  }

  ngOnInit() {
    this.subscribeToChannel();
  }

  private subscribeToChannel() {
    this.channel = this.pusher.subscribe(btoa(this.term));
    this.channel.bind('new_tweet', (data: any) => { this.newTweet(data); });
  }

  private newTweet(data: Object) {
    this.tweets.push(data);
    if(this.tweets.length > 10) {
      this.tweets.shift();
    }
  }
}

import { Component,  EventEmitter } from '@angular/core';

import {DomSanitizer} from "@angular/platform-browser";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-card',
  templateUrl: 'card.html'
})
export class CardPage {
  ready = false;
  attendants = [];
  cardDirection = "xy";
  cardOverlay: any = {
      like: {
          backgroundColor: '#28e93b'
      },
      dislike: {
          backgroundColor: '#e92828'
      }
  };

  constructor(private sanitizer: DomSanitizer) {

      for (let i = 0; i < 10; i++) {
          this.attendants.push({
              id: i + 1,
              likeEvent: new EventEmitter(),
              destroyEvent: new EventEmitter(),
              asBg: sanitizer.bypassSecurityTrustStyle('url(assets/imgs/andy.jpg)')
          });
      }

      this.ready = true;
  }

  onCardInteract(event) {
    if(event.like == true){
      console.log("like");
    }
    else{
      console.log("dislike")
    }
  }

}

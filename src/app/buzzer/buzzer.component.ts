import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WebSocketService } from '../core/services/web-socket.service';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/User';


@Component({
  selector: 'app-buzzer',
  templateUrl: './buzzer.component.html',
  styleUrls: ['./buzzer.component.css']
})
export class BuzzerComponent implements OnInit {

  private subscription: Subscription;
  public buzzedIn: boolean = false;
  public user: User = <User>{};
  
  constructor(private webSocketService: WebSocketService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe((user) => {
        if (user) {
          this.user = user;
        }
    });

    this.webSocketService.listen('toggleBuzzers').subscribe((lockBoolean: boolean) => {
      this.buzzedIn = lockBoolean;
    });
  }

  ngOnDestroy() {
    // Unsunscribe to prevent memory leaks.
    this.subscription.unsubscribe();
  }

  buzz() {
    if (!this.buzzedIn) {
      this.webSocketService.emit('buzzIn', this.user, (ack) => {
        console.log(ack);
      })
    }
  }
}

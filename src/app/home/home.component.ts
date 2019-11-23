import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router"
import { NgForm } from '@angular/forms';

import { UserService } from '../core/services/user.service';
import { WebSocketService } from '../core/services/web-socket.service';
import { User } from '../core/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('joinForm',  {static: false}) joinForm: NgForm;
  
  constructor(private router: Router, private userService: UserService, private webSocketService: WebSocketService) { }

  ngOnInit() {
  }

  onSubmit() {

    // Pulled from template driven form.
    const user: User = {
      userName: this.joinForm.value.userName,
      gameId: this.joinForm.value.gameId,
    };

    // Update observable shared across components.
    this.userService.setUser(user);

    // Join game room
    this.webSocketService.emit('join', user, (ack) => {
      console.log(ack);
    });
    
    this.router.navigate(['/buzz']);
  }

}

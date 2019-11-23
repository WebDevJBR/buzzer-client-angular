import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    // BehaviorSubject required as buzz component is a later subscriber.
    private user = new BehaviorSubject<any>(<User>{});

    constructor() { }

    setUser(user: User) {
      this.user.next(user);
    }

    getUser(): Observable<any> {
      return this.user.asObservable();
    }
}
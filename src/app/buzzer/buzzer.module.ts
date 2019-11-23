import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuzzerComponent } from './buzzer.component';
import { BuzzerRoutingModule } from './buzzer-routing.module';

@NgModule({
  declarations: [
    BuzzerComponent
  ],
  imports: [
    CommonModule,
    BuzzerRoutingModule
  ]
})
export class BuzzerModule { }

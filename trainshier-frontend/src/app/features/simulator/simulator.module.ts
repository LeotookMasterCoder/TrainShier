import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimulatorComponent } from './simulator/simulator.component';

@NgModule({
  declarations: [
    SimulatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SimulatorComponent
  ]
})
export class SimulatorModule { }

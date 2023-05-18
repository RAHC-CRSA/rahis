import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Select2Module } from 'ng-select2-component';
import { OptionalSelectComponent } from './components/optional-select/optional-select.component';

@NgModule({
  declarations: [OptionalSelectComponent],
  imports: [CommonModule, Select2Module],
  exports: [OptionalSelectComponent],
})
export class SharedModule {}

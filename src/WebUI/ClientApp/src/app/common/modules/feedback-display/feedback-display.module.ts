import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDisplayComponent } from './feedback-display.component';

@NgModule({
    declarations: [FeedbackDisplayComponent],
    imports: [CommonModule],
    exports: [FeedbackDisplayComponent],
})
export class FeedbackDisplayModule {}

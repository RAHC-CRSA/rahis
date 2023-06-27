import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseAlertModule } from '@fuse/components/alert';
import { FeedbackDisplayComponent } from './feedback-display.component';

@NgModule({
    declarations: [FeedbackDisplayComponent],
    imports: [CommonModule, FuseAlertModule],
    exports: [FeedbackDisplayComponent],
})
export class FeedbackDisplayModule {}

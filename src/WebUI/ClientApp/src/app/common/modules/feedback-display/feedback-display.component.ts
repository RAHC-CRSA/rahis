import { Component, EventEmitter, Input, Output } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ServerResponse } from 'app/web-api-client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-feedback-display',
    templateUrl: './feedback-display.component.html',
    styleUrls: ['./feedback-display.component.scss'],
    animations: fuseAnimations,
})
export class FeedbackDisplayComponent {
    @Input('feedback') feedback$: Observable<ServerResponse | null | undefined>;
    @Input() dismissable: boolean;

    @Output() close = new EventEmitter();
}

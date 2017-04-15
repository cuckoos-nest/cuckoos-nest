import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'image-with-thumbnail',
    templateUrl: 'image-with-thumbnail.html',
})
export class ImageWithThumbnailComponent {
    @Input() image: string;
    @Input() thumbnail: string;

    @Output() load = new EventEmitter<any>();
}
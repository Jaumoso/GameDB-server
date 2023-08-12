import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() name: string | undefined;
  @Input() cover: string | undefined;
  @Input() platforms: string | undefined;
  @Input() storefronts: string | undefined;
  @Input() rating: number | undefined;
  @Input() acquisitionPrice: number | undefined;
}

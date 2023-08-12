import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input() name: string | undefined;
  @Input() cover: string | undefined;
  @Input() platforms: string | undefined;
  @Input() storefronts: string | undefined;
  @Input() rating: number | undefined;
  @Input() acquisitionPrice: number | undefined;
}

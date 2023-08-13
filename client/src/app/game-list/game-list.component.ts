import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input() name: string | undefined;
  @Input() cover: string | undefined;
  @Input() releaseDate: Date | undefined;
  @Input() own: boolean | undefined;
  @Input() state: string | undefined;
  @Input() platforms: string[] = [];
  @Input() storefronts: string[] = [];
  @Input() rating: number | undefined;
  @Input() acquisitionPrice: number | undefined;
  @Input() acquisitionDate: Date | undefined;
}

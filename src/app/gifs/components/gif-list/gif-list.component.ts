import { Component, Input } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";
import { TrendingItem } from '../../interfaces/trendingitem.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html'
})
export class GifListComponent {
  // Recibe un array de ítems (será grupo1, grupo2, etc.)
  @Input() items!: TrendingItem[];
}

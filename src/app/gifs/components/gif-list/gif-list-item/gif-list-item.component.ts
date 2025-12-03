import { Component, input } from '@angular/core';
import { TrendingItem } from 'src/app/gifs/interfaces/trendingitem.interface';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html'
})
export class GifListItemComponent {
  gifItem = input.required<TrendingItem>();
}

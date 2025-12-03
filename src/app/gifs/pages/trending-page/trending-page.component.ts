import { Component } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { TrendingItem } from '../../interfaces/trendingitem.interface';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {

  trendingItems: TrendingItem[] = [{
    id: 0,
    class: "h-auto max-w-full rounded-base",
    src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
  }];
  // Filtra los arrays una sola vez.
  grupo1: TrendingItem[] = [];
  grupo2: TrendingItem[] = [];
  grupo3: TrendingItem[] = [];
  grupo4: TrendingItem[] = [];

  constructor() {
    this.generarItems();
    // Filtra los arrays una sola vez.
    this.grupo1 = this.trendingItems.filter(item => item.id <= 3);
    this.grupo2 = this.trendingItems.filter(item => item.id > 3 && item.id <= 6);
    this.grupo3 = this.trendingItems.filter(item => item.id > 6 && item.id <= 9);
    this.grupo4 = this.trendingItems.filter(item => item.id > 9 && item.id <= 11);
  }

  generarItems(cantidadItems: number = 11): void {
    for(let i=1; i<=cantidadItems; i++) {
      this.trendingItems.push({
        id: i,
        class: "h-auto max-w-full rounded-base",
        src: `https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-${i}.jpg`
      });
    }
  }

}

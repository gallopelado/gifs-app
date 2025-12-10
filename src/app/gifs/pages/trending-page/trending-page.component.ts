import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {

  gifService = inject(GifService);

  trendingGifs = signal<Gif[]>([]);

  scrollDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this. scrollDivRef()?.nativeElement;

    console.log(scrollDiv);
  }

}

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

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this. scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({ scrollTotal: scrollTop + clientHeight, scrollTop, clientHeight, scrollHeight });
    const UMBRAL = 300;
    const isAtBottom = scrollTop + clientHeight + UMBRAL >= scrollHeight;
    console.log({ isAtBottom });
  }

}

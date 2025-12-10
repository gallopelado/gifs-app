import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent implements AfterViewInit {

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  trendingGifs = signal<Gif[]>([]);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  // Se ejecuta luego de haberse renderizada la vista
  ngAfterViewInit(): void {
    const scrollDiv = this. scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this. scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({ scrollTotal: scrollTop + clientHeight, scrollTop, clientHeight, scrollHeight });
    const UMBRAL = 300;
    const isAtBottom = scrollTop + clientHeight + UMBRAL >= scrollHeight;

    // Guardar el scrollTop hecho por el usuario
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if ( isAtBottom ) {
      this.gifService.loadTrendingGifs();
    }
  }

}

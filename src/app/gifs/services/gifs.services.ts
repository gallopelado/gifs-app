import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'searchHistory';

const loadFromStorage = () => {
  const history = localStorage.getItem(GIF_KEY);
  return history ? JSON.parse(history) : {};
}

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(false);
  private trendingPage = signal<number>(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for( let i = 0; i < this.trendingGifs().length; i += 3 ) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if ( this.trendingGifsLoading() ) return; // evita llamadas múltiples mientras carga
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20,
      }
    }).subscribe((resp) => {
      console.log(resp);
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      //this.trendingGifs.set(gifs);
      this.trendingGifs.update((currentGifList) => [
        ...currentGifList, ...gifs
      ]);
      this.trendingPage.update(curr => curr + 1);
      this.trendingGifsLoading.set(false);

    });

  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
        offset: 0,
        q: query
      }
    }).pipe(
      // tap no permite hacer transformaciones, pero si efectos secundarios
      //tap( resp => console.log({ tap1: resp }) ),
      map( ({ data }) => data ),
      map( giphyitems => GifMapper.mapGiphyItemsToGifArray(giphyitems) ),

      // TODO: Historial
      tap( items => {
        this.searchHistory.update( history => ({
          ...history,
          [query.toLocaleLowerCase()]: items
        }) );
        //console.log(this.searchHistory())
      }),
    );
    // .subscribe((resp) => {

    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log(gifs);
    //   this.trendingGifs.set(gifs);

    // });
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}

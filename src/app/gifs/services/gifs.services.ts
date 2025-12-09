import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {

    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
        offset: 0,
      }
    }).subscribe((resp) => {

      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);

    });

  }

  searchGifs(query: string) {
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
    );
    // .subscribe((resp) => {

    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
    //   console.log(gifs);
    //   this.trendingGifs.set(gifs);

    // });
  }

}

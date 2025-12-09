import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GIfMapper } from '../mapper/gif.mapper';

@Injectable({providedIn: 'root'})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  searchedGifs = signal<Gif[]>([]);

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

      const gifs = GIfMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);

    });

  }

  searchGif(query: string) {
    this.http.get<GiphyResponse>(`${ environment.giphyUrl }/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 25,
        offset: 0,
        q: query
      }
    }).subscribe((resp) => {
      const gifs = GIfMapper.mapGiphyItemsToGifArray(resp.data);
      this.searchedGifs.set(gifs);
    });
  }
}

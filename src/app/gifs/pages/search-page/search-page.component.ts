import { Component, computed, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html'
})
export default class SearchPageComponent {

  gifService = inject(GifService);

  searchedGifs = this.gifService.searchedGifs;

  private readonly tamanhoDeseado: number = 3;

  gruposDinamicos = computed<Gif[][]>(() => {
    const items = this.searchedGifs();

    if (items.length === 0) {
        return [];
    }

    return this.agruparItems(items, this.tamanhoDeseado);
  });

  agruparItems(items: Gif[], tamanoGrupo: number): Gif[][] {
    const grupos: Gif[][] = [];

    for (let i = 0; i < items.length; i += tamanoGrupo) {
      const grupo = items.slice(i, i + tamanoGrupo);
      grupos.push(grupo);
    }

    return grupos;
  }

  onSearch(query: string) {
    this.gifService.searchGif(query);
  }

}

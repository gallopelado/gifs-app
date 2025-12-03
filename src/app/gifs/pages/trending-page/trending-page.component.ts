import { Component, computed, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.services';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html'
})
export default class TrendingPageComponent {

  //gruposDinamicos: Gif[][] = [];

  gifService = inject(GifService);

  trendingItems = this.gifService.trendingGifs;

  private readonly tamanhoDeseado: number = 3;

  gruposDinamicos = computed<Gif[][]>(() => {
    // Para acceder al valor dentro de la señal, DEBES EJECUTARLA: this.trendingItems()
    const items = this.trendingItems();

    if (items.length === 0) {
        // Devuelve un array vacío si aún no hay datos cargados
        return [];
    }

    // Agrupa y devuelve el resultado
    return this.agruparItems(items, this.tamanhoDeseado);
  });

  // Puedes poner esta función dentro de tu componente o como una utilidad separada.
  agruparItems(items: Gif[], tamanoGrupo: number): Gif[][] {
    const grupos: Gif[][] = [];

    for (let i = 0; i < items.length; i += tamanoGrupo) {
      // El método slice() extrae los elementos desde 'i' hasta 'i + tamanoGrupo'.
      // Esto crea un "trozo" (chunk) del array original.
      const grupo = items.slice(i, i + tamanoGrupo);
      grupos.push(grupo);
    }

    return grupos;
  }

}

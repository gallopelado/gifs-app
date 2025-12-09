import { Component, inject } from '@angular/core';
import { MenuOption } from '../../../interfaces/menuoption.interface';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from 'src/app/gifs/services/gifs.services';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html'
})
export class SideMenuOptionsComponent {

  gifService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label:'Trending',
      subLabel: 'Gifs populares',
      route: '/dashboard/trending'
    },{
      icon: 'fa-solid fa-magnifying-glass',
      label:'Buscador',
      subLabel: 'Buscar Gifs',
      route: '/dashboard/search'
    }
  ];
}

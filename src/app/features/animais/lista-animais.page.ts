import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  standalone: true,
  templateUrl: './lista-animais.page.html',
  styleUrl: './lista-animais.page.scss',
  imports: [RouterLink, CardComponent]
})
export class ListaAnimaisPage {
  animais = [
    { id: '1', nome: 'Mel', especie: 'Cão', compat: 95 },
    { id: '2', nome: 'Bob', especie: 'Cão', compat: 91 },
    { id: '3', nome: 'Tom', especie: 'Gato', compat: 85 },
  ];
}

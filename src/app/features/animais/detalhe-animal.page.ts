import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  template: `<h2>Detalhe do Animal #{{ id }}</h2>
             <p class="muted">Aqui entra o modal de Manifestar Interesse.</p>`
})
export class DetalheAnimalPage {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}

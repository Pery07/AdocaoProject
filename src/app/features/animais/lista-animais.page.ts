import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { AnimaisService, AnimaisFiltro, Animal } from './services/animais.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { startWith, switchMap, tap, finalize, shareReplay } from 'rxjs/operators';

@Component({
  standalone: true,
  templateUrl: './lista-animais.page.html',
  styleUrl: './lista-animais.page.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CardComponent],
})
export class ListaAnimaisPage {
  private fb  = inject(FormBuilder);
  private svc = inject(AnimaisService);

  // filtros da API (com cache no service)
  filtros$ = this.svc.getFiltros();

  // 💡 use nonNullable para não injetar null no tipo
  form = this.fb.nonNullable.group<AnimaisFiltro>({
    especie: '',
    porte: '',
    cidade: '',
  });

  // loading
  private loadingSub = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSub.asObservable();

  // lista reativa conforme filtros
  animais$: Observable<Animal[]> = this.form.valueChanges.pipe(
    startWith(this.form.getRawValue()),           // evita null dos forms
    tap(() => this.loadingSub.next(true)),
    switchMap((f) => this.svc.getAnimais(f)),
    finalize(() => this.loadingSub.next(false)),  // finalize aqui não dispara por stream compartilhada
    shareReplay(1)
  );

  limpar() {
    // reset() colocaria null; mantenha non-nullable
    this.form.setValue({ especie: '', porte: '', cidade: '' });
  }
}

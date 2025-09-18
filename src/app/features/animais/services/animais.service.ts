import { Injectable, inject } from '@angular/core';
import { ApiClient } from '../../../core/http/api-client';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export type Porte   = 'pequeno' | 'medio' | 'grande';
export type Especie = 'Cão' | 'Gato';

export interface Animal {
  id: string;
  nome: string;
  especie: Especie;
  porte: Porte;
  cidade: string;
  compat: number;      // 0–100
  fotos?: string[];
  descricao?: string;
  ongId?: string;
}

export interface FiltrosResponse {
  especies: Especie[];
  portes: Porte[];
  cidades: string[];
}

export interface AnimaisFiltro {
  especie: '' | Especie;
  porte: '' | Porte;
  cidade: '' | string;
}

@Injectable({ providedIn: 'root' })
export class AnimaisService {
  private api = inject(ApiClient);
  private filtrosCache$?: Observable<FiltrosResponse>;

  getFiltros(): Observable<FiltrosResponse> {
    if (!this.filtrosCache$) {
      this.filtrosCache$ = this.api.get<FiltrosResponse>('/animais/filtros').pipe(
        catchError(() =>
          of({
            especies: ['Cão', 'Gato'] as Especie[],
            portes: ['pequeno', 'medio', 'grande'] as Porte[],
            cidades: ['Belo Horizonte', 'São Paulo', 'Rio de Janeiro'],
          })
        ),
        shareReplay(1)
      );
    }
    return this.filtrosCache$;
  }

  getAnimais(f?: Partial<AnimaisFiltro>): Observable<Animal[]> {
    return this.api.get<Animal[]>('/animais', f ?? {}).pipe(
      catchError(() =>
        of<Animal[]>([
          { id: '1', nome: 'Mel', especie: 'Cão',  porte: 'medio',   cidade: 'Belo Horizonte', compat: 95 },
          { id: '2', nome: 'Bob', especie: 'Cão',  porte: 'medio',   cidade: 'São Paulo',      compat: 91 },
          { id: '3', nome: 'Tom', especie: 'Gato', porte: 'pequeno', cidade: 'São Paulo',      compat: 85 },
        ])
      )
    );
  }

  getById(id: string): Observable<Animal> {
    return this.api.get<Animal>(`/animais/${id}`).pipe(
      catchError(() =>
        of<Animal>({ id, nome: 'Bob', especie: 'Cão', porte: 'medio', cidade: 'São Paulo', compat: 91 })
      )
    );
  }

  // <- retorno boolean para evitar conflito de literal
  manifestarInteresse(id: string, mensagem: string): Observable<{ ok: boolean }> {
    return this.api.post<{ ok: boolean }>(`/animais/${id}/interesse`, { mensagem }).pipe(
      catchError(() => of({ ok: true }))
    );
  }
}

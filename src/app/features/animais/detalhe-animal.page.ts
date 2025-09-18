import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AnimaisService, Animal } from './services/animais.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalhe-animal.page.html',
  styleUrl: './detalhe-animal.page.scss',
})
export class DetalheAnimalPage {
  private route = inject(ActivatedRoute);
  private svc = inject(AnimaisService);
  private fb = inject(FormBuilder);

  id = this.route.snapshot.paramMap.get('id')!;
  animal$: Observable<Animal> = this.svc.getById(this.id);

  // modal
  showModal = false;
  enviando = false;
  sucesso: string | null = null;
  erro: string | null = null;

  form = this.fb.group({
    mensagem: ['', [Validators.required, Validators.minLength(10)]],
  });

  abrirModal() { this.showModal = true; }
  fecharModal() { this.showModal = false; this.form.reset(); this.sucesso = this.erro = null; }

  enviar() {
    if (this.form.invalid) return;
    this.enviando = true;
    this.svc.manifestarInteresse(this.id, this.form.value.mensagem || '')
      .subscribe({
        next: () => { this.sucesso = 'Interesse enviado! A ONG entrará em contato.'; this.enviando = false; },
        error: () => { this.erro = 'Não foi possível enviar. Tente novamente.'; this.enviando = false; }
      });
  }
}

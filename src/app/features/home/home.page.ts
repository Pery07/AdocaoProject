import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  imports: [RouterLink, CardComponent]
})
export class HomePage {}

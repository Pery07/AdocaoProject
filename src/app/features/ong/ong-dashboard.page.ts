import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  standalone: true,
  templateUrl: './ong-dashboard.page.html',
  styleUrl: './ong-dashboard.page.scss',
  imports: [CardComponent]
})
export class OngDashboardPage {}

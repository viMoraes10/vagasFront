import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TickerCardModule } from 'src/app/components/library/ticker-card/ticker-card.component';

@Component({
  selector: 'opportunities-ticker',
  templateUrl: 'opportunities-ticker.component.html',
})

export class OpportunitiesTickerComponent {
  @Input() data:  null;
}

@NgModule({
  imports: [
    CommonModule,
    TickerCardModule,
  ],
  declarations: [OpportunitiesTickerComponent],
  exports: [OpportunitiesTickerComponent],
})
export class OpportunitiesTickerModule { }

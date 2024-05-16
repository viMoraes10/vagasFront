import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'opportunity-tile',
  templateUrl: 'opportunity-tile.component.html',
  styleUrls: ['./opportunity-tile.component.scss'],
})

export class OpportunityTileComponent { 

  opportunityClick() {
    notify('Click opportunity event');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [OpportunityTileComponent],
  exports: [OpportunityTileComponent],
})
export class OpportunityTileModule { }
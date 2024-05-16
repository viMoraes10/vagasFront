import {
  Component, NgModule, Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTabPanelModule,
  DxDataGridModule,
} from 'devextreme-angular';
import {
  CardNotesModule,
  CardActivitiesModule,
  CardOpportunitiesModule,
  CardTasksModule,
} from 'src/app/components';
import { Notes } from 'src/app/types/notes';

@Component({
  selector: 'contact-cards',
  templateUrl: './contact-cards.component.html',
  styleUrls: ['./contact-cards.component.scss'],
})
export class ContactCardsComponent {
    @Input() tasks: Task[];
 

    @Input() notes: Notes;
 

    @Input() contactName: string;

    @Input() isLoading: boolean;
}

@NgModule({
  imports: [
    DxButtonModule,
    DxTabPanelModule,
    DxDataGridModule,
    CardActivitiesModule,
    CardOpportunitiesModule,
    CardTasksModule,

    CommonModule,
  ],
  providers: [],
  exports: [ContactCardsComponent],
  declarations: [ContactCardsComponent],
})
export class ContactCardsModule { }

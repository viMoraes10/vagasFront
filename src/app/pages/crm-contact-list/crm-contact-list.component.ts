import {
  Component, ViewChild, NgModule,CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid'; 
import {
  CardActivitiesModule,
  ContactStatusModule,
} from 'src/app/components';
import { contactStatusList, ContactStatus, } from 'src/app/types/contact'; 
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import DataSource from 'devextreme/data/data_source';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services'; 
import notify from "devextreme/ui/notify";
import { formatPhone } from 'src/app/pipes/phone.pipe';
import { FormPopupModule } from 'src/app/components';
import { ContactNewFormComponent, ContactNewFormModule } from 'src/app/components/library/contact-new-form/contact-new-form.component';
import Jobs from 'src/app/types/jobs';  
import { User } from 'src/app/types/user';
type FilterContactStatus = ContactStatus | 'All';

@Component({
  templateUrl: './crm-contact-list.component.html',
  styleUrls: ['./crm-contact-list.component.scss'],
  providers: [DataService],
})
export class CrmContactListComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;

  @ViewChild(ContactNewFormComponent, { static: false }) contactNewForm: ContactNewFormComponent;

  statusList = contactStatusList;

  filterStatusList = ['All', ...contactStatusList];

  isPanelOpened = false;

  isAddContactPopupOpened = false;
  RoleAdmin = true;

  userId: number;
  user: User;

  dataSource = new DataSource<Jobs[], string>({
    key: 'id', 
    load: () => new Promise((resolve, reject) => {
      this.service.getJobs().subscribe({
          next: (data: Jobs[]) => resolve(data),
          error: ({message}) => reject(message)
        })
    }),
  });

  constructor(private service: DataService) {}

  ngOnInit(): void { 

    this.service.getUser().subscribe((user: User) => {
      this.user  = user;
      this.RoleAdmin = this.user.role === 'ADMIN';
      console.log(this.user);
    }); 
  }


  addJobs() {
    this.isAddContactPopupOpened = true;
  };

  refresh = () => {
    this.dataGrid.instance.refresh();
    console.log(this.dataSource);
  };

  rowClick(e: DxDataGridTypes.RowClickEvent) {
    const { data } = e;

    this.userId = data.id;
    this.isPanelOpened = true;
  }

  onOpenedChange = (value: boolean) => {
    if (!value) {
      this.userId = null;
    }
  };

  onPinnedChange = () => {
    this.dataGrid.instance.updateDimensions();
  };

  filterByStatus = (e: DxDropDownButtonTypes.SelectionChangedEvent) => {
    const { item: status }: { item: FilterContactStatus } = e;

    if (status === 'All') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['status', '=', status]);
    }
  };

  onClickSaveNewContact = () => { 
    var newJob = this.contactNewForm.getNewContactData();
    this.service.postJobs(newJob).subscribe({
      next: () => {
        notify({
          message: `Nova vaga foi adicionada com sucesso!`,
          position: { at: 'bottom center', my: 'bottom center' }
        }, 'success');
      },
      error: (error) => {
        notify({
          message: `Erro ao adicionar nova vaga: ${error}`,
          position: { at: 'bottom center', my: 'bottom center' }
        }, 'error');
      }
    });
  };
}

@NgModule({
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,  
    ContactNewFormModule,
    FormPopupModule,
    CardActivitiesModule,
    ContactStatusModule, 
    CommonModule,
  ],
  providers: [],
  exports: [],
  declarations: [CrmContactListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class CrmContactListModule { }

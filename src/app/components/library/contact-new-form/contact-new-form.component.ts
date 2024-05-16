import {
  Component,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import {
  FormTextboxModule,
  FormPhotoUploaderModule,
} from 'src/app/components'; 
import { getSizeQualifier } from 'src/app/services/screen.service';  
import Job from 'src/app/types/jobs';

@Component({
  selector: 'contact-new-form',
  templateUrl: './contact-new-form.component.html',
  providers: [],
})

export class ContactNewFormComponent {
  newJob: Job = {
    id: 0, 
    title: '',
    description: '',
    requirements: '',
    isActive: true,
  };
  getSizeQualifier = getSizeQualifier;
  constructor() { }

  getNewContactData = () => ({ ...this.newJob }) 
}

@NgModule({
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxModule,
    FormPhotoUploaderModule,

    CommonModule,
  ],
  declarations: [ContactNewFormComponent],
  exports: [ContactNewFormComponent],
})
export class ContactNewFormModule { }

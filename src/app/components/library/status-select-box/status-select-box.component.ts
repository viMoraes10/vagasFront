/*
import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { EditorStyle } from 'devextreme-angular/common';  
import { ThemeService } from 'src/app/services/theme.service';
 
export class StatusSelectBoxComponent {
  @Input() value: string;

  @Input() label = '';
  
  @Input() readOnly = false;

  @Input() stylingMode: EditorStyle = 'filled';

  @Input() labelMode: any = this.theme.isFluent() ? 'outside' : undefined;

  @Input() classList;

  @Output() valueChange = new EventEmitter<string>();

  constructor(private theme: ThemeService) {}

}

@NgModule({
  imports: [
    DxSelectBoxModule,
    DxTextBoxModule, 
    CommonModule],
  declarations: [StatusSelectBoxComponent],
  exports: [StatusSelectBoxComponent],
})
export class StatusSelectBoxModule {}

*/
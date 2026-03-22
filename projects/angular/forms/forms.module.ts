/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrCheckboxModule } from '@bitmax/clr-angular/forms/checkbox';
import { ClrComboboxModule } from '@bitmax/clr-angular/forms/combobox';
import { ClrCommonFormsModule } from '@bitmax/clr-angular/forms/common';
import { ClrDatalistModule } from '@bitmax/clr-angular/forms/datalist';
import { ClrDatepickerModule } from '@bitmax/clr-angular/forms/datepicker';
import { ClrFileInputModule } from '@bitmax/clr-angular/forms/file-input';
import { ClrInputModule } from '@bitmax/clr-angular/forms/input';
import { ClrNumberInputModule } from '@bitmax/clr-angular/forms/number-input';
import { ClrPasswordModule } from '@bitmax/clr-angular/forms/password';
import { ClrRadioModule } from '@bitmax/clr-angular/forms/radio';
import { ClrRangeModule } from '@bitmax/clr-angular/forms/range';
import { ClrSelectModule } from '@bitmax/clr-angular/forms/select';
import { ClrTextareaModule } from '@bitmax/clr-angular/forms/textarea';

@NgModule({
  imports: [CommonModule],
  exports: [
    ClrCommonFormsModule,
    ClrCheckboxModule,
    ClrComboboxModule,
    ClrDatepickerModule,
    ClrFileInputModule,
    ClrInputModule,
    ClrPasswordModule,
    ClrRadioModule,
    ClrSelectModule,
    ClrTextareaModule,
    ClrRangeModule,
    ClrDatalistModule,
    ClrNumberInputModule,
  ],
})
export class ClrFormsModule {}

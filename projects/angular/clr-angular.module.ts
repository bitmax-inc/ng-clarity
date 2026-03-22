/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrAccordionModule } from '@bitmax/clr-angular/accordion';
import { ClrButtonModule } from '@bitmax/clr-angular/button';
import { ClrDataModule } from '@bitmax/clr-angular/data';
import { ClrEmphasisModule } from '@bitmax/clr-angular/emphasis';
import { ClrFormsModule } from '@bitmax/clr-angular/forms';
import { ClrIcon, ClrIconModule } from '@bitmax/clr-angular/icon';
import { ClrLayoutModule } from '@bitmax/clr-angular/layout';
import { ClrModalModule, ClrSidePanelModule } from '@bitmax/clr-angular/modal';
import { ClrPopoverModule } from '@bitmax/clr-angular/popover';
import { ÇlrClrPopoverModuleNext } from '@bitmax/clr-angular/popover/common';
import { ClrProgressBarModule } from '@bitmax/clr-angular/progress/progress-bars';
import { ClrSpinnerModule } from '@bitmax/clr-angular/progress/spinner';
import { ClrStepperModule } from '@bitmax/clr-angular/stepper';
import { ClrTimelineModule } from '@bitmax/clr-angular/timeline';
import { ClrConditionalModule, ClrFocusOnViewInitModule, ClrLoadingModule } from '@bitmax/clr-angular/utils';
import { ClrWizardModule } from '@bitmax/clr-angular/wizard';

@NgModule({
  imports: [ClrIcon],
  exports: [
    ClrEmphasisModule,
    ClrDataModule,
    ClrIcon,
    ClrIconModule,
    ClrModalModule,
    ClrLoadingModule,
    ClrConditionalModule,
    ClrFocusOnViewInitModule,
    ClrButtonModule,
    ClrFormsModule,
    ClrLayoutModule,
    ClrPopoverModule,
    ClrWizardModule,
    ClrSidePanelModule,
    ClrAccordionModule,
    ClrStepperModule,
    ClrSpinnerModule,
    ClrProgressBarModule,
    ÇlrClrPopoverModuleNext,
    ClrTimelineModule,
  ],
})
export class ClarityModule {}

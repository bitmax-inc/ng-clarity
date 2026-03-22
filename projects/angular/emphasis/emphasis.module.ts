/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrAlertModule } from '@bitmax/clr-angular/emphasis/alert';
import { ClrBadge } from '@bitmax/clr-angular/emphasis/badge';
import { ClrLabel } from '@bitmax/clr-angular/emphasis/label';

@NgModule({
  imports: [ClrBadge, ClrLabel],
  exports: [ClrAlertModule, ClrBadge, ClrLabel],
})
export class ClrEmphasisModule {}

/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrBreadcrumbsModule } from '@bitmax/clr-angular/layout/breadcrumbs';
import { ClrMainContainerModule } from '@bitmax/clr-angular/layout/main-container';
import { ClrNavigationModule } from '@bitmax/clr-angular/layout/nav';
import { ClrTabsModule } from '@bitmax/clr-angular/layout/tabs';
import { ClrVerticalNavModule } from '@bitmax/clr-angular/layout/vertical-nav';

@NgModule({
  exports: [ClrMainContainerModule, ClrNavigationModule, ClrTabsModule, ClrVerticalNavModule, ClrBreadcrumbsModule],
})
export class ClrLayoutModule {}

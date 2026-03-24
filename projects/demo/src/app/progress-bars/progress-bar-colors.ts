/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { ProgBarExample } from './progbar-example';

@Component({
  selector: 'clr-progress-bar-colors-demo',
  styleUrls: ['progress-bars.demo.scss'],
  templateUrl: './progress-bar-colors.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProgressBarColorsDemo {
  colorTypes: ProgBarExample[];

  constructor(cdr: ChangeDetectorRef) {
    const requestRender = () => cdr.markForCheck();
    this.colorTypes = [
      new ProgBarExample('', 'Normal', false, requestRender),
      new ProgBarExample('success', 'Success', false, requestRender),
      new ProgBarExample('warning', 'Warning', false, requestRender),
      new ProgBarExample('danger', 'Danger', false, requestRender),
    ];
  }
}

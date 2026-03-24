/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { ProgBarExample } from './progbar-example';

@Component({
  selector: 'clr-progress-bar-examples-demo',
  styleUrls: ['progress-bars.demo.scss'],
  templateUrl: './progress-bar-examples.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProgressBarExamplesDemo {
  examples: ProgBarExample[];

  constructor(cdr: ChangeDetectorRef) {
    const requestRender = () => cdr.markForCheck();
    this.examples = [
      new ProgBarExample('demo', 'Progress Bar', false, requestRender),
      new ProgBarExample('labeled', 'Labeled', true, requestRender),
      new ProgBarExample('progress-fade', 'Fade Out', false, requestRender),
    ];
  }
}

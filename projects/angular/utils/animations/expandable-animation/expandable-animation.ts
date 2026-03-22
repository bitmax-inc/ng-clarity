/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { BaseExpandableAnimation } from './base-expandable-animation';
import { DomAdapter } from '../../dom-adapter/dom-adapter';

@Component({
  selector: 'clr-expandable-animation',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  providers: [DomAdapter],
  standalone: false,
})
export class ClrExpandableAnimation extends BaseExpandableAnimation implements OnChanges, OnDestroy {
  @Input() clrExpandTrigger = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clrExpandTrigger'] && !changes['clrExpandTrigger'].firstChange) {
      Promise.resolve().then(() => this.playAnimation());
    }
  }

  ngOnDestroy() {
    this.destroyAnimation();
  }

  playAnimation() {
    this.playHeightAnimation();
  }
}

/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'clr-modal-animation-demo',
  templateUrl: './modal-animation.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ModalAnimationDemo implements OnInit, OnDestroy {
  animatedExampleIn = false;
  private animationTimerId = -1;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // If you want interactivity, go to the Angular component demo. :-P
    this.animationTimerId = window.setInterval(() => {
      this.animatedExampleIn = !this.animatedExampleIn;
      this.cdr.markForCheck();
    }, 2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.animationTimerId);
  }
}

/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ClrLoadingState, LoadingListener } from '@clr/angular/utils';

// minimum width to fit loading spinner
const MIN_BUTTON_WIDTH = 42;

@Component({
  selector: 'button[clrLoading]',
  template: `
    <span class="clr-loading-button-state">
      @switch (state) {
        @case (buttonState.LOADING) {
          <span class="clr-loading-button-spinner-enter">
            <span class="spinner spinner-inline"></span>
          </span>
        }
        @case (buttonState.SUCCESS) {
          <span
            (animationend)="onValidatedAnimationDone()"
            class="clr-loading-button-validated"
            [class.clr-loading-button-validated]="true"
          >
            <span class="spinner spinner-inline spinner-check"></span>
          </span>
        }
        @case (buttonState.DEFAULT) {
          <span class="clr-loading-btn-content" [class.clr-loading-button-default-enter]="animateDefaultContent">
            <ng-content></ng-content>
          </span>
        }
      }
    </span>
  `,
  providers: [{ provide: LoadingListener, useExisting: ClrLoadingButton }],
  styles: [
    `
      .clr-loading-button-spinner-enter,
      .clr-loading-button-validated,
      .clr-loading-button-default-enter {
        display: inline-flex;
        align-items: center;
      }

      .clr-loading-button-spinner-enter,
      .clr-loading-button-default-enter {
        animation: clr-loading-button-fade-in 200ms 100ms ease-in both;
      }

      .clr-loading-button-validated {
        animation: clr-loading-button-validated 600ms both;
      }

      @keyframes clr-loading-button-fade-in {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes clr-loading-button-validated {
        0% {
          transform: scale(0);
        }

        20% {
          opacity: 1;
        }

        40% {
          transform: scale(1.2);
        }

        60% {
          transform: scale(0.9);
        }

        100% {
          transform: scale(1);
        }
      }
    `,
  ],
  host: { '[attr.disabled]': "disabled? '' : null" },
  standalone: false,
})
export class ClrLoadingButton implements LoadingListener {
  @Input('disabled') disabled: boolean;

  @Output('clrLoadingChange') clrLoadingChange = new EventEmitter<ClrLoadingState>(false);

  buttonState = ClrLoadingState;
  state: ClrLoadingState = ClrLoadingState.DEFAULT;
  animateDefaultContent = false;

  constructor(
    public el: ElementRef<HTMLButtonElement>,
    private renderer: Renderer2
  ) {}

  loadingStateChange(state: ClrLoadingState): void {
    if (state === this.state) {
      return;
    }
    const previousState = this.state;
    this.state = state;
    this.animateDefaultContent = state === ClrLoadingState.DEFAULT && previousState !== ClrLoadingState.DEFAULT;

    switch (state) {
      case ClrLoadingState.DEFAULT:
        this.renderer.removeStyle(this.el.nativeElement, 'width');
        this.renderer.removeStyle(this.el.nativeElement, 'transform'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
        if (!this.disabled) {
          this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
        }
        break;
      case ClrLoadingState.LOADING:
        this.setExplicitButtonWidth();
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translatez(0)'); // for chromium render bug see issue https://github.com/vmware/clarity/issues/2700
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
        break;
      case ClrLoadingState.SUCCESS:
        this.setExplicitButtonWidth();
        break;
      case ClrLoadingState.ERROR:
        this.loadingStateChange(ClrLoadingState.DEFAULT);
        break;
      default:
        break;
    }
    this.clrLoadingChange.emit(state);
  }

  onValidatedAnimationDone(): void {
    this.loadingStateChange(ClrLoadingState.DEFAULT);
  }

  private setExplicitButtonWidth() {
    if (this.el.nativeElement && this.el.nativeElement.getBoundingClientRect) {
      const boundingClientRect = this.el.nativeElement.getBoundingClientRect();
      const width = Math.max(MIN_BUTTON_WIDTH, boundingClientRect.width);
      this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
    }
  }
}

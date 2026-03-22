/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChange,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ClrCommonStringsService, ScrollingService, uniqueIdFactory } from '@clr/angular/utils';

import { ClrModalConfigurationService } from './modal-configuration.service';
import { ModalStackService } from './modal-stack.service';

@Component({
  selector: 'clr-modal',
  viewProviders: [ScrollingService],
  templateUrl: './modal.html',
  styles: [
    `
      :host {
        display: none;
      }

      :host.open {
        display: inline;
      }

      .modal-dialog {
        opacity: 0;
        transform: var(--clr-modal-dialog-closed-transform, translate(0, -25%));
        transition:
          opacity 0.2s ease-in-out,
          transform 0.2s ease-in-out;
      }

      .modal-dialog.is-open {
        opacity: 1;
        transform: translate(0, 0);
      }

      .modal-backdrop {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
      }

      .modal-backdrop.is-open {
        opacity: 0.85;
      }

      .modal-dialog.no-animation,
      .modal-backdrop.no-animation {
        transition: none;
      }
    `,
  ],
  standalone: false,
})
export class ClrModal implements OnChanges, OnDestroy {
  modalId = uniqueIdFactory();
  rendered = false;
  @ViewChild('title') title: ElementRef<HTMLElement>;

  @Input('clrModalOpen') _open = false;
  @Output('clrModalOpenChange') _openChanged = new EventEmitter<boolean>(false);

  @Input('clrModalClosable') closable = true;
  @Input('clrModalCloseButtonAriaLabel') closeButtonAriaLabel = this.commonStrings.keys.close;
  @Input('clrModalSize') size = 'md';
  @Input('clrModalStaticBackdrop') staticBackdrop = true;
  @Input('clrModalSkipAnimation') skipAnimation = false;

  @Input('clrModalPreventClose') stopClose = false;
  @Output('clrModalAlternateClose') altClose = new EventEmitter<boolean>(false);

  @Input('clrModalLabelledById') labelledBy: string;

  // presently this is only used by inline wizards
  @Input('clrModalOverrideScrollService') bypassScrollService = false;

  // Provide raw modal content. This is used by the wizard so that the same template can be rendered with and without a modal.
  @ContentChild('clrInternalModalContentTemplate') protected readonly modalContentTemplate: TemplateRef<any>;

  @ViewChild('body') private readonly bodyElementRef: ElementRef<HTMLElement>;
  private dialogVisible = false;
  private showAnimationFrame: number | null = null;

  constructor(
    private _scrollingService: ScrollingService,
    public commonStrings: ClrCommonStringsService,
    private modalStackService: ModalStackService,
    private configuration: ClrModalConfigurationService
  ) {}

  @HostBinding('class.open')
  get hostOpen(): boolean {
    return this.rendered;
  }

  get fadeMove(): string {
    return this.skipAnimation ? '' : this.configuration.fadeMove;
  }
  set fadeMove(move: string) {
    this.configuration.fadeMove = move;
  }

  get backdrop(): boolean {
    return this.configuration.backdrop;
  }

  get dialogOpen(): boolean {
    return this.rendered && this.dialogVisible;
  }

  get dialogClosedTransform(): string {
    switch (this.fadeMove) {
      case 'fadeLeft':
        return 'translate(25%, 0)';
      case 'fadeUp':
        return 'translate(0, 50%)';
      case 'fadeDown':
      default:
        return 'translate(0, -25%)';
    }
  }

  // Detect when _open is set to true and set no-scrolling to true
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (changes && Object.prototype.hasOwnProperty.call(changes, '_open')) {
      if (changes._open.currentValue) {
        if (!this.bypassScrollService) {
          this._scrollingService.stopScrolling();
          this.modalStackService.trackModalOpen(this);
        }
        this.showModal();
      } else {
        if (!this.bypassScrollService) {
          this._scrollingService.resumeScrolling();
        }
        this.hideModal();
      }
    }
  }

  ngOnDestroy(): void {
    this.cancelScheduledShow();
    this._scrollingService.resumeScrolling();
  }

  open(): void {
    if (this._open) {
      return;
    }
    this._open = true;
    this.showModal();
    this._openChanged.emit(true);
    this.modalStackService.trackModalOpen(this);
  }

  backdropClick(): void {
    if (this.staticBackdrop) {
      this.title.nativeElement.focus();
      return;
    }

    this.close();
  }

  close(): void {
    if (this.stopClose) {
      this.altClose.emit(false);
      return;
    }
    if (!this.closable || !this._open) {
      return;
    }
    this._open = false;
    this.hideModal();
  }

  onDialogTransitionEnd(event: TransitionEvent) {
    if (event.target !== event.currentTarget || event.propertyName !== 'opacity' || this._open) {
      return;
    }

    this.completeClose();
  }

  scrollTop() {
    this.bodyElementRef.nativeElement.scrollTo(0, 0);
  }

  private showModal() {
    this.rendered = true;
    if (this.skipAnimation) {
      this.dialogVisible = true;
      return;
    }

    this.dialogVisible = false;
    this.cancelScheduledShow();

    const revealDialog = () => {
      this.showAnimationFrame = null;
      if (this.rendered && this._open) {
        this.dialogVisible = true;
      }
    };

    if (typeof globalThis.requestAnimationFrame === 'function') {
      this.showAnimationFrame = globalThis.requestAnimationFrame(() => revealDialog());
    } else {
      queueMicrotask(revealDialog);
    }
  }

  private hideModal() {
    this.cancelScheduledShow();
    if (!this.rendered) {
      return;
    }

    this.dialogVisible = false;

    if (this.skipAnimation) {
      this.completeClose();
    }
  }

  private completeClose() {
    if (this.rendered) {
      this.rendered = false;
      this.dialogVisible = false;
      this._openChanged.emit(false);
      this.modalStackService.trackModalClose(this);
    }
  }

  private cancelScheduledShow() {
    if (this.showAnimationFrame !== null && typeof globalThis.cancelAnimationFrame === 'function') {
      globalThis.cancelAnimationFrame(this.showAnimationFrame);
      this.showAnimationFrame = null;
    }
  }
}

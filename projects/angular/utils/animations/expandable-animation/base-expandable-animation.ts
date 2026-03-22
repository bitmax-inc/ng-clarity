/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, ElementRef, Renderer2 } from '@angular/core';

import { DomAdapter } from '../../dom-adapter/dom-adapter';

const EXPANDABLE_ANIMATION_DURATION_MS = 200;
const EXPANDABLE_ANIMATION_EASING = 'ease-in-out';

@Directive()
export class BaseExpandableAnimation {
  startHeight = 0;
  protected currentAnimation?: Animation;
  private cleanupTimer?: ReturnType<typeof setTimeout>;

  constructor(
    protected element: ElementRef<HTMLElement>,
    protected domAdapter: DomAdapter,
    protected renderer: Renderer2
  ) {}

  updateStartHeight() {
    this.startHeight = this.domAdapter.computedHeight(this.element.nativeElement) || 0;
  }

  initAnimationEffects() {
    this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden');
  }

  playHeightAnimation() {
    this.destroyAnimation();

    const element = this.element.nativeElement;
    const endHeight = this.domAdapter.computedHeight(element) || 0;

    this.initAnimationEffects();

    if (typeof element.animate === 'function') {
      this.currentAnimation = element.animate([{ height: `${this.startHeight}px` }, { height: `${endHeight}px` }], {
        duration: EXPANDABLE_ANIMATION_DURATION_MS,
        easing: EXPANDABLE_ANIMATION_EASING,
        fill: 'both',
      });

      this.currentAnimation.onfinish = () => this.finishAnimation();
      return;
    }

    this.renderer.setStyle(element, 'height', `${this.startHeight}px`);
    this.renderer.setStyle(
      element,
      'transition',
      `height ${EXPANDABLE_ANIMATION_DURATION_MS}ms ${EXPANDABLE_ANIMATION_EASING}`
    );
    void element.offsetHeight;
    this.renderer.setStyle(element, 'height', `${endHeight}px`);
    this.cleanupTimer = setTimeout(() => this.finishAnimation(false), EXPANDABLE_ANIMATION_DURATION_MS);
  }

  finishAnimation(cancelAnimations = true) {
    if (this.cleanupTimer) {
      clearTimeout(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }

    if (this.currentAnimation) {
      this.currentAnimation.cancel();
      this.currentAnimation = undefined;
    }

    this.renderer.removeStyle(this.element.nativeElement, 'height');
    this.renderer.removeStyle(this.element.nativeElement, 'transition');
    this.cleanupAnimationEffects(cancelAnimations);
  }

  cleanupAnimationEffects(cancelAnimations = false) {
    this.renderer.removeStyle(this.element.nativeElement, 'overflow');

    // A "safe" auto-update of the height ensuring basic OOTB user experience .
    // Prone to small jumps in initial animation height if data was changed in the meantime, the window was resized, etc.
    // For optimal behavior call manually updateStartHeight() from the parent component before initiating the update.
    this.updateStartHeight();
    if (cancelAnimations) {
      this.cancelElementAnimations();
    }
  }

  destroyAnimation() {
    if (this.cleanupTimer) {
      clearTimeout(this.cleanupTimer);
      this.cleanupTimer = undefined;
    }

    if (this.currentAnimation) {
      this.currentAnimation.cancel();
      this.currentAnimation = undefined;
    }

    this.renderer.removeStyle(this.element.nativeElement, 'height');
    this.renderer.removeStyle(this.element.nativeElement, 'transition');
  }

  private cancelElementAnimations() {
    this.element.nativeElement.getAnimations?.().forEach(animation => {
      if (animation.playState === 'finished') {
        animation.cancel(); // clears animation-style set on the element
      }
    });
  }
}

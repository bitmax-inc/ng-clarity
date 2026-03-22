/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { animate, style, transition, trigger } from '@angular/animations';
import { defaultAnimationTiming } from '@bitmax/clr-angular/utils';

/**
 * @deprecated Uses Angular's legacy animation engine via `@angular/animations`.
 * Clarity's accordion and stepper components no longer require this helper.
 */
export const skipInitialRenderTrigger = trigger('skipInitialRender', [transition(':enter', [])]);

/**
 * @deprecated Uses Angular's legacy animation engine via `@angular/animations`.
 * Clarity's accordion and stepper components no longer require this helper.
 */
export const panelExpandTransition = transition('void => *', [
  style({ display: 'block', height: 0 }),
  animate(defaultAnimationTiming, style({ height: '*' })),
]);

/**
 * @deprecated Uses Angular's legacy animation engine via `@angular/animations`.
 * Clarity's accordion and stepper components no longer require this helper.
 */
export const panelCollapseTransition = transition('* => void', [
  style({ display: 'block' }),
  animate(defaultAnimationTiming, style({ height: 0, display: 'none' })),
]);

/**
 * @deprecated Uses Angular's legacy animation engine via `@angular/animations`.
 * Clarity's accordion and stepper components no longer require this helper.
 */
export const collapsiblePanelExpandAnimation = [skipInitialRenderTrigger, trigger('toggle', [panelExpandTransition])];

/**
 * @deprecated Uses Angular's legacy animation engine via `@angular/animations`.
 * Clarity's accordion and stepper components no longer require this helper.
 */
export const collapsiblePanelAnimation = [
  skipInitialRenderTrigger,
  trigger('toggle', [panelExpandTransition, panelCollapseTransition]),
];

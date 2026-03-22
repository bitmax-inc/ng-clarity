/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { animate, animation, style } from '@angular/animations';

/**
 * @deprecated Uses Angular's legacy animation engine via `@angular/animations`.
 * Prefer CSS transitions/keyframes or `animate.enter` / `animate.leave` in application code.
 */
export const defaultAnimationTiming = '0.2s ease-in-out';

/**
 * @deprecated Uses Angular's legacy animation engine via `@angular/animations`.
 * Prefer CSS transitions/keyframes or `animate.enter` / `animate.leave` in application code.
 */
export const defaultExpandAnimation = animation(
  [style({ height: '{{ startHeight }}px' }), animate(defaultAnimationTiming, style({ height: '*' }))],
  {
    params: {
      startHeight: 0, // default
    },
  }
);

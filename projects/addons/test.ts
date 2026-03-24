/*
 * Copyright (c) 2016-2026 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import 'zone.js';
import 'zone.js/testing';

import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

/**
 * Run TestBed with zoneless change detection so component tests match the runtime apps.
 * Zone.js stays loaded here only for Jasmine helpers such as `fakeAsync` and `tick`.
 */
@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class ZonelessConfigModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment([BrowserTestingModule, ZonelessConfigModule], platformBrowserTesting(), {
  teardown: { destroyAfterEach: false },
});

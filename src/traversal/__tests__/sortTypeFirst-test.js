/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails oncall+relay
 */

'use strict';

describe('sortTypeFirst', () => {
  var sortTypeFirst = require('sortTypeFirst');

  it('considers `__type__` to be the smallest', () => {
    expect(sortTypeFirst('__type__', '_')).toBe(-1);
    expect(sortTypeFirst('_', '__type__')).toBe(1);
    expect(sortTypeFirst('__type__', '__type__')).toBe(0);
  });

  it('compares non-`__type__` strings', () => {
    expect(sortTypeFirst('a', 'b')).toBe(-1);
    expect(sortTypeFirst('b', 'a')).toBe(1);
    expect(sortTypeFirst('a', 'a')).toBe(0);
  });
});

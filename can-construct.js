/**
 * Copyright 2022 Patrick L. Branson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The function(s) from this class takes a target string and an array of strings as arguments. The
 * function(s) should return a boolean indicating whether or not it is possible to generate the
 * target string concatenating element strings from the array. You may reuse elements from the
 * array as many times a need. Note m = target.length & n = words.length.
 */
class CanConstruct {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O((n^m) * m); Space Complexity: O(m^2)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @returns true if true if is possible to concatinate the target string; otherwise, false
   */
  naive(target, words) {
    if (target === '') {
      return true
    }

    for (let word of words) {
      if (target.indexOf(word) === 0) {
        const suffix = target.slice(word.length)
        if (this.naive(suffix, words) == true) {
          return true
        }
      }
    }

    return false
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(n * (m^2)); Space Complexity: O(m^2)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @param {{}} memory the array that stores the past answers to similar calculations
   * @returns true if true if is possible to concatinate the target string; otherwise, false
   */
  memorization(target, words, memory = {}) {
    if (target in memory) {
      return memory[target]
    }

    if (target === '') {
      return true
    }

    for (let word of words) {
      if (target.indexOf(word) === 0) {
        const suffix = target.slice(word.length)
        if (this.memorization(suffix, words, memory) == true) {
          memory[target] = true
          return memory[target]
        }
      }
    }

    memory[target] = false
    return memory[target]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O(n * (m^2)); Space Complexity: O(m)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @returns true if true if is possible to concatinate the target string; otherwise, false
   */
  tabulation(target, words) {
    const table = Array(target.length + 1).fill(false)
    table[0] = true // This is the base case of CanConstruct

    for (let index = 0; index <= target.length; ++index) {
      if (table[index] === true) {
        for (let word of words) {
          // if the word matches the characters starting at the index
          if (target.slice(index, index + word.length) === word) {
            table[index + word.length] = true
          }
        }
      }
    }

    return table[target.length]
  }
}

console.log('Brute Force:')
console.log(
  new CanConstruct().naive('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
) // true
console.log(
  new CanConstruct().naive('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // false
console.log(
  new CanConstruct().naive('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ])
) // true

// Commented out because of the time complexity: O((n^m) * m)
// console.log(new CanConstruct().naive('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
//     'e',
//     'ee',
//     'eee',
//     'eeee',
//     'eeeee',
//     'eeeeee'
// ])); // false

console.log('\nMemorization:')
console.log(
  new CanConstruct().memorization('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
) // true
console.log(
  new CanConstruct().memorization('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // false
console.log(
  new CanConstruct().memorization('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ])
) // true

console.log(
  new CanConstruct().memorization('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
) // false

console.log('\nTabluation:')
console.log(
  new CanConstruct().tabulation('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
) // true
console.log(
  new CanConstruct().tabulation('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // false
console.log(
  new CanConstruct().tabulation('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ])
) // true

console.log(
  new CanConstruct().tabulation('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
) // false

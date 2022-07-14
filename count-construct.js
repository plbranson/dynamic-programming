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
 * function(s) should return the number of ways that the target string can be constructed by
 * concatenating element strings from the array. You may reuse elements from the array as many
 * times a need. Note m = target.length & n = words.length.
 */
class CountConstruct {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O((n^m) * m); Space Complexity: O(m^2)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @returns the total number of ways that the target can be created from the word bank
   */
  naive(target, words) {
    if (target === '') {
      return 1
    }

    let totalCount = 0

    for (let word of words) {
      if (target.indexOf(word) === 0) {
        let numberOfWaysForRest = this.naive(target.slice(word.length), words)
        totalCount += numberOfWaysForRest
      }
    }

    return totalCount
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(n * (m^2)); Space Complexity: O(m^2)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @param {{}} memory the array that stores the past answers to similar calculations
   * @returns the total number of ways that the target can be created from the word bank
   */
  memorization(target, words, memory = {}) {
    if (target in memory) {
      return memory[target]
    }

    if (target === '') {
      return 1
    }

    let totalCount = 0

    for (let word of words) {
      if (target.indexOf(word) === 0) {
        let numberOfWaysForRest = this.memorization(
          target.slice(word.length),
          words,
          memory
        )
        totalCount += numberOfWaysForRest
      }
    }

    memory[target] = totalCount
    return memory[target]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O((m^2) * n); Space Complexity: O(m)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @returns the total number of ways that the target can be created from the word bank
   */
  tabulation(target, words) {
    const table = Array(target.length + 1).fill(0)
    table[0] = 1 // This is the base case of CountConstruct

    for (let index = 0; index <= target.length; ++index) {
      for (let word of words) {
        if (target.slice(index, index + word.length) === word) {
          table[index + word.length] += table[index]
        }
      }
    }

    return table[target.length]
  }
}

console.log('Brute Force:')
console.log(
  new CountConstruct().naive('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
) // 2
console.log(
  new CountConstruct().naive('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
) // 1
console.log(
  new CountConstruct().naive('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // 0
console.log(
  new CountConstruct().naive('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ])
) // 4

// Commented out because of the time complexity: O((n^m) * m)
// console.log(new CanConstruct().naive('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
//     'e',
//     'ee',
//     'eee',
//     'eeee',
//     'eeeee',
//     'eeeeee'
// ])); // 0

console.log('\nMemorization:')
console.log(
  new CountConstruct().memorization('purple', [
    'purp',
    'p',
    'ur',
    'le',
    'purpl',
  ])
) // 2
console.log(
  new CountConstruct().memorization('abcdef', [
    'ab',
    'abc',
    'cd',
    'def',
    'abcd',
  ])
) // 1
console.log(
  new CountConstruct().memorization('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // 0
console.log(
  new CountConstruct().memorization('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ])
) // 4

console.log(
  new CountConstruct().memorization(
    'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',
    ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee']
  )
) // 0

console.log('\nTabluation:')
console.log(
  new CountConstruct().tabulation('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
) // 2
console.log(
  new CountConstruct().tabulation('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
) // 1
console.log(
  new CountConstruct().tabulation('skateboard', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // 0
console.log(
  new CountConstruct().tabulation('enterapotentpot', [
    'a',
    'p',
    'ent',
    'enter',
    'ot',
    'o',
    't',
  ])
) // 4

console.log(
  new CountConstruct().tabulation('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
    'e',
    'ee',
    'eee',
    'eeee',
    'eeeee',
    'eeeeee',
  ])
) // 0

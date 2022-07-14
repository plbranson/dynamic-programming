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
 * function(s) should return a two-dimensional array containing all of the ways that the target
 * string can be constructed and contcatenating element strings from the array. You may reuse
 * elements from the array as many times a need. Note m = target.length & n = words.length.
 */
class AllConstruct {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O(n^m); Space Complexity: O(m)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @returns all possible two-dimensional arrays of string elements to build the target string
   */
  naive(target, words) {
    if (target === '') {
      return [[]]
    }

    let result = []

    for (let word of words) {
      if (target.indexOf(word) === 0) {
        const suffix = target.slice(word.length)
        // The suffixWays variable contains all the ways to build the suffix
        // The targetWays variable contains all the ways to build the suffix & target
        const suffixWays = this.naive(suffix, words)
        const targetWays = suffixWays.map((way) => [word, ...way])
        result.push(...targetWays)
      }
    }

    return result
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(n^m); Space Complexity: O(m)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @param {{}} memory the array that stores the past answers to similar calculations
   * @returns all possible two-dimensional arrays of string elements to build the target string
   */
  memorization(target, words, memory = {}) {
    if (target in memory) {
      return memory[target]
    }

    if (target === '') {
      return [[]]
    }

    let result = []

    for (let word of words) {
      if (target.indexOf(word) === 0) {
        const suffix = target.slice(word.length)
        // The suffixWays variable contains all the ways to build the suffix
        // The targetWays variable contains all the ways to build the suffix & target
        const suffixWays = this.memorization(suffix, words, memory)
        const targetWays = suffixWays.map((way) => [word, ...way])
        result.push(...targetWays)
      }
    }

    memory[target] = result
    return memory[target]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O(n^m); Space Complexity: O(n^m)
   * @param {string} target the target string that is being comparied against
   * @param {[string]} words the array of strings to concatinate the target string
   * @returns all possible two-dimensional arrays of string elements to build the target string
   */
  tabulation(target, words) {
    const table = Array(target.length + 1)
      .fill()
      .map(() => [])
    table[0] = [[]]

    for (let index = 0; index <= target.length; ++index) {
      for (let word of words) {
        if (target.slice(index, index + word.length) === word) {
          const newCombinations = table[index].map((subarray) => [
            ...subarray,
            word,
          ])
          table[index + word.length].push(...newCombinations)
        }
      }
    }

    return table[target.length]
  }
}

console.log('Brute Force:')
console.log(
  new AllConstruct().naive('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
)
// [
//      ['purp', 'le'],
//      ['p', 'ur', 'p', 'le']
// ]

console.log(
  new AllConstruct().naive('abcdef', [
    'ab',
    'abc',
    'cd',
    'def',
    'ef',
    'c',
    'abcd',
  ])
)
// [
//      ['ab', 'cd', 'ef'],
//      ['ab', 'c', 'def'],
//      ['abc', 'def'],
//      ['abcd', 'ef'],
// ]

console.log(
  new AllConstruct().naive('skatebord', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // []

// Commented out because of the time complexity: O(n^m)
// console.log(new AllConstruct().naive('aaaaaaz', ['a', 'aa', 'aaa', 'aaaa', 'aaaaa'])); // []

console.log('\nMemorization:')
console.log(
  new AllConstruct().memorization('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
)
// [
//      ['purp', 'le'],
//      ['p', 'ur', 'p', 'le']
// ]

console.log(
  new AllConstruct().memorization('abcdef', [
    'ab',
    'abc',
    'cd',
    'def',
    'ef',
    'c',
    'abcd',
  ])
)
// [
//      ['ab', 'cd', 'ef'],
//      ['ab', 'c', 'def'],
//      ['abc', 'def'],
//      ['abcd', 'ef'],
// ]

console.log(
  new AllConstruct().memorization('skatebord', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // []
console.log(
  new AllConstruct().memorization('aaaaaaaaaz', [
    'a',
    'aa',
    'aaa',
    'aaaa',
    'aaaaa',
  ])
) // []

console.log('\nTabluation:')
console.log(
  new AllConstruct().tabulation('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
)
// [
//      ['purp', 'le'],
//      ['p', 'ur', 'p', 'le']
// ]

console.log(
  new AllConstruct().tabulation('abcdef', [
    'ab',
    'abc',
    'cd',
    'def',
    'ef',
    'c',
    'abcd',
  ])
)
// [
//      ['ab', 'cd', 'ef'],
//      ['ab', 'c', 'def'],
//      ['abc', 'def'],
//      ['abcd', 'ef'],
// ]

console.log(
  new AllConstruct().tabulation('skatebord', [
    'bo',
    'rd',
    'ate',
    't',
    'ska',
    'sk',
    'boar',
  ])
) // []
console.log(
  new AllConstruct().tabulation('aaaaaaaaaz', [
    'a',
    'aa',
    'aaa',
    'aaaa',
    'aaaaa',
  ])
) // []

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
 * The function(s) from this class takes in a target sum and an array of numbers as arguments. The function(s) should
 * return boolean indicating whether or not it is possible to generate the target sum using numbers from the array.
 * You may use an element of the array as many times as needed. You may assume all inputs are non-negative; however,
 * I throw an error if there is a negative number present. Note is m = the target, and n = numbers.length
 */
class CanSum {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O(n^m); Space Complexity: O(m)
   * @param {number} target the target sum that is being compared against
   * @param {[numbers]} numbers the array of integers to calculate the target sum
   * @returns true if is possible to calculate the sum; otherwise, false
   */
  naive(target, numbers) {
    // Prevents a negative number
    for (let number of numbers) {
      if (number < 0) {
        throw Error('Negative Number!')
      }
    }

    if (target === 0) {
      return true
    }

    if (target < 0) {
      return false
    }

    for (let number of numbers) {
      const remainder = target - number
      if (this.naive(remainder, numbers) === true) {
        return true
      }
    }

    return false
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(n^m); Space Complexity: O(m)
   * @param {number} target the target sum that is being compared against
   * @param {[number]} numbers the array of integers to calculate the target sum
   * @param {{}} memory the array that stores the past answers to similar calculations
   * @returns true if is possible to calculate the sum; otherwise, false
   */
  memorization(target, numbers, memory = {}) {
    // Prevents a negative number
    for (let number of numbers) {
      if (number < 0) {
        throw Error('Negative Number!')
      }
    }

    if (target in memory) {
      return memory[target]
    }

    if (target === 0) {
      return true
    }

    if (target < 0) {
      return false
    }

    for (let number of numbers) {
      const remainder = target - number
      if (this.memorization(remainder, numbers, memory) === true) {
        memory[target] = true
        return memory[target]
      }
    }

    memory[target] = false
    return memory[target]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O(mn); Space Complexity: O(m)
   * @param {number} target the target sum that is being compared against
   * @param {[number]} numbers the array of integers to calculate the target sum
   * @returns true if is possible to calculate the sum; otherwise, false
   */
  tablulation(target, numbers) {
    // Prevents a negative number
    for (let number of numbers) {
      if (number < 0) {
        throw Error('Negative Number!')
      }
    }

    const table = Array(target + 1).fill(false)
    table[0] = true // The base case of CanSum

    for (let index = 0; index <= target; ++index) {
      if (table[index] === true) {
        for (let number of numbers) {
          table[index + number] = true
        }
      }
    }

    return table[target]
  }
}

console.log('Brute Force:')
console.log(new CanSum().naive(7, [2, 3])) // true
console.log(new CanSum().naive(7, [3, 4, 5, 7])) // true
console.log(new CanSum().naive(7, [2, 4])) // false
console.log(new CanSum().naive(8, [2, 3, 5])) // true

// Commented out because of the time complexity: O(n^m)
// console.log(new CanSum().naive(300, [7, 14]));  // false

console.log('\nMemorization:')
console.log(new CanSum().memorization(7, [2, 3])) // true
console.log(new CanSum().memorization(7, [3, 4, 5, 7])) // true
console.log(new CanSum().memorization(7, [2, 4])) // false
console.log(new CanSum().memorization(8, [2, 3, 5])) // true

console.log(new CanSum().memorization(300, [7, 14])) // false

console.log('\nTabluation:')
console.log(new CanSum().tablulation(7, [2, 3])) // true
console.log(new CanSum().tablulation(7, [3, 4, 5, 7])) // true
console.log(new CanSum().tablulation(7, [2, 4])) // false
console.log(new CanSum().tablulation(8, [2, 3, 5])) // true

console.log(new CanSum().tablulation(300, [7, 14])) // false

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
 * The function(s) from this class takes a target sum and an array of numbers as arguments. the function(s) should
 * return an array containing any combination of the elements that add up to exactly the target sum. If there is no
 * combination that adds up to the target sum, then return null. You may assume all inputs are non-negative; however, I
 * throw an error if there is a negative number present. Note is m = the target, and n = numbers.length
 */
class HowSum {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O((n^m) * m); Space Complexity: O(m)
   * @param {number} target the target sum that is being compared against
   * @param {[number]} numbers the array of integers to calculate the target sum
   * @returns the array of possible number combinations, null if it is not possible
   */
  naive(target, numbers) {
    // Prevents a negative number
    for (let number of numbers) {
      if (number < 0) {
        throw Error('Negative Number!')
      }
    }

    if (target === 0) {
      return []
    }

    if (target < 0) {
      return null
    }

    for (let number of numbers) {
      const remainder = target - number
      const result = this.naive(remainder, numbers)
      if (result !== null) {
        return [...result, number]
      }
    }

    return null
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(n * (m^2)); Space Complexity: O(m^2)
   * @param {number} target the target sum that is being compared against
   * @param {[number]} numbers the array of integers to calculate the target sum
   * @param {{}} memory the array that stores the past answers to similar calculations
   * @returns the array of possible number combinations, null if it is not possible
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
      return []
    }

    if (target < 0) {
      return null
    }

    for (let number of numbers) {
      const remainder = target - number
      const result = this.memorization(remainder, numbers, memory)
      if (result !== null) {
        memory[target] = [...result, number]
        return memory[target]
      }
    }

    memory[target] = null
    return memory[target]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O((m^2) * n); Space Complexity: O(m^2)
   * @param {number} target the target sum that is being compared against
   * @param {[number]} numbers the array of integers to calculate the target sum
   * @returns the array of possible number combinations, null if it is not possible
   */
  tabulation(target, numbers) {
    // Prevents a negative number
    for (let number of numbers) {
      if (number < 0) {
        throw Error('Negative Number!')
      }
    }

    const table = Array(target + 1).fill(null)
    table[0] = [] // The base case of HowSum

    for (let index = 0; index <= target; ++index) {
      if (table[index] !== null) {
        for (let number of numbers) {
          table[index + number] = [...table[index], number]
        }
      }
    }

    return table[target]
  }
}

console.log('Brute Force:')
console.log(new HowSum().naive(7, [2, 3])) // [3, 2, 3]
console.log(new HowSum().naive(7, [3, 4, 5, 7])) // [4, 3]
console.log(new HowSum().naive(7, [2, 4])) // null
console.log(new HowSum().naive(8, [2, 3, 5])) // [2, 2, 2, 2]

// Commented out because of the time complexity: O((n^m) * m)
// console.log(new HowSum().naive(300, [7, 14]));  // null

console.log('\nMemorization:')
console.log(new HowSum().memorization(7, [2, 3])) // [3, 2, 3]
console.log(new HowSum().memorization(7, [3, 4, 5, 7])) // [4, 3]
console.log(new HowSum().memorization(7, [2, 4])) // null
console.log(new HowSum().memorization(8, [2, 3, 5])) // [2, 2, 2, 2]

console.log(new HowSum().memorization(300, [7, 14])) // null

console.log('\nTabluation:')
console.log(new HowSum().tabulation(7, [2, 3])) // [3, 2, 3]
console.log(new HowSum().tabulation(7, [3, 4, 5, 7])) // [4, 3]
console.log(new HowSum().tabulation(7, [2, 4])) // null
console.log(new HowSum().tabulation(8, [2, 3, 5])) // [2, 2, 2, 2]

console.log(new HowSum().tabulation(300, [7, 14])) // null

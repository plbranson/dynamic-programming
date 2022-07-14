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
 * The function(s) from this class takes a target sum and an array of numbers as arguments. The function(s) should
 * return an array containing the shortest combination of the elements that add up to exactly the target sum. If there
 * is a tie for the shortest combination, it will return any one of the shortest. If there is no combination that adds
 * up to the target sum, then return null. You may assume all inputs are non-negative; however, I throw an error if
 * there is a negative number present. Note: m = the target, and n = numbers.length
 */
class BestSum {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O((n^m) * m); Space Complexity: O(m^2)
   * @param {number} target the target sum that is being compared against
   * @param {[numbers]} numbers the array of integers to calculate the target sum
   * @returns the shortest array combination possible for the target sum
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

    let shortestCombination = null

    for (let number of numbers) {
      const remainder = target - number
      const remainderCombination = this.naive(remainder, numbers)
      if (remainderCombination !== null) {
        const combination = [...remainderCombination, number]
        // If the combination is null or shorter then the current "shortest," update it
        if (
          shortestCombination === null ||
          combination.length < shortestCombination.length
        ) {
          shortestCombination = combination
        }
      }
    }

    return shortestCombination
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(n * (m^2)); Space Complexity: O(m^2)
   * @param {number} target the target sum that is being compared against
   * @param {[number]} numbers the array of integers to calculate the target sum
   * @param {{}} memory the array that stores the past answers to similar calculations
   * @returns the shortest array combination possible for the target sum
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

    let shortestCombination = null

    for (let number of numbers) {
      const remainder = target - number
      const remainderCombination = this.memorization(remainder, numbers, memory)
      if (remainderCombination !== null) {
        const combination = [...remainderCombination, number]
        // If the combination is null or shorter then the current "shortest," update it
        if (
          shortestCombination === null ||
          combination.length < shortestCombination.length
        ) {
          shortestCombination = combination
        }
      }
    }

    memory[target] = shortestCombination
    return memory[target]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O(n * (m^2)); Space Complexity: O(?)
   * @param {number} target the target sum that is being compared against
   * @param {[number]} numbers the array of integers to calculate the target sum
   * @returns the shortest array combination possible for the target sum
   */
  tabulation(target, numbers) {
    // Prevents a negative number
    for (let number of numbers) {
      if (number < 0) {
        throw Error('Negative Number!')
      }
    }

    const table = Array(target + 1).fill(null)
    table[0] = [] // The base case of BestSum

    for (let index = 0; index <= target; ++index) {
      if (table[index] !== null) {
        for (let number of numbers) {
          const combination = [...table[index], number]
          // If this current combination is not null or shorter then what is stored already
          if (
            !table[index + number] ||
            combination.length < table[index + number].length
          ) {
            table[index + number] = combination
          }
        }
      }
    }

    return table[target]
  }
}

console.log('Brute Force:')
console.log(new BestSum().naive(7, [2, 3, 5, 7])) // [7]
console.log(new BestSum().naive(8, [2, 3, 5])) // [3, 5]
console.log(new BestSum().naive(8, [1, 4, 5])) // [4, 4]

// Commented out because of the time complexity: O((n^m) * m)
// console.log(new BestSum().naive(100, [1, 2, 5, 25]));  // [25, 25, 25, 25]

console.log('\nMemorization:')
console.log(new BestSum().memorization(7, [2, 3, 5, 7])) // [7]
console.log(new BestSum().memorization(8, [2, 3, 5])) // [3, 5]
console.log(new BestSum().memorization(8, [1, 4, 5])) // [4, 4]

console.log(new BestSum().memorization(100, [1, 2, 5, 25])) // [25, 25, 25, 25]

console.log('\nTabluation:')
console.log(new BestSum().tabulation(7, [2, 3, 5, 7])) // [7]
console.log(new BestSum().tabulation(8, [2, 3, 5])) // [3, 5]
console.log(new BestSum().tabulation(8, [1, 4, 5])) // [4, 4]

console.log(new BestSum().tabulation(100, [1, 2, 5, 25])) // [25, 25, 25, 25]

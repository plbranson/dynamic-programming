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
 * Say that you are a traveler on a 2D grid (two-dimensional). You begin in the top-left corner and you goal is to
 * travel to the bottom-right corner. You may only move down or right. In how many ways can you travel to the goal on
 * a grid with dimensions M * N or length * width. I will be using length * width.
 */
class GridTaveler {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O(2^(n+m)); Space Complexity: O(n+m)
   * @param {number} length the length of the two-dimensional grid
   * @param {number} width the width of the two-dimensional grid
   * @returns the number of possible ways to reach the goal
   */
  naive(length, width) {
    if (length < 0 || width < 0) {
      throw Error('Negative Number!')
    }

    if (length === 0 || width === 0) {
      return 0
    }

    if (length === 1 && width === 1) {
      return 1
    }

    return this.naive(length - 1, width) + this.naive(length, width - 1)
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(mn); Space Complexity: O(n+m)
   * @param {number} length the length of the two-dimensional grid
   * @param {number} width the width of the two-dimensional grid
   * @returns the number of possible ways to reach the goal
   */
  memorization(length, width, memory = {}) {
    if (length < 0 || width < 0) {
      throw Error('Negative Number!')
    }

    const key = length + ', ' + width

    if (key in memory) {
      return memory[key]
    }

    if (length === 0 || width === 0) {
      return 0
    }

    if (length === 1 && width === 1) {
      return 1
    }

    // This is similar to the naive GridTraveler(length - 1, width) + GridTraveler(length, width - 1)
    // However, this function has a memory constraint so it does not have to do any extra calculations
    memory[key] =
      this.memorization(length - 1, width, memory) +
      this.memorization(length, width - 1, memory)

    return memory[key]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O(mn); Space Complexity: O(mn)
   * @param {number} length the length of the two-dimensional grid
   * @param {number} width the width of the two-dimensional grid
   * @returns the number of possible ways to reach the goal
   */
  tabulation(length, width) {
    if (length < 0 || width < 0) {
      throw Error('Negative Number!')
    }

    // Basically this line of code creates a two-dimensional array and fills it with zeros
    const table = Array(length + 1)
      .fill()
      .map(() => Array(width + 1).fill(0))

    table[1][1] = 1

    for (let i = 0; i <= length; ++i) {
      for (let j = 0; j <= width; ++j) {
        const current = table[i][j]
        if (j + 1 <= width) {
          table[i][j + 1] += current
        }

        if (i + 1 <= length) {
          table[i + 1][j] += current
        }
      }
    }

    return table[length][width]
  }
}

console.log('Brute Force:')
console.log(new GridTaveler().naive(1, 1)) // 1
console.log(new GridTaveler().naive(2, 3)) // 3
console.log(new GridTaveler().naive(3, 2)) // 3
console.log(new GridTaveler().naive(3, 3)) // 6

// Commented out because of the time complexity: O(2^(n+m))
// console.log(new GridTaveler().naive(18, 18)); // 2333606220

console.log('\nMemorization:')
console.log(new GridTaveler().memorization(1, 1)) // 1
console.log(new GridTaveler().memorization(2, 3)) // 3
console.log(new GridTaveler().memorization(3, 2)) // 3
console.log(new GridTaveler().memorization(3, 3)) // 6

console.log(new GridTaveler().memorization(18, 18)) // 2333606220

console.log('\nTabluation:')
console.log(new GridTaveler().tabulation(1, 1)) // 1
console.log(new GridTaveler().tabulation(2, 3)) // 3
console.log(new GridTaveler().tabulation(3, 2)) // 3
console.log(new GridTaveler().tabulation(3, 3)) // 6

console.log(new GridTaveler().tabulation(18, 18)) // 2333606220

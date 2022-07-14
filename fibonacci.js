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
 * Citation: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * "Fibonacci numbers, commonly denoted Fn, form a sequence, called the Fibonacci sequence, such that each number is the
 * sum of the two preceding ones, starting from 0 and 1..."
 *
 * "The beginning of the sequence is thus: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ..."
 *
 * "Fibonacci numbers are strongly related to the golden ratio: Binet's formula expresses the nth Fibonacci number in
 * terms of n and the golden ratio, and implies that the ratio of two consecutive Fibonacci numbers tends to the
 * golden ratio as n increases."
 *
 * "Fibonacci numbers are named after the Italian mathematician Leonardo of Pisa, later known as Fibonacci. In his
 * 1202 book Liber Abaci, Fibonacci introduced the sequence to Western European mathematics, although the sequence had
 * been described earlier in Indianas mathematics, as early 200 BC in work by Pingala on enumerating possible
 * patterns of Sanskrit poetry formed from syllables of two lengths."
 *
 * "Fibonacci numbers appear unexpectedly often in mathematics, so much so that there is an entire journal dedicated to
 * their study, the Fibonacci Quarterly. Applications of Fibonacci numbers include computer algorithms such as the
 * Fibonacci search technique and the Fibonacci heap data structure, and graphs called Fibonacci cubes used for
 * interconnecting parallel and distributed systems."
 *
 * "They also appear in biological settings, such as branching in trees, the arrangement of leaves on a stem, the fruit
 * sprouts of a pineapple, the flowering of an artichoke, an uncurling fern, and the arrangement of a pine cone's
 * bracts."
 */
class Fibonacci {
  constructor() {}

  /**
   * The brute force (naive) approach
   * Note: Time Complexity: O(2^n); Space Complexity: O(n)
   * @param {number} number the number (term) in the Fibonacci Series
   * @returns the value of the element at a specific term in the Fibonacci Series
   */
  naive(number) {
    if (number < 0) {
      throw Error('Negative Number!')
    }

    if (number == 0 || number == 1) {
      return number
    }

    return this.naive(number - 1) + this.naive(number - 2)
  }

  /**
   * The memorization (top-down) approach
   * Note: Time Complexity: O(n); Space Complexity: O(n)
   * @param {number} number the number (term) in the Fibonacci Series
   * @param {{}} memory the array that sores the past answers to similar calculations
   * @returns the value of the element at a specific term in the Fibonacci Series
   */
  memorization(number, memory = {}) {
    if (number < 0) {
      throw Error('Negative Number!')
    }

    if (number in memory) {
      return memory[number]
    }

    if (number == 0 || number == 1) {
      return number
    }

    // This is similar to the naive Fibonacci(number - 1) + Fibonacci(number - 2) recursive call
    // However, this function has a memory constraint so it does not have to do any extra calculations
    memory[number] =
      this.memorization(number - 1, memory) +
      this.memorization(number - 2, memory)

    return memory[number]
  }

  /**
   * The tabulation (bottom-up) approach
   * Note: Time Complexity: O(n); Space Complexity: O(n)
   * @param {number} number the number (term) in the Fibonacci Series
   * @returns the value of the element at a specific term in the Fibonacci Series
   */

  tabulation(number) {
    if (number < 0) {
      throw Error('Negative Number!')
    }

    const table = Array(number + 1).fill(0)
    table[1] = 1 // The base case of Fibonacci Series
    for (let index = 0; index <= number; ++index) {
      table[index + 1] += table[index]
      table[index + 2] += table[index]
    }

    return table[number]
  }
}

console.log('Brute Force:')
console.log(new Fibonacci().naive(6)) // 8
console.log(new Fibonacci().naive(7)) // 13
console.log(new Fibonacci().naive(8)) // 21

// Commented out because of the time complexity: O(2^n)
// console.log(new Fibonacci().naive(50)); // 12586269025

console.log('\nMemorization:')
console.log(new Fibonacci().memorization(6)) // 8
console.log(new Fibonacci().memorization(7)) // 13
console.log(new Fibonacci().memorization(8)) // 21

console.log(new Fibonacci().memorization(50)) // 12586269025

console.log('\nTabluation:')
console.log(new Fibonacci().tabulation(6)) // 8
console.log(new Fibonacci().tabulation(7)) // 13
console.log(new Fibonacci().tabulation(8)) // 21

console.log(new Fibonacci().tabulation(50)) // 12586269025

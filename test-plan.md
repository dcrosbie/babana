# Test Plan for frequencyTable Function

## Overview
This document outlines the test plan for the `frequencyTable(banana)` function, which counts the frequency of each item in an array.

## Test Objectives
- Verify the function correctly counts frequencies of items in various scenarios
- Ensure edge cases are handled appropriately
- Validate the output format and structure

## Test Cases

### 1. Basic Functionality Tests

#### TC-001: Simple array with unique items
- **Input**: `[1, 2, 3, 4]`
- **Expected Output**: `{1: 1, 2: 1, 3: 1, 4: 1}`
- **Priority**: High

#### TC-002: Array with duplicate items
- **Input**: `[1, 2, 2, 3, 3, 3]`
- **Expected Output**: `{1: 1, 2: 2, 3: 3}`
- **Priority**: High

#### TC-003: Array with all same items
- **Input**: `[5, 5, 5, 5, 5]`
- **Expected Output**: `{5: 5}`
- **Priority**: High

### 2. Data Type Tests

#### TC-004: String array
- **Input**: `['a', 'b', 'a', 'c', 'b', 'a']`
- **Expected Output**: `{a: 3, b: 2, c: 1}`
- **Priority**: High

#### TC-005: Mixed types array
- **Input**: `[1, '1', 1, '1', 'a']`
- **Expected Output**: `{'1': 4, 'a': 1}`
- **Note**: JavaScript converts object keys to strings, so numeric `1` and string `'1'` both become the string key `'1'`
- **Priority**: Medium

#### TC-006: Array with null/undefined
- **Input**: `[null, undefined, null, 'test']`
- **Expected Output**: `{null: 2, undefined: 1, 'test': 1}`
- **Priority**: Medium

#### TC-007: Array with boolean values
- **Input**: `[true, false, true, true, false]`
- **Expected Output**: `{true: 3, false: 2}`
- **Priority**: Medium

### 3. Edge Cases

#### TC-008: Empty array
- **Input**: `[]`
- **Expected Output**: `{}`
- **Priority**: High

#### TC-009: Single item array
- **Input**: `[42]`
- **Expected Output**: `{42: 1}`
- **Priority**: Medium

#### TC-010: Large array
- **Input**: Array with 1000+ items
- **Expected Output**: Correct frequency count for all items
- **Priority**: Low

#### TC-011: Array with objects as keys
- **Input**: `[{a: 1}, {a: 1}, {b: 2}]`
- **Expected Output**: Each object treated as unique key
- **Priority**: Low

#### TC-012: Array with arrays as items
- **Input**: `[[1, 2], [1, 2], [3, 4]]`
- **Expected Output**: Arrays treated as keys (comparison by reference)
- **Priority**: Low

### 4. Special Characters and Unicode

#### TC-013: Unicode characters
- **Input**: `['🚀', '🍌', '🚀', '🍌', '🍌']`
- **Expected Output**: `{'🚀': 2, '🍌': 3}`
- **Priority**: Medium

#### TC-014: Special string characters
- **Input**: `['', ' ', '  ', '', ' ']`
- **Expected Output**: Correct frequency for empty strings and spaces
- **Priority**: Medium

### 5. Performance Tests

#### TC-015: Performance with large dataset
- **Input**: Array with 10,000 items
- **Expected**: Function completes in reasonable time (< 100ms)
- **Priority**: Low

## Test Environment
- JavaScript runtime: Node.js or Browser
- No external dependencies required (pure JavaScript function)

## Testing Approach
1. Manual testing using console/REPL
2. Automated testing with test framework (Jest, Mocha, or custom test runner)
3. Integration testing in actual use cases

## Pass/Fail Criteria
- All High priority test cases must pass
- At least 80% of Medium priority test cases should pass
- Low priority test cases are optional but recommended

## Notes
- The function treats array items as object keys, so objects and arrays will be compared by reference, not by value
- The function does not validate input (assumes array is passed)
- Consider adding input validation in production code


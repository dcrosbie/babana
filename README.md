# babana - Frequency Table Function

A simple, optimized JavaScript function that counts the frequency of each item in an array. Returns an object mapping each unique item to its occurrence count.

## Overview

The `frequencyTable` function analyzes an input array and returns an object where:
- **Keys**: Each unique item from the input array
- **Values**: The number of times each item appears in the array

## Features

- ✅ **Optimized**: Uses nullish coalescing operator for concise, performant code
- ✅ **Type-safe**: Input validation with clear error messages
- ✅ **Flexible**: Handles any data type (numbers, strings, booleans, null, undefined, objects)
- ✅ **Well-tested**: 15 comprehensive test cases with 100% pass rate
- ✅ **Documented**: Full JSDoc documentation with examples

## Installation

Simply copy the `babana` file to your project directory, or use it directly.

## Function Signature

```javascript
function frequencyTable(banana) -> Object
```

### Parameters

- **`banana`** `{Array}` - The input array to analyze. Can contain any data types.

### Returns

- **`Object`** - An object mapping each unique item to its frequency count.

### Throws

- **`TypeError`** - If the input is not an array.

## Usage Examples

### Basic Usage

```javascript
// Count frequencies in an array of numbers
frequencyTable([1, 2, 2, 3, 3, 3]);
// Returns: {1: 1, 2: 2, 3: 3}

// Count frequencies in an array of strings
frequencyTable(['a', 'b', 'a', 'c', 'b', 'a']);
// Returns: {a: 3, b: 2, c: 1}
```

### Handling Different Data Types

```javascript
// Count frequencies in a mixed-type array
frequencyTable([1, '1', 1, '1', 'a']);
// Returns: {'1': 4, 'a': 1}
// Note: JavaScript converts object keys to strings, so numeric 1 and string '1' both become '1'

// Handle null and undefined values
frequencyTable([null, undefined, null, 'test']);
// Returns: {null: 2, undefined: 1, 'test': 1}

// Count frequencies in an array with boolean values
frequencyTable([true, false, true, true, false]);
// Returns: {true: 3, false: 2}
```

### Edge Cases

```javascript
// Handle empty array
frequencyTable([]);
// Returns: {}

// Handle single item array
frequencyTable([42]);
// Returns: {42: 1}
```

### Special Characters and Unicode

```javascript
// Count frequencies with Unicode characters
frequencyTable(['🚀', '🍌', '🚀', '🍌', '🍌']);
// Returns: {'🚀': 2, '🍌': 3}

// Handle special string characters
frequencyTable(['', ' ', '  ', '', ' ']);
// Returns: {'': 2, ' ': 2, '  ': 1}
```

### Error Handling

```javascript
// Input validation
frequencyTable('not-an-array');
// Throws: TypeError: Input must be an array

frequencyTable(null);
// Throws: TypeError: Input must be an array

frequencyTable({a: 1, b: 2});
// Throws: TypeError: Input must be an array
```

## Implementation Details

### Optimized Code

The function uses the nullish coalescing operator (`??`) for efficient counting:

```javascript
freq[item] = (freq[item] ?? 0) + 1;
```

This is more concise and performant than traditional conditional logic.

### Time Complexity

- **Time**: O(n) where n is the length of the input array
- **Space**: O(k) where k is the number of unique items in the array

### Performance

- Average execution time: 0-1ms for typical inputs
- Handles large arrays efficiently (tested with 1000+ items)

## Testing

Run the comprehensive test suite:

```bash
node babana.test.js
```

### Test Coverage

The test suite includes 15 test cases covering:

1. **Basic Functionality** (3 tests)
   - Arrays with unique items
   - Arrays with duplicate items
   - Arrays with all same items

2. **Data Type Tests** (4 tests)
   - String arrays
   - Mixed type arrays
   - Null/undefined handling
   - Boolean values

3. **Edge Cases** (2 tests)
   - Empty arrays
   - Single item arrays

4. **Special Cases** (2 tests)
   - Unicode characters
   - Special string characters

5. **Performance** (1 test)
   - Large arrays (1000+ items)

6. **Input Validation** (3 tests)
   - Non-array input
   - Null input
   - Object input

### Test Results

```
Tests passed: 15/15
Success rate: 100.0%
Average execution time: 0-1ms
```

See `test-plan.md` for detailed test documentation.

## Code Documentation

The function includes comprehensive JSDoc documentation:

- Parameter descriptions with types
- Return value documentation
- Error documentation
- Multiple usage examples
- Inline code comments explaining logic

View the full documentation in the `babana` file.

## Repository Structure

```
babana/
├── babana                    # Main function file
├── babana.test.js            # Comprehensive test suite
├── README.md                 # This file
├── test-plan.md             # Detailed test plan documentation
└── OPTIMIZATION_SUGGESTIONS.md  # Code optimization analysis
```

## License

This code is provided as-is for educational and practical use.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests.

## Changelog

### Version 1.1.0 (Optimized)
- ✅ Added input validation with clear error messages
- ✅ Optimized conditional logic using nullish coalescing operator
- ✅ Added comprehensive JSDoc documentation
- ✅ Added 3 new validation tests
- ✅ Improved code readability and maintainability

### Version 1.0.0 (Initial)
- ✅ Basic frequency counting functionality
- ✅ 12 comprehensive test cases
- ✅ Test results table display


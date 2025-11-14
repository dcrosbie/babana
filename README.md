# babana - Frequency Table Function

A simple JavaScript function that counts the frequency of each item in an array.

## Function

```javascript
function frequencyTable(banana) {
    const freq = {};
    for (const item of banana) {
        if (freq[item] === undefined) {
            freq[item] = 1;
        } else {
            freq[item]++;
        }
    }
    return freq;
}
```

## Usage

```javascript
// Example 1: Count numbers
frequencyTable([1, 2, 2, 3, 3, 3]);
// Returns: {1: 1, 2: 2, 3: 3}

// Example 2: Count strings
frequencyTable(['a', 'b', 'a', 'c', 'b', 'a']);
// Returns: {a: 3, b: 2, c: 1}

// Example 3: Count mixed types
frequencyTable([1, '1', 1, '1', 'a']);
// Returns: {1: 2, '1': 2, 'a': 1}
```

## Testing

Run the test suite:

```bash
node babana.test.js
```

See `test-plan.md` for detailed test documentation.

## Test Plan

The test plan covers:
- Basic functionality (unique items, duplicates)
- Different data types (numbers, strings, booleans, null, undefined)
- Edge cases (empty arrays, single items, large arrays)
- Special characters and Unicode

See `test-plan.md` for the complete test plan.


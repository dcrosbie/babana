// Test suite for frequencyTable function
// Run with: node babana.test.js

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

// Simple test framework
function test(name, fn) {
    try {
        fn();
        console.log(`✓ ${name}`);
        return true;
    } catch (error) {
        console.error(`✗ ${name}`);
        console.error(`  Error: ${error.message}`);
        return false;
    }
}

function assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}

function assertDeepEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
}

// Test Cases

console.log('Running frequencyTable Tests\n');

let passed = 0;
let total = 0;

// TC-001: Simple array with unique items
test('TC-001: Array with unique items', () => {
    total++;
    const result = frequencyTable([1, 2, 3, 4]);
    assertDeepEqual(result, {1: 1, 2: 1, 3: 1, 4: 1});
    passed++;
});

// TC-002: Array with duplicate items
test('TC-002: Array with duplicate items', () => {
    total++;
    const result = frequencyTable([1, 2, 2, 3, 3, 3]);
    assertDeepEqual(result, {1: 1, 2: 2, 3: 3});
    passed++;
});

// TC-003: Array with all same items
test('TC-003: Array with all same items', () => {
    total++;
    const result = frequencyTable([5, 5, 5, 5, 5]);
    assertDeepEqual(result, {5: 5});
    passed++;
});

// TC-004: String array
test('TC-004: String array', () => {
    total++;
    const result = frequencyTable(['a', 'b', 'a', 'c', 'b', 'a']);
    assertDeepEqual(result, {a: 3, b: 2, c: 1});
    passed++;
});

// TC-005: Mixed types array
test('TC-005: Mixed types array', () => {
    total++;
    const result = frequencyTable([1, '1', 1, '1', 'a']);
    assertDeepEqual(result, {1: 2, '1': 2, 'a': 1});
    passed++;
});

// TC-006: Array with null/undefined
test('TC-006: Array with null/undefined', () => {
    total++;
    const result = frequencyTable([null, undefined, null, 'test']);
    assertDeepEqual(result, {null: 2, undefined: 1, 'test': 1});
    passed++;
});

// TC-007: Array with boolean values
test('TC-007: Array with boolean values', () => {
    total++;
    const result = frequencyTable([true, false, true, true, false]);
    assertDeepEqual(result, {true: 3, false: 2});
    passed++;
});

// TC-008: Empty array
test('TC-008: Empty array', () => {
    total++;
    const result = frequencyTable([]);
    assertDeepEqual(result, {});
    passed++;
});

// TC-009: Single item array
test('TC-009: Single item array', () => {
    total++;
    const result = frequencyTable([42]);
    assertDeepEqual(result, {42: 1});
    passed++;
});

// TC-010: Unicode characters
test('TC-010: Unicode characters', () => {
    total++;
    const result = frequencyTable(['🚀', '🍌', '🚀', '🍌', '🍌']);
    assertDeepEqual(result, {'🚀': 2, '🍌': 3});
    passed++;
});

// TC-011: Special string characters (empty strings and spaces)
test('TC-011: Special string characters', () => {
    total++;
    const result = frequencyTable(['', ' ', '  ', '', ' ']);
    assertDeepEqual(result, {'': 2, ' ': 2, '  ': 1});
    passed++;
});

// TC-012: Large array
test('TC-012: Large array', () => {
    total++;
    const largeArray = [];
    for (let i = 0; i < 1000; i++) {
        largeArray.push(i % 10); // Numbers 0-9 repeating
    }
    const result = frequencyTable(largeArray);
    // Each number 0-9 should appear 100 times
    const expected = {};
    for (let i = 0; i < 10; i++) {
        expected[i] = 100;
    }
    assertDeepEqual(result, expected);
    passed++;
});

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests passed: ${passed}/${total}`);
console.log(`Success rate: ${((passed/total)*100).toFixed(1)}%`);
if (passed === total) {
    console.log('🎉 All tests passed!');
} else {
    console.log(`⚠️  ${total - passed} test(s) failed`);
}


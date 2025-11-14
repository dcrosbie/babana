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

// Test results storage
const testResults = [];

// Simple test framework
function test(name, fn) {
    const startTime = Date.now();
    try {
        fn();
        const duration = Date.now() - startTime;
        testResults.push({
            testCase: name,
            status: 'PASS',
            duration: duration,
            error: null
        });
        console.log(`✓ ${name}`);
        return true;
    } catch (error) {
        const duration = Date.now() - startTime;
        testResults.push({
            testCase: name,
            status: 'FAIL',
            duration: duration,
            error: error.message
        });
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
    // Note: JavaScript converts object keys to strings, so 1 and '1' both become '1'
    assertDeepEqual(result, {'1': 4, 'a': 1});
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

// Function to display test results in a table
function displayTestResultsTable(results) {
    console.log('\n' + '='.repeat(90));
    console.log('TEST RESULTS TABLE');
    console.log('='.repeat(90));
    
    // Table header
    console.log(
        '| ' +
        'Test Case'.padEnd(40) + ' | ' +
        'Status'.padEnd(8) + ' | ' +
        'Duration (ms)'.padEnd(13) + ' | ' +
        'Error Message'.padEnd(25) + ' |'
    );
    console.log('|' + '-'.repeat(42) + '|' + '-'.repeat(10) + '|' + '-'.repeat(15) + '|' + '-'.repeat(27) + '|');
    
    // Table rows
    results.forEach(result => {
        const status = result.status === 'PASS' ? '✓ PASS' : '✗ FAIL';
        const duration = result.duration.toString().padStart(11);
        const error = result.error ? result.error.substring(0, 23) : '-';
        
        console.log(
            '| ' +
            result.testCase.padEnd(40) + ' | ' +
            status.padEnd(8) + ' | ' +
            duration.padEnd(13) + ' | ' +
            error.padEnd(25) + ' |'
        );
    });
    
    // Summary footer
    const passed = results.filter(r => r.status === 'PASS').length;
    const failed = results.filter(r => r.status === 'FAIL').length;
    const total = results.length;
    const successRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    const avgDuration = total > 0 ? (totalDuration / total).toFixed(2) : 0;
    
    console.log('|' + '-'.repeat(42) + '|' + '-'.repeat(10) + '|' + '-'.repeat(15) + '|' + '-'.repeat(27) + '|');
    console.log(
        '| ' +
        'SUMMARY'.padEnd(40) + ' | ' +
        `${passed}/${total}`.padEnd(8) + ' | ' +
        `${avgDuration} avg`.padEnd(13) + ' | ' +
        `${successRate}% success`.padEnd(25) + ' |'
    );
    console.log('='.repeat(90));
    
    // Final status message
    if (passed === total) {
        console.log('🎉 All tests passed!');
    } else {
        console.log(`⚠️  ${failed} test(s) failed`);
    }
    console.log(`⏱️  Total execution time: ${totalDuration}ms\n`);
}

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests passed: ${passed}/${total}`);
console.log(`Success rate: ${((passed/total)*100).toFixed(1)}%`);
if (passed === total) {
    console.log('🎉 All tests passed!');
} else {
    console.log(`⚠️  ${total - passed} test(s) failed`);
}

// Display results table
displayTestResultsTable(testResults);


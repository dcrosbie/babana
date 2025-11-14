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

// Helper function to format input data for display
function formatInputData(input, maxLength = 30) {
    let formatted;
    if (Array.isArray(input)) {
        if (input.length === 0) {
            formatted = '[]';
        } else if (input.length > 20) {
            // For large arrays, show a summary
            const sample = input.slice(0, 3);
            // Handle undefined values in sample
            const sampleStr = sample.map(item => 
                item === undefined ? 'undefined' : JSON.stringify(item)
            ).join(',');
            formatted = `[${input.length} items: ${sampleStr}...]`;
        } else {
            // Replace undefined with 'undefined' string for display
            const arrStr = input.map(item => 
                item === undefined ? 'undefined' : JSON.stringify(item)
            ).join(',');
            formatted = `[${arrStr}]`;
        }
    } else {
        formatted = JSON.stringify(input);
    }
    
    // Truncate if too long
    if (formatted.length > maxLength) {
        return formatted.substring(0, maxLength - 3) + '...';
    }
    return formatted;
}

// Simple test framework
function test(name, inputData, fn) {
    const startTime = Date.now();
    try {
        fn();
        const duration = Date.now() - startTime;
        testResults.push({
            testCase: name,
            inputData: inputData,
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
            inputData: inputData,
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
const input001 = [1, 2, 3, 4];
test('TC-001: Array with unique items', input001, () => {
    total++;
    const result = frequencyTable(input001);
    assertDeepEqual(result, {1: 1, 2: 1, 3: 1, 4: 1});
    passed++;
});

// TC-002: Array with duplicate items
const input002 = [1, 2, 2, 3, 3, 3];
test('TC-002: Array with duplicate items', input002, () => {
    total++;
    const result = frequencyTable(input002);
    assertDeepEqual(result, {1: 1, 2: 2, 3: 3});
    passed++;
});

// TC-003: Array with all same items
const input003 = [5, 5, 5, 5, 5];
test('TC-003: Array with all same items', input003, () => {
    total++;
    const result = frequencyTable(input003);
    assertDeepEqual(result, {5: 5});
    passed++;
});

// TC-004: String array
const input004 = ['a', 'b', 'a', 'c', 'b', 'a'];
test('TC-004: String array', input004, () => {
    total++;
    const result = frequencyTable(input004);
    assertDeepEqual(result, {a: 3, b: 2, c: 1});
    passed++;
});

// TC-005: Mixed types array
const input005 = [1, '1', 1, '1', 'a'];
test('TC-005: Mixed types array', input005, () => {
    total++;
    const result = frequencyTable(input005);
    // Note: JavaScript converts object keys to strings, so 1 and '1' both become '1'
    assertDeepEqual(result, {'1': 4, 'a': 1});
    passed++;
});

// TC-006: Array with null/undefined
const input006 = [null, undefined, null, 'test'];
test('TC-006: Array with null/undefined', input006, () => {
    total++;
    const result = frequencyTable(input006);
    assertDeepEqual(result, {null: 2, undefined: 1, 'test': 1});
    passed++;
});

// TC-007: Array with boolean values
const input007 = [true, false, true, true, false];
test('TC-007: Array with boolean values', input007, () => {
    total++;
    const result = frequencyTable(input007);
    assertDeepEqual(result, {true: 3, false: 2});
    passed++;
});

// TC-008: Empty array
const input008 = [];
test('TC-008: Empty array', input008, () => {
    total++;
    const result = frequencyTable(input008);
    assertDeepEqual(result, {});
    passed++;
});

// TC-009: Single item array
const input009 = [42];
test('TC-009: Single item array', input009, () => {
    total++;
    const result = frequencyTable(input009);
    assertDeepEqual(result, {42: 1});
    passed++;
});

// TC-010: Unicode characters
const input010 = ['🚀', '🍌', '🚀', '🍌', '🍌'];
test('TC-010: Unicode characters', input010, () => {
    total++;
    const result = frequencyTable(input010);
    assertDeepEqual(result, {'🚀': 2, '🍌': 3});
    passed++;
});

// TC-011: Special string characters (empty strings and spaces)
const input011 = ['', ' ', '  ', '', ' '];
test('TC-011: Special string characters', input011, () => {
    total++;
    const result = frequencyTable(input011);
    assertDeepEqual(result, {'': 2, ' ': 2, '  ': 1});
    passed++;
});

// TC-012: Large array
const input012 = (() => {
    const largeArray = [];
    for (let i = 0; i < 1000; i++) {
        largeArray.push(i % 10); // Numbers 0-9 repeating
    }
    return largeArray;
})();
test('TC-012: Large array', input012, () => {
    total++;
    const result = frequencyTable(input012);
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
    console.log('\n' + '='.repeat(130));
    console.log('TEST RESULTS TABLE');
    console.log('='.repeat(130));
    
    // Table header
    console.log(
        '| ' +
        'Test Case'.padEnd(35) + ' | ' +
        'Input Data'.padEnd(30) + ' | ' +
        'Status'.padEnd(8) + ' | ' +
        'Duration (ms)'.padEnd(13) + ' | ' +
        'Error Message'.padEnd(25) + ' |'
    );
    console.log('|' + '-'.repeat(37) + '|' + '-'.repeat(32) + '|' + '-'.repeat(10) + '|' + '-'.repeat(15) + '|' + '-'.repeat(27) + '|');
    
    // Table rows
    results.forEach(result => {
        const status = result.status === 'PASS' ? '✓ PASS' : '✗ FAIL';
        const duration = result.duration.toString().padStart(11);
        const error = result.error ? result.error.substring(0, 23) : '-';
        const inputData = formatInputData(result.inputData, 28);
        
        console.log(
            '| ' +
            result.testCase.padEnd(35) + ' | ' +
            inputData.padEnd(30) + ' | ' +
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
    
    console.log('|' + '-'.repeat(37) + '|' + '-'.repeat(32) + '|' + '-'.repeat(10) + '|' + '-'.repeat(15) + '|' + '-'.repeat(27) + '|');
    console.log(
        '| ' +
        'SUMMARY'.padEnd(35) + ' | ' +
        '-'.padEnd(30) + ' | ' +
        `${passed}/${total}`.padEnd(8) + ' | ' +
        `${avgDuration} avg`.padEnd(13) + ' | ' +
        `${successRate}% success`.padEnd(25) + ' |'
    );
    console.log('='.repeat(130));
    
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


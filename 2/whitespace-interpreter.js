// http://www.codewars.com/kata/52dc4688eca89d0f820004c6/train/javascript

// Code is started with which operation.
const op = (ops, code) => {
  for (let i; i < ops.length; i++) {
    if (code.startsWith(ops[i])) {
      return [i, code.substr(ops[i].length)];
    }
  }
  return [-1, ''];
};

const _ops = {
  ' ': { // stack manipulation
    ' ': push_n,    // push(n)
    '\t ': dup_n,  // dupn(n); dup nth value from top
    '\t\n': dis_n, // disn(n); discard top n values
    '\n ': dup,   // dup; dup top
    '\n\t': swap, // swap; swap top with top-1
    '\n\n': dis,  // dis; discard top
  },
  '\t ': { // arithmetic: pop a, pop b and
    '  ': add_nn,    // push (b+a)
    ' \t': sub_nn,   // push (b-a)
    ' \n': mul_nn,   // push (b*a)
    '\t ': div_nn,   // push (b/a); b//a
    '\t\t': mod_nn,  // push (b%a);
  },
  '\t\t': { // heap access
    ' ': allocate, // allocate(a, b)
    '\t': realloc, // allocate(a); // pop a and allocate and push
  },
  '\t\n': { // input and output
    '  ': putch,      // pop and print as char
    ' \t': putn,      // pop and print as num
    '\t ': getch,     // read char from input, pop addr, alloc(ch, addr)
    '\t\t': getn,     // read n from input, pop addr, alloc(n, addr)
  },
  '\n': { // flow control
    '  ': mark_l,     // mark a location ??
    ' \t': call_l,    // call label as a subroutine
    ' \n': jmp_l,     // jump to label
    '\t ': jez_l,     // jump to label if pop equals zero
    '\t\t': jlz_l,    // jump to label if pop less than zero
    '\t\n': ret,      // exit subroutine and return
    '\n\n': exit,     // exit program
  },
};



const stack = (memory, code) => {
  const ops = [
    ' ',    // n: push n
    '\t ',  // n: dup nth value
    '\t\n', // n: discard top n values
    '\n ',  // dup top
    '\n\t', // dup top, top-1
    '\n\n', // discard top
  ];

  const o = op(ops, code);
  if (o === -1) { return [{}, '']; }

  
};

const exec = [
  stack,
  arith,
  heap,
  io,
  flow,
];

const ops = [
  ' ',      // Stack Manipulation
  '\t',     // Arithmetic
  '\t\t',   // Heap Access
  '\t\n',   // Input & Output
  '\n',     // Flow Control
];

const parse = (readp) => {
  const o = op(ops, readp[1]);
  if (o[0] === -1) {
    return [{}, ''];
  }

  return exec[o[0]](readp[0], o[1]);
};



// solution
const whitespace = (code, input) => {
  const output = '';
  const stack = [];
  const heap = {};
  const memory = {
    ouptput, stack, heap, input,
  };

  for (let readp = [memory, code];
           readp[1].length > 0;
           readp = parse(readp));

  return output;
};

/**
 *  [space]: \s
 *  [tab]  : \t
 *  [line] : \n
 *
 *  - Number
 *  sign: { \t: -1, \s: 1 }
 *  terminal: \n
 *  binary: { \s: 0, \t: 1 }
 *  "[sign][term]": 0
 *  "[term]": throw Error
 *
 *  - Label
 *  form: [\t\s]*\n
 *  "\n": valid
 *  must be UNIQUE: need a cache.
 *  [label][command]: valid
 *  [command][label]: valid // WTF
 */

/**
 * mock Test
 */

const Test = {
  describe(desc, test) {
    try { test(); }
    catch (e) { console.error(e.stack); }
  },
  assertEquals(result, expected) {
    if (result !== expected)
      throw new Error;
  },
};

/**
 * TEST
 */
var desc = "Testing push, output of numbers 0 through 3";
Test.describe(desc, function () {
  var output1 = "   \t\n\t\n \t\n\n\n";
  var output2 = "   \t \n\t\n \t\n\n\n";
  var output3 = "   \t\t\n\t\n \t\n\n\n";
  var output0 = "    \n\t\n \t\n\n\n";

  Test.assertEquals(whitespace(output1), "1");
  Test.assertEquals(whitespace(output2), "2");
  Test.assertEquals(whitespace(output3), "3");
  Test.assertEquals(whitespace(output0), "0");
});

desc = "Testing ouput of numbers -1 through -3";
Test.describe(desc, function () {
  var outputNegative1 = "  \t\t\n\t\n \t\n\n\n";
  var outputNegative2 = "  \t\t \n\t\n \t\n\n\n";
  var outputNegative3 = "  \t\t\t\n\t\n \t\n\n\n";

  Test.assertEquals(whitespace(outputNegative1), "-1");
  Test.assertEquals(whitespace(outputNegative2), "-2");
  Test.assertEquals(whitespace(outputNegative3), "-3");
});

desc = "Testing simple flow control edge case";
Test.describe(desc, function () {
  desc = "Expecting exception for unclean termination";
  Test.expectError(desc, function () {
    whitespace("");
  });
});

desc = "Testing output of letters A through C";
Test.describe(desc, function () {
  var outputA = "   \t     \t\n\t\n  \n\n\n";
  var outputB = "   \t    \t \n\t\n  \n\n\n";
  var outputC = "   \t    \t\t\n\t\n  \n\n\n";

  Test.assertEquals(whitespace(outputA), "A");
  Test.assertEquals(whitespace(outputB), "B");
  Test.assertEquals(whitespace(outputC), "C");
});

desc = "Testing output of letters A through C with comments";
Test.describe(desc, function () {
  var outputA = "blahhhh   \targgggghhh     \t\n\t\n  \n\n\n";
  var outputB = " I heart \t  cats  \t \n\t\n  \n\n\n";
  var outputC = "   \t  welcome  \t\t\n\t\n to the\nnew\nworld\n";

  Test.assertEquals(whitespace(outputA), "A");
  Test.assertEquals(whitespace(outputB), "B");
  Test.assertEquals(whitespace(outputC), "C");
});

desc = "Testing stack functionality";
Test.describe(desc, function () {
  var pushTwice = "   \t\t\n   \t\t\n\t\n \t\t\n \t\n\n\n";
  var duplicate = "   \t\t\n \n \t\n \t\t\n \t\n\n\n";
  var duplicateN1 = "   \t\n   \t \n   \t\t\n \t  \t \n\t\n \t\n\n\n";
  var duplicateN2 = "   \t\n   \t \n   \t\t\n \t  \t\n\t\n \t\n\n\n";
  var duplicateN3 = "   \t\n   \t \n   \t\t\n \t   \n\t\n \t\n\n\n";
  var swap = "   \t\t\n   \t \n \n\t\t\n \t\t\n \t\n\n\n";
  var discard = "   \t\t\n   \t \n \n\t \n\n\t\n \t\n\n\n";
  var slide = "   \t\t\n   \t \n   \t\n   \t  \n   \t\t \n   \t \t\n   \t\t\t\n \n\t \t\n \t\t\n\t\n \t\t\n \t\t\n \t\t\n \t\n\n\n";

  Test.assertEquals(whitespace(pushTwice), "33");
  Test.assertEquals(whitespace(duplicate), "33");
  Test.assertEquals(whitespace(duplicateN1), "1");
  Test.assertEquals(whitespace(duplicateN2), "2");
  Test.assertEquals(whitespace(duplicateN3), "3");
  Test.assertEquals(whitespace(swap), "32");
  Test.assertEquals(whitespace(discard), "2");
  Test.assertEquals(whitespace(slide), "5123");
});

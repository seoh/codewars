// http://www.codewars.com/kata/52c4dd683bfd3b434c000292/train/javascript

/**
 * validators
 * @param <number> n
 * @return <number> 0-2
 *         - 0. nothing
 *         - 1. almost
 *         - 2. interesting
 */

const allZero = n => {
  const arr = n.toString().substr(1).split('');
  const r = arr.filter(a => a !== '0').length;
  if(r === 0) return 2;
  if(r === 1) return 1;
  return 0;
}
// console.log(allZero(1000))
// console.log(allZero(1001))
// console.log(allZero(1011))



function isInteresting(number, awesomePhrases) {
}



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

Test.describe('Basic inputs', function() {
  it('should work, dangit!', function() {
    Test.assertEquals(isInteresting(3, [1337, 256]),     0);
    Test.assertEquals(isInteresting(1336, [1337, 256]),  1);
    Test.assertEquals(isInteresting(1337, [1337, 256]),  2);
    Test.assertEquals(isInteresting(11208, [1337, 256]), 0);
    Test.assertEquals(isInteresting(11209, [1337, 256]), 1);
    Test.assertEquals(isInteresting(11211, [1337, 256]), 2);
  });
});
const invert = require("../src/utilFn");

test("Testing invert return", () => {
  expect(invert(true)).toBe(false);
});

test("Testing invert case", () => {
  expect(invert(true)).not.toBe(true);
});

test("Testing invert case", () => {
  expect(invert(false)).not.toBe(false);
});

test("Testing invert case", () => {
  expect(invert(false)).toBe(true);
});

test("atribuição de objeto", () => {
  const data = {
    card_number: "1111111111111111",
    cvv: 789,
    expiry_date: "01/18",
  };
  expect(data).toEqual({
    card_number: "1111111111111111",
    cvv: 789,
    expiry_date: "01/18",
  });
});

// test('numeric ranges', () => {  
//   expect({apples: 6, bananas: 3}).toEqual({
//     apples: toBeWithinRange(1, 10),
//     bananas: toBeWithinRange(1, 20),
//   });
// });
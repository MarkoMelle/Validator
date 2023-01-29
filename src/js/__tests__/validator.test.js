import getCardType from '../validator';

test.each([
  ['2222222222222222', 'mir'],
  ['4024007111746516', 'visa'],
  ['372434393189254', 'amex'],
  ['3528543453126084', 'jcb'],
  ['30381726840703', 'diners_club'],
  ['5360305061249203', 'master'],
  ['6011040857686216', 'discover'],
  ['0011040857686216', 'card'],
])('schould validate type of card', (nummer, expected) => {
  expect(getCardType(nummer)).toBe(expected);
});

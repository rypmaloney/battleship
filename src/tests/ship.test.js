import ship from '../ship';

const boat = ship(2)
test('Tests length', () => {
    expect(boat.length).toBe(2);
});

boat.hit('1a')
boat.hit('1b')



test('Tests hits are being logged', () => {
    expect(boat.hits.length).toBe(2);
});
test('Tests is sunk', () => {
    expect(boat.isSunk()).toBe(true);
});


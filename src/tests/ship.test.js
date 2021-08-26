import ship from '../ship';

const boat = ship(2)
test('Tests...', () => {
    expect(boat.length).toBe(2);
});
describe("IsAlive checks", function() {
  it("returns true when player has 10 HP", function() {
    expect(IsAlive({ health: { current: 10 }})).toBe(true);
  });

  it("returns false when player has 0 HP", function() {
    expect(IsAlive({ health: { current: 0 }})).toBe(false);
  });
});
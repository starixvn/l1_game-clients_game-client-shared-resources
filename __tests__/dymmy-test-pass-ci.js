describe("Basic Math Operations", () => {
  test("should add two numbers correctly", () => {
    expect(2 + 3).toBe(5);
    expect(-1 + 1).toBe(0);
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});

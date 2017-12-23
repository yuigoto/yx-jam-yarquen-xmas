namespace Xmas {
  /**
   * Shifts one value towards another by steps.
   *
   * @param {number} start
   * @param {number} end
   * @param {number} step
   * @returns {number}
   */
  export function approach(start: number, end: number, step: number): number {
    if (start > end) {
      return Math.max(start - step, end);
    }
    return Math.min(start + step, end);
  }

  /**
   * Restrict one value between min and max.
   *
   * @param {number} current
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  export function clamp(current: number, min: number, max: number): number {
    if (current < min) return min;
    if (current > max) return max;
    return current;
  }

  export function random(min: number, max: number): number {
    return Math.round(Math.random() * (max - min + 1)) + min;
  }

  export function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
  }
}
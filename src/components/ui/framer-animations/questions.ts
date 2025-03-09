/**
 * Animation variants for question transitions
 *
 * @param direction - The direction of animation:
 *                   -1 = animate to previous question
 *                    1 = animate to next question
 */

export type AnimationDirection = number; // -1 for previous, 1 for next

const questionsVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
};
export default questionsVariants;

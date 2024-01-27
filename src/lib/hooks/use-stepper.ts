import { useState } from 'react';

function useStepper(steps: React.JSX.Element[]) {
  const [current, setCurrent] = useState(0);
  const total = steps.length;
  const step = steps[current];
  const forward = () => {
    if (current === total - 1) {
      return setCurrent(total - 1);
    }
    setCurrent((prev) => prev + 1);
  };
  const backward = () => {
    if (current === 0) {
      return setCurrent(0);
    }
    setCurrent((prev) => prev - 1);
  };
  const goToIndex = (index: number) => {
    setCurrent(index);
  };

  return {
    current,
    total,
    step,
    forward,
    backward,
    goToIndex,
  };
}

export default useStepper;

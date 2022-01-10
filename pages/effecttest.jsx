
import { useState, useEffect, useMemo } from 'react';

const Calculator = () => {
  const calcResult = useMemo(() => expensiveFunc(), []);

  return <div>{calcResult}</div>
};

export default Calculator;
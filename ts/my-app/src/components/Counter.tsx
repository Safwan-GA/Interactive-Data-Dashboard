import React, { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";


const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  const backgroundProps = useSpring({
    background: `linear-gradient(to top, #3f51b5 ${level}%, #f3f3f3 ${level}%)`,
    config: { tension: 200, friction: 20 },
  });

  const increment = () => {
    setCount((prev) => {
      const newcount=  prev + 1;
      setLevel(() => Math.min(newcount*10, 100));
      return newcount;
    })};

  const decrement = () => {
    setCount((prev) => {
    const newcount=  prev - 1;
    setLevel(() => Math.max(newcount*10, 0));
    return newcount;
  })};

  const reset = () => {
    setCount(0);
    setLevel(0);
  };

  return (
    <animated.div style={{ ...backgroundProps, minHeight: "100px", padding: "20px" }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Counter
        </Typography>
        <Typography variant="h5">{count}</Typography>
        <Button variant="contained" color="primary" onClick={increment} sx={{ m: 1 }}>
          Increment
        </Button>
        <Button variant="contained" color="secondary" onClick={decrement} sx={{ m: 1 }}>
          Decrement
        </Button>
        <Button variant="contained" onClick={reset} sx={{ m: 1 }}>
          Reset
        </Button>
      </Container>
    </animated.div>
  );
};

export default Counter;

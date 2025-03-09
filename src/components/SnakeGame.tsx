
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };
type Food = Position;

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MIN_SPEED = 50;

const SnakeGame = () => {
  const { score, incrementScore, resetGame } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Food>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const directionRef = useRef(direction);
  const gameLoopRef = useRef<number | null>(null);

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  // Reset game state
  const handleReset = () => {
    setSnake([{ x: 5, y: 5 }]);
    setDirection("RIGHT");
    directionRef.current = "RIGHT";
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
    generateFood();
    resetGame();
  };

  // Toggle pause state
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Handle key presses for snake movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") {
            setDirection("UP");
            directionRef.current = "UP";
          }
          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") {
            setDirection("DOWN");
            directionRef.current = "DOWN";
          }
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") {
            setDirection("LEFT");
            directionRef.current = "LEFT";
          }
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT") {
            setDirection("RIGHT");
            directionRef.current = "RIGHT";
          }
          break;
        case " ": // Spacebar
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

  // Main game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        // Move head based on direction
        switch (directionRef.current) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

        // Check if snake ate food
        const ateFood = head.x === food.x && head.y === food.y;
        
        // Check for collisions
        const hitWall = head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE;
        const hitSelf = prevSnake.some((segment, index) => {
          // Skip the tail segment if the snake is moving
          if (index === prevSnake.length - 1 && !ateFood) return false;
          return segment.x === head.x && segment.y === head.y;
        });

        if (hitWall || hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        // Create new snake
        const newSnake = [head, ...prevSnake];
        
        // Remove tail if didn't eat food
        if (!ateFood) {
          newSnake.pop();
        } else {
          // Increase score, generate new food, increase speed
          incrementScore(10);
          generateFood();
          setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));
        }

        return newSnake;
      });
    };

    // Set up game loop
    gameLoopRef.current = window.setInterval(moveSnake, speed);

    // Clean up
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [food, gameOver, isPaused, speed, generateFood, incrementScore]);

  // Draw game on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid background (slightly darker)
    ctx.fillStyle = "#0a0a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "#1a1a3a";
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food with glow effect
    ctx.shadowColor = "#ff00ff";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#ff00ff";
    ctx.fillRect(
      food.x * CELL_SIZE + 2,
      food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
    
    // Reset shadow for snake
    ctx.shadowBlur = 0;

    // Draw snake with neon effect
    snake.forEach((segment, index) => {
      // Head is brighter
      if (index === 0) {
        ctx.fillStyle = "#00ffff";
        ctx.shadowColor = "#00ffff";
        ctx.shadowBlur = 5;
      } else {
        // Body segments get progressively darker
        const brightness = Math.max(50, 100 - (index * 3));
        ctx.fillStyle = `rgb(0, ${brightness}%, ${brightness}%)`;
        ctx.shadowBlur = 0;
      }
      
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    // Draw game over overlay
    if (gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = "bold 24px 'Press Start 2P', monospace";
      ctx.fillStyle = "#ff00ff";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);
      
      ctx.font = "16px 'Press Start 2P', monospace";
      ctx.fillStyle = "#00ffff";
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    }
    
    // Draw paused overlay
    if (isPaused && !gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = "bold 24px 'Press Start 2P', monospace";
      ctx.fillStyle = "#00ffff";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
    }
  }, [snake, food, gameOver, isPaused, score]);

  // Create touch controls for mobile
  const handleTouchControl = (direction: Direction) => {
    if (gameOver) return;
    
    // Only allow valid direction changes (no 180-degree turns)
    if (
      (direction === "UP" && directionRef.current !== "DOWN") ||
      (direction === "DOWN" && directionRef.current !== "UP") ||
      (direction === "LEFT" && directionRef.current !== "RIGHT") ||
      (direction === "RIGHT" && directionRef.current !== "LEFT")
    ) {
      setDirection(direction);
      directionRef.current = direction;
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center w-full max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative mb-4 border-4 border-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.5)]">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="bg-[#0a0a1a]"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-6">
        <Button 
          onClick={togglePause}
          disabled={gameOver}
          className="bg-[#9d00ff] hover:bg-[#b700ff] text-white shadow-[0_0_10px_rgba(157,0,255,0.5)]"
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        
        <Button 
          onClick={handleReset}
          className="bg-[#ff00ff] hover:bg-[#ff33ff] text-white shadow-[0_0_10px_rgba(255,0,255,0.5)]"
        >
          {gameOver ? "New Game" : "Reset"}
        </Button>
      </div>
      
      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[200px] sm:hidden">
        <div></div>
        <Button 
          onClick={() => handleTouchControl("UP")}
          className="bg-[#00ffff] hover:bg-[#66ffff] text-black font-bold"
        >
          ↑
        </Button>
        <div></div>
        
        <Button 
          onClick={() => handleTouchControl("LEFT")}
          className="bg-[#00ffff] hover:bg-[#66ffff] text-black font-bold"
        >
          ←
        </Button>
        <Button 
          onClick={togglePause}
          className="bg-[#ff00ff] hover:bg-[#ff66ff] text-white font-bold"
        >
          •
        </Button>
        <Button 
          onClick={() => handleTouchControl("RIGHT")}
          className="bg-[#00ffff] hover:bg-[#66ffff] text-black font-bold"
        >
          →
        </Button>
        
        <div></div>
        <Button 
          onClick={() => handleTouchControl("DOWN")}
          className="bg-[#00ffff] hover:bg-[#66ffff] text-black font-bold"
        >
          ↓
        </Button>
        <div></div>
      </div>
      
      <div className="text-sm mt-4 text-[#00ffff]">
        <p>Use arrow keys to control the snake.</p>
        <p>Press space to pause/resume the game.</p>
      </div>
    </motion.div>
  );
};

export default SnakeGame;

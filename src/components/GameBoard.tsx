
import React, { useState, useEffect, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

type Cell = {
  id: number;
  value: number;
  revealed: boolean;
  matched: boolean;
};

const GameBoard = () => {
  const { level, incrementScore, completeLevel } = useGame();
  const [cells, setCells] = useState<Cell[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const gridSize = Math.min(4 + Math.floor(level / 2), 8); // Increase grid size with level
  const totalPairs = Math.floor((gridSize * gridSize) / 2);
  
  // Initialize game board
  useEffect(() => {
    initializeGame();
    setTimeLeft(60);
    setGameCompleted(false);
    setMatchedPairs(0);
  }, [level]);
  
  // Timer countdown
  useEffect(() => {
    if (gameCompleted || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Time's up!",
            description: "You ran out of time. Try again!",
            variant: "destructive",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameCompleted, timeLeft]);
  
  const initializeGame = useCallback(() => {
    // Create pairs of values
    const values: number[] = [];
    for (let i = 1; i <= totalPairs; i++) {
      values.push(i, i);
    }
    
    // Shuffle the values
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    
    // Create cells with the shuffled values
    const newCells = values.map((value, index) => ({
      id: index,
      value,
      revealed: false,
      matched: false,
    }));
    
    setCells(newCells);
    setSelectedCells([]);
  }, [totalPairs]);
  
  const handleCellClick = (id: number) => {
    if (isChecking || gameCompleted || timeLeft <= 0) return;
    
    // Get the clicked cell
    const cell = cells.find(c => c.id === id);
    if (!cell || cell.revealed || cell.matched) return;
    
    // Can't select more than 2 cells at once
    if (selectedCells.length >= 2) return;
    
    // Update the cells state to reveal the clicked cell
    setCells(prev => 
      prev.map(c => c.id === id ? { ...c, revealed: true } : c)
    );
    
    // Add the cell to selected cells
    setSelectedCells(prev => [...prev, id]);
    
    // If we have 2 selected cells, check for a match
    if (selectedCells.length === 1) {
      setIsChecking(true);
      
      setTimeout(() => {
        const firstCell = cells.find(c => c.id === selectedCells[0]);
        const secondCell = cells.find(c => c.id === id);
        
        if (firstCell && secondCell && firstCell.value === secondCell.value) {
          // It's a match!
          setCells(prev => 
            prev.map(c => 
              c.id === firstCell.id || c.id === secondCell.id 
                ? { ...c, matched: true } 
                : c
            )
          );
          
          incrementScore(10 * level);
          setMatchedPairs(prev => {
            const newMatchedPairs = prev + 1;
            if (newMatchedPairs >= totalPairs) {
              completeLevel();
              setGameCompleted(true);
            }
            return newMatchedPairs;
          });
        } else {
          // Not a match, hide the cells again
          setCells(prev => 
            prev.map(c => 
              c.id === firstCell?.id || c.id === secondCell?.id 
                ? { ...c, revealed: false } 
                : c
            )
          );
        }
        
        setSelectedCells([]);
        setIsChecking(false);
      }, 800);
    }
  };
  
  const resetCurrentLevel = () => {
    initializeGame();
    setTimeLeft(60);
    setGameCompleted(false);
    setMatchedPairs(0);
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center w-full max-w-3xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between w-full mb-4">
        <div className="glass px-4 py-2 rounded-full">
          <span className="font-medium">Pairs: {matchedPairs}/{totalPairs}</span>
        </div>
        <div className={`px-4 py-2 rounded-full ${timeLeft < 10 ? 'bg-red-100 text-red-600' : 'glass'}`}>
          <span className="font-medium">Time: {timeLeft}s</span>
        </div>
      </div>
      
      <motion.div 
        className={`grid gap-3 w-full`}
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {cells.map(cell => (
          <motion.div
            key={cell.id}
            className={`aspect-square rounded-lg ${
              cell.matched 
                ? 'bg-green-100 border-2 border-green-300' 
                : cell.revealed 
                  ? 'bg-blue-100 border-2 border-blue-300' 
                  : 'bg-white border border-gray-200 hover:border-gray-300 cursor-pointer'
            } flex items-center justify-center transition-all duration-300 ease-in-out`}
            onClick={() => handleCellClick(cell.id)}
            initial={{ rotateY: 0 }}
            animate={{ 
              rotateY: cell.revealed || cell.matched ? 180 : 0,
              scale: cell.matched ? 0.95 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {(cell.revealed || cell.matched) && (
              <motion.span 
                className={`text-xl font-bold ${cell.matched ? 'text-green-600' : 'text-blue-600'}`}
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 180 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {cell.value}
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>
      
      {(gameCompleted || timeLeft <= 0) && (
        <motion.div 
          className="mt-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4">
            {gameCompleted ? "Level Complete!" : "Time's Up!"}
          </h3>
          <Button 
            onClick={resetCurrentLevel}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
          >
            {gameCompleted ? "Play Next Level" : "Try Again"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameBoard;

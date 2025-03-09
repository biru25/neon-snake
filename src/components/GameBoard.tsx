
import React, { useState, useEffect, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { Monster, getMonstersByLevel } from "@/lib/monsters";

type Cell = {
  id: number;
  monsterId: number;
  monster: Monster;
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
    // Get monsters for this level
    const levelMonsters = getMonstersByLevel(level);
    
    // Create pairs of monsters
    const monsterPairs: Monster[] = [];
    
    // Select random monsters from our level-appropriate set
    // We need totalPairs number of unique monsters
    const shuffledMonsters = [...levelMonsters].sort(() => Math.random() - 0.5);
    const selectedMonsters = shuffledMonsters.slice(0, totalPairs);
    
    // Create pairs of monsters
    selectedMonsters.forEach(monster => {
      monsterPairs.push(monster, monster);
    });
    
    // Shuffle the monster pairs
    for (let i = monsterPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [monsterPairs[i], monsterPairs[j]] = [monsterPairs[j], monsterPairs[i]];
    }
    
    // Create cells with the shuffled monster pairs
    const newCells = monsterPairs.map((monster, index) => ({
      id: index,
      monsterId: monster.id,
      monster: monster,
      revealed: false,
      matched: false,
    }));
    
    setCells(newCells);
    setSelectedCells([]);
  }, [totalPairs, level]);
  
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
        
        if (firstCell && secondCell && firstCell.monsterId === secondCell.monsterId) {
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
        <div className="glass px-4 py-2 rounded-full shadow-sm">
          <span className="font-medium text-[#8B5CF6]">Pairs: {matchedPairs}/{totalPairs}</span>
        </div>
        <div className={`px-4 py-2 rounded-full shadow-sm ${timeLeft < 10 ? 'bg-red-100 text-red-600' : 'glass text-[#8B5CF6]'}`}>
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
            className={`aspect-square rounded-lg shadow-md ${
              cell.matched 
                ? 'bg-[#F2FCE2] border-2 border-[#86EFAC]' 
                : cell.revealed 
                  ? 'bg-[#D3E4FD] border-2 border-[#93C5FD]' 
                  : 'bg-white border border-gray-200 hover:border-[#8B5CF6]/30 cursor-pointer'
            } flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden`}
            onClick={() => handleCellClick(cell.id)}
            initial={{ rotateY: 0 }}
            animate={{ 
              rotateY: cell.revealed || cell.matched ? 180 : 0,
              scale: cell.matched ? 0.95 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            {(cell.revealed || cell.matched) && (
              <motion.div
                className="w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{ opacity: 1, rotateY: 180 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <img 
                  src={cell.monster.image} 
                  alt={cell.monster.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFD166'/%3E%3Ccircle cx='50' cy='40' r='20' fill='white'/%3E%3Ccircle cx='42' cy='35' r='5' fill='black'/%3E%3Ccircle cx='58' cy='35' r='5' fill='black'/%3E%3Cpath d='M35 60 Q50 70 65 60' stroke='black' stroke-width='3' fill='none'/%3E%3C/svg%3E";
                  }}
                />
              </motion.div>
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
          <h3 className="text-xl font-bold mb-4 text-gradient">
            {gameCompleted ? "Level Complete! 🎉" : "Time's Up! ⏱️"}
          </h3>
          <Button 
            onClick={resetCurrentLevel}
            className="bg-[#8B5CF6] hover:bg-[#9D71FB] text-white rounded-full px-6 shadow-lg shadow-[#8B5CF6]/20"
          >
            {gameCompleted ? "Play Next Level" : "Try Again"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GameBoard;

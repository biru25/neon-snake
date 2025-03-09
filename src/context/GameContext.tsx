
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { connectWallet, disconnectWallet, getWalletBalance, isMetaMaskInstalled, listenToAccountChanges } from "@/lib/web3";
import { toast } from "@/components/ui/use-toast";

type GameTab = "game" | "profile" | "leaderboard" | "referral";

interface GameContextType {
  account: string | null;
  balance: string;
  score: number;
  highScore: number;
  activeTab: GameTab;
  isLoading: boolean;
  isMetaMaskAvailable: boolean;
  connectToWallet: () => Promise<void>;
  disconnectFromWallet: () => void;
  incrementScore: (points: number) => void;
  resetGame: () => void;
  setActiveTab: (tab: GameTab) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<GameTab>("game");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState<boolean>(false);

  // Check for MetaMask availability
  useEffect(() => {
    setIsMetaMaskAvailable(isMetaMaskInstalled());
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!account) return;
    
    const cleanup = listenToAccountChanges((accounts: string[]) => {
      if (accounts.length === 0) {
        setAccount(null);
        toast({
          title: "Wallet disconnected",
          description: "Your wallet has been disconnected",
        });
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
        updateBalance(accounts[0]);
        toast({
          title: "Account changed",
          description: `Connected to: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      }
    });
    
    return cleanup;
  }, [account]);

  // Update balance when account changes
  useEffect(() => {
    if (account) {
      updateBalance(account);
    }
  }, [account]);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage when it changes
  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("snakeHighScore", highScore.toString());
    }
  }, [highScore]);

  const updateBalance = async (address: string) => {
    const newBalance = await getWalletBalance(address);
    setBalance(newBalance);
  };

  const connectToWallet = async () => {
    setIsLoading(true);
    try {
      const address = await connectWallet();
      setAccount(address);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectFromWallet = () => {
    setAccount(null);
    disconnectWallet();
  };

  const incrementScore = (points: number) => {
    setScore(prev => {
      const newScore = prev + points;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });
  };

  const resetGame = () => {
    setScore(0);
    toast({
      title: "Game reset",
      description: "Your progress has been reset",
    });
  };

  return (
    <GameContext.Provider
      value={{
        account,
        balance,
        score,
        highScore,
        activeTab,
        isLoading,
        isMetaMaskAvailable,
        connectToWallet,
        disconnectFromWallet,
        incrementScore,
        resetGame,
        setActiveTab,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

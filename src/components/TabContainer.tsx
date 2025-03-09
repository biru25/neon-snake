
import React from "react";
import { useGame } from "@/context/GameContext";
import SnakeGame from "./SnakeGame";
import ProfileTab from "./ProfileTab";
import LeaderboardTab from "./LeaderboardTab";
import ReferralTab from "./ReferralTab";
import { motion, AnimatePresence } from "framer-motion";

const TabContainer = () => {
  const { activeTab } = useGame();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {activeTab === "game" && <SnakeGame />}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "leaderboard" && <LeaderboardTab />}
        {activeTab === "referral" && <ReferralTab />}
      </motion.div>
    </AnimatePresence>
  );
};

export default TabContainer;

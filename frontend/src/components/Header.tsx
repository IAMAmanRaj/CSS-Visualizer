import React from 'react';
import { motion } from 'framer-motion';
import { TbRefresh, TbFolderOpen, TbDeviceFloppy } from 'react-icons/tb';

interface HeaderProps {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave, onLoad, onReset }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 border-b border-gray-800 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            <span className="text-white font-bold text-lg">CV</span>
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-white">CSS Visualizer</h1>
            <p className="text-xs text-gray-400">Practice Flexbox, Grid & Layouts</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors flex items-center gap-2 text-sm cursor-pointer"
          >
            <TbRefresh className="w-4 h-4" />
            Reset
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLoad}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors flex items-center gap-2 text-sm cursor-pointer"
          >
            <TbFolderOpen className="w-4 h-4" />
            Load
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            <TbDeviceFloppy className="w-4 h-4" />
            Save
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;

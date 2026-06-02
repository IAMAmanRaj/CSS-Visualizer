import React from 'react';
import { motion } from 'framer-motion';
import { TbDeviceDesktop, TbX, TbCheck, TbArrowRight } from 'react-icons/tb';

const MobileBlocker: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gray-950 flex items-center justify-center p-8 lg:hidden z-50"
    >
      <div className="text-center max-w-md">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/30"
        >
          <TbDeviceDesktop className="w-12 h-12 text-white" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white mb-4"
        >
          Desktop Only
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 mb-6 leading-relaxed"
        >
          CSS Visualizer requires a larger screen for the best experience. 
          Please access this application on a device with a screen width of at least{' '}
          <span className="text-indigo-400 font-semibold">1024 pixels</span>.
        </motion.p>

        {/* Visual indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <TbX className="w-5 h-5 text-red-400" />
            <span className="text-sm text-gray-400">Mobile</span>
          </div>
          <TbArrowRight className="w-6 h-6 text-gray-600" />
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <TbCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Desktop</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MobileBlocker;

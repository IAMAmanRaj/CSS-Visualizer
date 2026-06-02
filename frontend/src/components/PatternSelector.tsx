import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbLayoutDistributeHorizontal, TbLayoutGrid, TbSparkles, TbChevronDown, TbArrowRight } from 'react-icons/tb';
import type { PatternType, PatternTemplate } from '../types';
import { defaultPatterns } from '../utils/defaultPatterns';

interface PatternSelectorProps {
  selectedType: PatternType;
  onTypeChange: (type: PatternType) => void;
  onPatternSelect: (pattern: PatternTemplate) => void;
}

const PatternSelector: React.FC<PatternSelectorProps> = ({
  selectedType,
  onTypeChange,
  onPatternSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const types: { value: PatternType; label: string; icon: React.ReactNode; color: string; description: string }[] = [
    { 
      value: 'flexbox', 
      label: 'Flexbox', 
      icon: <TbLayoutDistributeHorizontal className="w-5 h-5" />, 
      color: 'from-purple-500 to-indigo-600', 
      description: 'One-dimensional layouts' 
    },
    { 
      value: 'grid', 
      label: 'Grid', 
      icon: <TbLayoutGrid className="w-5 h-5" />, 
      color: 'from-emerald-500 to-teal-600', 
      description: 'Two-dimensional layouts' 
    },
    { 
      value: 'custom', 
      label: 'Custom', 
      icon: <TbSparkles className="w-5 h-5" />, 
      color: 'from-orange-500 to-pink-600', 
      description: 'Complete components' 
    },
  ];

  const getPatternIcon = (type: PatternType) => {
    switch (type) {
      case 'flexbox':
        return <TbLayoutDistributeHorizontal className="w-6 h-6 text-purple-400" />;
      case 'grid':
        return <TbLayoutGrid className="w-6 h-6 text-emerald-400" />;
      case 'custom':
        return <TbSparkles className="w-6 h-6 text-orange-400" />;
    }
  };

  const filteredPatterns = defaultPatterns.filter((p) => p.type === selectedType);
  const currentTypeInfo = types.find((t) => t.value === selectedType);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 border-b border-gray-700"
    >
      {/* Main Controls Row */}
      <div className="p-4 flex items-center gap-4">
        {/* Pattern Type Selector */}
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Layout</span>
          <div className="flex gap-1 bg-gray-800/50 rounded-xl p-1.5">
            {types.map((type) => (
              <motion.button
                key={type.value}
                onClick={() => onTypeChange(type.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer
                  ${
                    selectedType === type.value
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
              >
                {type.icon}
                <span>{type.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-700" />

        {/* Templates Toggle Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
            ${isExpanded ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          <TbChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          <span>Templates</span>
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
            {filteredPatterns.length}
          </span>
        </motion.button>

        {/* Current Type Info */}
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
          {currentTypeInfo?.icon}
          <span>{currentTypeInfo?.description}</span>
        </div>
      </div>

      {/* Expandable Templates Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                  {filteredPatterns.map((pattern, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        onPatternSelect(pattern);
                        setIsExpanded(false);
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="group p-4 bg-gray-900 hover:bg-gray-800 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-200 text-left cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        {getPatternIcon(pattern.type)}
                        <TbArrowRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <h3 className="text-white font-medium text-sm mb-1">
                        {pattern.name.replace(`${pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)} - `, '')}
                      </h3>
                      <p className="text-gray-500 text-xs line-clamp-2">
                        {pattern.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PatternSelector;

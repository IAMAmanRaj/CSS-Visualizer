import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  TbDeviceFloppy, 
  TbFolderOpen, 
  TbLayoutDistributeHorizontal, 
  TbLayoutGrid, 
  TbSparkles,
  TbCategory,
  TbInbox,
  TbX,
  TbCheck,
  TbLoader2
} from 'react-icons/tb';
import type { Pattern, PatternType } from '../types';
import { patternsApi } from '../api/patterns';
import ConfirmDialog from './ConfirmDialog';

interface SaveLoadModalProps {
  isOpen: boolean;
  mode: 'save' | 'load';
  onClose: () => void;
  onSave: (name: string, description: string) => Promise<void>;
  onLoad: (pattern: Pattern) => void;
  currentType: PatternType;
}

const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSave,
  onLoad,
  currentType,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterType, setFilterType] = useState<PatternType | 'all'>('all');

  // Delete confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [patternToDelete, setPatternToDelete] = useState<Pattern | null>(null);

  const getPatternIcon = (type: PatternType) => {
    switch (type) {
      case 'flexbox':
        return <TbLayoutDistributeHorizontal className="w-5 h-5 text-purple-400" />;
      case 'grid':
        return <TbLayoutGrid className="w-5 h-5 text-emerald-400" />;
      case 'custom':
        return <TbSparkles className="w-5 h-5 text-orange-400" />;
    }
  };

  const getFilterIcon = (type: PatternType | 'all') => {
    switch (type) {
      case 'all':
        return <TbCategory className="w-4 h-4" />;
      case 'flexbox':
        return <TbLayoutDistributeHorizontal className="w-4 h-4" />;
      case 'grid':
        return <TbLayoutGrid className="w-4 h-4" />;
      case 'custom':
        return <TbSparkles className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    if (isOpen && mode === 'load') {
      loadPatterns();
    }
  }, [isOpen, mode]);

  const loadPatterns = async () => {
    setLoading(true);
    
    const loadPromise = new Promise<Pattern[]>(async (resolve, reject) => {
      const startTime = Date.now();
      try {
        const data = await patternsApi.getAll();
        const elapsed = Date.now() - startTime;
        if (elapsed < 800) {
          await new Promise(r => setTimeout(r, 800 - elapsed));
        }
        resolve(data);
      } catch (err) {
        const elapsed = Date.now() - startTime;
        if (elapsed < 800) {
          await new Promise(r => setTimeout(r, 800 - elapsed));
        }
        reject(err);
      }
    });

    toast.promise(loadPromise, {
      loading: 'Loading your saved patterns...',
      success: (data) => {
        setPatterns(data);
        return `Found ${data.length} pattern${data.length !== 1 ? 's' : ''}`;
      },
      error: 'Failed to load patterns. Is the server running?',
    });

    try {
      await loadPromise;
    } catch (err) {
      console.error('Error loading patterns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (pattern: Pattern) => {
    setPatternToDelete(pattern);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!patternToDelete || !patternToDelete._id) return;

    const id = patternToDelete._id;
    const patternName = patternToDelete.name;

    setDeleteConfirmOpen(false);
    
    const deletePromise = new Promise<void>(async (resolve, reject) => {
      const startTime = Date.now();
      try {
        await patternsApi.delete(id);
        const elapsed = Date.now() - startTime;
        if (elapsed < 500) {
          await new Promise(r => setTimeout(r, 500 - elapsed));
        }
        resolve();
      } catch (err) {
        const elapsed = Date.now() - startTime;
        if (elapsed < 500) {
          await new Promise(r => setTimeout(r, 500 - elapsed));
        }
        reject(err);
      }
    });

    toast.promise(deletePromise, {
      loading: 'Deleting pattern...',
      success: () => {
        setPatterns(patterns.filter((p) => p._id !== id));
        return `"${patternName}" deleted successfully`;
      },
      error: 'Failed to delete pattern',
    });

    setPatternToDelete(null);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name for your pattern');
      return;
    }

    setSaving(true);
    
    const savePromise = new Promise<void>(async (resolve, reject) => {
      const startTime = Date.now();
      try {
        await onSave(name, description);
        const elapsed = Date.now() - startTime;
        if (elapsed < 1000) {
          await new Promise(r => setTimeout(r, 1000 - elapsed));
        }
        resolve();
      } catch (err) {
        const elapsed = Date.now() - startTime;
        if (elapsed < 1000) {
          await new Promise(r => setTimeout(r, 1000 - elapsed));
        }
        reject(err);
      }
    });

    toast.promise(savePromise, {
      loading: 'Saving your pattern...',
      success: () => {
        setName('');
        setDescription('');
        onClose();
        return `"${name}" saved successfully!`;
      },
      error: 'Failed to save pattern. Is the server running?',
    });

    try {
      await savePromise;
    } catch (err) {
      console.error('Error saving:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleLoad = (pattern: Pattern) => {
    onLoad(pattern);
    toast.success(`Loaded "${pattern.name}"`);
  };

  const filteredPatterns =
    filterType === 'all' ? patterns : patterns.filter((p) => p.type === filterType);

  if (!isOpen) return null;

  return (
    <>
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Pattern?"
        message={`Are you sure you want to delete "${patternToDelete?.name}"? This action cannot be undone and the pattern will be permanently removed.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setPatternToDelete(null);
        }}
      />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-gray-700"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${mode === 'save' ? 'bg-indigo-500/20' : 'bg-emerald-500/20'}`}
                >
                  {mode === 'save' ? (
                    <TbDeviceFloppy className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <TbFolderOpen className="w-5 h-5 text-emerald-400" />
                  )}
                </motion.div>
                <h2 className="text-xl font-semibold text-white">
                  {mode === 'save' ? 'Save Pattern' : 'Load Pattern'}
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <TbX className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {mode === 'save' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pattern Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="My Awesome Pattern"
                      disabled={saving}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description (optional)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A brief description of what this pattern does..."
                      rows={3}
                      disabled={saving}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg">
                    {getPatternIcon(currentType)}
                    <span className="text-sm text-gray-400">
                      Type: <span className="text-indigo-400 font-medium capitalize">{currentType}</span>
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div>
                  {/* Filter */}
                  <div className="flex gap-2 mb-4">
                    {(['all', 'flexbox', 'grid', 'custom'] as const).map((type) => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilterType(type)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer
                          ${filterType === type
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                          }`}
                      >
                        {getFilterIcon(type)}
                        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Pattern List */}
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <TbLoader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                      <p className="text-gray-400">Loading patterns...</p>
                    </div>
                  ) : filteredPatterns.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                        <TbInbox className="w-8 h-8 text-gray-500" />
                      </div>
                      <p className="text-gray-400">
                        No saved patterns found. Create and save some patterns to see them here!
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPatterns.map((pattern, index) => (
                        <motion.div
                          key={pattern._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {getPatternIcon(pattern.type)}
                                <h3 className="text-white font-medium">{pattern.name}</h3>
                              </div>
                              {pattern.description && (
                                <p className="text-gray-400 text-sm mt-1 ml-7">{pattern.description}</p>
                              )}
                              <p className="text-gray-500 text-xs mt-2 ml-7">
                                {pattern.createdAt && new Date(pattern.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleLoad(pattern)}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition-colors cursor-pointer"
                              >
                                Load
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteClick(pattern)}
                                className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-sm rounded-md transition-colors cursor-pointer"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {mode === 'save' && (
              <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  disabled={saving}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <TbLoader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <TbCheck className="w-4 h-4" />
                      Save Pattern
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SaveLoadModal;

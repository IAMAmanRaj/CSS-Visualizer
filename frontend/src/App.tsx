import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Header from './components/Header';
import PatternSelector from './components/PatternSelector';
import CSSEditor from './components/CSSEditor';
import PreviewCanvas from './components/PreviewCanvas';
import SaveLoadModal from './components/SaveLoadModal';
import MobileBlocker from './components/MobileBlocker';
import ConfirmDialog from './components/ConfirmDialog';
import type { Pattern, PatternType, PatternTemplate } from './types';
import { defaultPatterns } from './utils/defaultPatterns';
import { patternsApi } from './api/patterns';

const App: React.FC = () => {
  // State for pattern type and content
  const [selectedType, setSelectedType] = useState<PatternType>('flexbox');
  const [css, setCss] = useState(defaultPatterns[0].css);
  const [html, setHtml] = useState(defaultPatterns[0].html);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'save' | 'load'>('save');

  // Confirm dialog state for reset
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Handle pattern type change
  const handleTypeChange = useCallback((type: PatternType) => {
    setSelectedType(type);
    const firstPattern = defaultPatterns.find((p) => p.type === type);
    if (firstPattern) {
      setCss(firstPattern.css);
      setHtml(firstPattern.html);
    }
    toast.success(`Switched to ${type.charAt(0).toUpperCase() + type.slice(1)} patterns`);
  }, []);

  // Handle template selection
  const handlePatternSelect = useCallback((pattern: PatternTemplate) => {
    setCss(pattern.css);
    setHtml(pattern.html);
    setSelectedType(pattern.type);
    toast.success(`Loaded template: ${pattern.name.replace(`${pattern.type.charAt(0).toUpperCase() + pattern.type.slice(1)} - `, '')}`);
  }, []);

  // Handle save - returns a promise for the modal to handle
  const handleSave = useCallback(async (name: string, description: string): Promise<void> => {
    await patternsApi.create({
      name,
      type: selectedType,
      css,
      html,
      description,
    });
  }, [selectedType, css, html]);

  // Handle load
  const handleLoad = useCallback((pattern: Pattern) => {
    setCss(pattern.css);
    setHtml(pattern.html);
    setSelectedType(pattern.type);
    setModalOpen(false);
  }, []);

  // Handle reset - show confirmation first
  const handleResetClick = useCallback(() => {
    setResetConfirmOpen(true);
  }, []);

  // Confirm reset
  const handleResetConfirm = useCallback(() => {
    const firstPattern = defaultPatterns.find((p) => p.type === selectedType);
    if (firstPattern) {
      setCss(firstPattern.css);
      setHtml(firstPattern.html);
      toast.success('Reset to default template');
    }
    setResetConfirmOpen(false);
  }, [selectedType]);

  // Open modals
  const openSaveModal = () => {
    setModalMode('save');
    setModalOpen(true);
  };

  const openLoadModal = () => {
    setModalMode('load');
    setModalOpen(true);
  };

  return (
    <>
      {/* Mobile Blocker - shown on screens < 1024px */}
      <MobileBlocker />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#1f2937',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1f2937',
            },
          },
          loading: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#1f2937',
            },
          },
        }}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={resetConfirmOpen}
        title="Reset to Default?"
        message="This will discard all your current changes and reset the editor to the default template for this pattern type. This action cannot be undone."
        confirmText="Reset"
        cancelText="Keep Editing"
        variant="warning"
        onConfirm={handleResetConfirm}
        onCancel={() => setResetConfirmOpen(false)}
      />

      {/* Main App - hidden on screens < 1024px */}
      <div className="hidden lg:flex h-screen bg-gray-950 flex-col overflow-hidden">
        {/* Header */}
        <Header
          onSave={openSaveModal}
          onLoad={openLoadModal}
          onReset={handleResetClick}
        />

        {/* Pattern Selector */}
        <PatternSelector
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
          onPatternSelect={handlePatternSelect}
        />

        {/* Main Content - Editor and Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex overflow-hidden"
        >
          {/* Editor Panel */}
          <div className="w-1/2 h-full border-r border-gray-800 overflow-hidden">
            <CSSEditor
              css={css}
              html={html}
              onCSSChange={setCss}
              onHTMLChange={setHtml}
            />
          </div>

          {/* Preview Panel */}
          <div className="w-1/2 h-full overflow-hidden">
            <PreviewCanvas css={css} html={html} />
          </div>
        </motion.div>

        {/* Save/Load Modal */}
        <SaveLoadModal
          isOpen={modalOpen}
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onLoad={handleLoad}
          currentType={selectedType}
        />
      </div>
    </>
  );
};

export default App;

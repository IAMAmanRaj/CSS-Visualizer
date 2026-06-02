import React from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { SiCss3, SiHtml5 } from 'react-icons/si';

interface CSSEditorProps {
  css: string;
  html: string;
  onCSSChange: (value: string) => void;
  onHTMLChange: (value: string) => void;
}

const CSSEditor: React.FC<CSSEditorProps> = ({
  css,
  html,
  onCSSChange,
  onHTMLChange,
}) => {
  const [activeTab, setActiveTab] = React.useState<'css' | 'html'>('css');

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on' as const,
    roundedSelection: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on' as const,
    padding: { top: 16 },
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
    },
  };

  const tabs = [
    { id: 'css' as const, label: 'CSS', icon: <SiCss3 className="w-4 h-4" /> },
    { id: 'html' as const, label: 'HTML', icon: <SiHtml5 className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-gray-900"
    >
      {/* Editor Tabs - matching height with Preview header (px-4 py-3) */}
      <div className="flex-shrink-0 flex items-center border-b border-gray-700 px-4 py-3 bg-gray-900/50">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              className={`px-3 py-1.5 text-sm font-medium transition-colors relative flex items-center gap-2 cursor-pointer rounded-md
                ${activeTab === tab.id ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-400 hover:text-white'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Editor Info */}
        <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Auto-save
          </span>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 min-h-0 relative">
        {activeTab === 'css' ? (
          <Editor
            height="100%"
            language="css"
            theme="vs-dark"
            value={css}
            onChange={(value) => onCSSChange(value || '')}
            options={editorOptions}
            loading={
              <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Loading editor...</span>
                </div>
              </div>
            }
          />
        ) : (
          <Editor
            height="100%"
            language="html"
            theme="vs-dark"
            value={html}
            onChange={(value) => onHTMLChange(value || '')}
            options={editorOptions}
            loading={
              <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Loading editor...</span>
                </div>
              </div>
            }
          />
        )}
      </div>
    </motion.div>
  );
};

export default CSSEditor;

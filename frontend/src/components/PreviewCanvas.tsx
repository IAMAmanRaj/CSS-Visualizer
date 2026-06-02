import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TbSun, TbMoon } from 'react-icons/tb';
import { useTheme } from '../contexts/ThemeContext';

interface PreviewCanvasProps {
  css: string;
  html: string;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ css, html }) => {
  const { theme, toggleTheme } = useTheme();

  // Use srcdoc with theme-aware styles
  const srcdoc = useMemo(() => {
    const isDark = theme === 'dark';
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            :root {
              --preview-bg: ${isDark ? '#1f2937' : '#ffffff'};
              --preview-text: ${isDark ? '#f9fafb' : '#1f2937'};
              --preview-text-muted: ${isDark ? '#9ca3af' : '#6b7280'};
              --preview-border: ${isDark ? '#374151' : '#e5e7eb'};
              --preview-card-bg: ${isDark ? '#111827' : '#f9fafb'};
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              width: 100%;
              height: 100%;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
              color: var(--preview-text);
              background: var(--preview-bg);
              transition: background-color 0.3s ease, color 0.3s ease;
            }
            body {
              padding: 16px;
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
  }, [css, html, theme]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-gray-900"
    >
      {/* Preview Header */}
      <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">Preview</span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Live
          </motion.span>
        </div>
        
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            theme === 'dark' 
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} preview`}
        >
          {theme === 'dark' ? (
            <>
              <TbSun className="w-4 h-4" />
              <span>Light</span>
            </>
          ) : (
            <>
              <TbMoon className="w-4 h-4" />
              <span>Dark</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 min-h-0 p-4">
        <div 
          className={`h-full rounded-lg overflow-hidden shadow-lg transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <iframe
            title="Preview"
            srcDoc={srcdoc}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewCanvas;

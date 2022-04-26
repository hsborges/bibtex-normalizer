/**
 * @author Hudson Silva Borges
 */
import { createContext, useState } from 'react';

type EditorContextType = { content: string; updateContent?: (content: string) => void };
const EditorContext = createContext<EditorContextType>({ content: '' });

export const EditorConfigProvider = ({ children }) => {
  const [content, setContent] = useState('');
  return (
    <EditorContext.Provider value={{ content, updateContent: (value) => setContent(value) }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;

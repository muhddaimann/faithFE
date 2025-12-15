import React, { createContext, useContext } from 'react';
import { design, DesignTokens } from '../constants/design';

type DesignContextType = {
  design: DesignTokens;
};

const DesignContext = createContext<DesignContextType>({
  design: design,
});

export const DesignProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DesignContext.Provider value={{ design }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => useContext(DesignContext);

export default DesignContext;

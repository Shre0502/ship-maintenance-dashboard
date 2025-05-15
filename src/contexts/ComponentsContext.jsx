import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const stored = getFromLocalStorage('components');
    if (stored) setComponents(stored);
  }, []);

  const addComponent = (component) => {
    const updated = [...components, component];
    setComponents(updated);
    saveToLocalStorage('components', updated);
  };

  const updateComponent = (updatedComp) => {
    const updated = components.map((c) => c.id === updatedComp.id ? updatedComp : c);
    setComponents(updated);
    saveToLocalStorage('components', updated);
  };

  const deleteComponent = (id) => {
    const updated = components.filter((c) => c.id !== id);
    setComponents(updated);
    saveToLocalStorage('components', updated);
  };

  const getComponentsByShip = (shipId) => {
    return components.filter((c) => c.shipId === shipId);
  };

  return (
    <ComponentsContext.Provider value={{ components, addComponent, updateComponent, deleteComponent, getComponentsByShip }}>
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponents = () => useContext(ComponentsContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorageUtils';

const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const stored = getFromLocalStorage('ships');
    if (stored) setShips(stored);
  }, []);

  const addShip = (ship) => {
    const updated = [...ships, ship];
    setShips(updated);
    saveToLocalStorage('ships', updated);
  };

  const updateShip = (updatedShip) => {
    const updated = ships.map((s) => s.id === updatedShip.id ? updatedShip : s);
    setShips(updated);
    saveToLocalStorage('ships', updated);
  };

  const deleteShip = (id) => {
    const updated = ships.filter((s) => s.id !== id);
    setShips(updated);
    saveToLocalStorage('ships', updated);
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export const useShips = () => useContext(ShipsContext);
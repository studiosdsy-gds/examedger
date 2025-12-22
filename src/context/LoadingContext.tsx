
import { createContext, useContext, useState, useRef, type ReactNode } from 'react';

type LoadingContextType = {

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {

  const [isLoading, setIsLoadingState] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);


  const setIsLoading = (loading: boolean) => {
    if (loading) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      startTimeRef.current = Date.now();
      setIsLoadingState(true);
    } else {
      const elapsed = Date.now() - startTimeRef.current;
      const minDuration = 500; // 0.5 seconds

      if (elapsed < minDuration) {
        timerRef.current = setTimeout(() => {
          setIsLoadingState(false);
          timerRef.current = null;
        }, minDuration - elapsed);
      } else {
        setIsLoadingState(false);
      }
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

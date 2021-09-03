import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

interface WatchContextProps {
    watches: Array<number>;
    setWatches: React.Dispatch<React.SetStateAction<Array<number>>>;
}

const WatchContext = createContext({} as WatchContextProps);

export const WatchProvider: React.FC = ({ children }) => {

    const [watches, setWatches] = useState<Array<number>>([]);

    useEffect(() => {
        (async () => {
            const storageWatches = await AsyncStorage.getItem('@watches');
            
            if (storageWatches) {
                console.log(JSON.parse(storageWatches));
                setWatches(JSON.parse(storageWatches));
            }
        })();
    },[]);

    return (
        <WatchContext.Provider value={{
            watches,
            setWatches,
        }}>
            {children}
        </WatchContext.Provider>
    );
}

export default WatchContext;
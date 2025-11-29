import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [columns, setColumns] = useState([]);

    const setParsedData = (parsedData, name) => {
        setData(parsedData);
        setFileName(name);
        if (parsedData.length > 0) {
            setColumns(Object.keys(parsedData[0]));
        }
    };

    const clearData = () => {
        setData([]);
        setFileName('');
        setColumns([]);
    };

    return (
        <DataContext.Provider value={{ data, fileName, columns, setParsedData, clearData }}>
            {children}
        </DataContext.Provider>
    );
};

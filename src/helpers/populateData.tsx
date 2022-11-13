import {
    createContext
} from 'react';

type elementData = {
    _id: string,
    [key: string]: string,
}

interface APIData {
    graph: {
        elements: {
            [key: string]: {
                props: {
                    type: string,
                    descr: string,
                    defVal? : string,
                    name: string,
                }
            }
        },
    },
    title: string,
    data: elementData[],
}

const apiData: APIData = {
    graph: {
        elements: {
            
        }
    },
    title: '',
    data: [],
}

type dataContext = {
    apiData: APIData,
    setApiData: React.Dispatch<React.SetStateAction<any | null>>,
}

export const populateData = createContext<dataContext>({
    apiData,
    setApiData: () => {},
});
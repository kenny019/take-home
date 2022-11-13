import React, {
    useState,
    useContext,
    useEffect,
} from 'react';

import {
    populateData
} from '../helpers/populateData';

import EditDashboardModal from './editDashboardModal';

type rowData = {
    [key: string]: {
        [props: string]: any,
    },
}

type elementData = {
    [key: string]: {
        props: {
            type: string,
            descr: string,
            defVal? : string,
            name: string,
        }
    }
}

// if done properly will export types in seperate file

const parseType = (type: string, data: string) => {
    if (type === 'Date') {
        return new Date(data).toDateString();
    }

    if (type === 'String') {
        return data;
    }
}

const DataTable = () : JSX.Element => {
    let { apiData } = useContext(populateData); 

    const [graphElements, setGraphElements] = useState<elementData>({});
    const [dataRows, setDataRows] = useState<rowData>({});

    const [oldAPIData, setOldAPIData] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    const [modalID, setModalID] = useState<string>('');

    useEffect(() => {
        console.log('use effect', oldAPIData === JSON.stringify(apiData))

        if (oldAPIData === JSON.stringify(apiData)) {
            return
        }


        if (typeof(apiData.graph) == 'object' && typeof(apiData.graph.elements) == 'object') {
            Object.keys(apiData.graph.elements).map((values) => {
                if (!graphElements[values] || oldAPIData !== JSON.stringify(apiData)) {
                    console.log('elements works')

                    setGraphElements(obj => ({
                        ...obj, [values]: {
                            props: {
                                type: apiData.graph.elements[values].props.type,
                                descr: apiData.graph.elements[values].props.descr,
                                defVal: apiData.graph.elements[values].props.defVal ?  apiData.graph.elements[values].props.defVal : '',
                                name: apiData.graph.elements[values].props.name,
                            }
                        }
                    }))

                }
            })
        }

        if (apiData.data) {
            apiData.data.map((values, i) => {
                if (!dataRows[values._id] || oldAPIData !== JSON.stringify(apiData)) {
                    setDataRows(obj => ({
                        ...obj, [values._id]: {
                            name: values.name,
                            createdAt: values.createdAt,
                        }
                    }))
                }
               
            })
        }

        setOldAPIData(JSON.stringify(apiData)); // if api data has been updated then repopulate


    }, [JSON.stringify(apiData)])

    return (
    <>
    {showModal ? <EditDashboardModal _id={modalID} setShowModal={setShowModal} rowData={dataRows} graphElements={graphElements}/> : <> </>}
    {
        !apiData.title ? <h1 className='font-bold text-3xl text-gray-700'>
            Loading...
        </h1>
        :
        <>
        <h1 className='font-bold text-3xl text-gray-700'>{!apiData.title ? 'Loading' : apiData.title}</h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    {
                        typeof(apiData.graph) == 'object' && typeof(apiData.graph.elements) == 'object' ? Object.keys(graphElements).map((values, i)=> {
                            return(
                                <th scope="col" className="py-3 px-6" key={i}>
                                    {graphElements[values].props.name}
                                </th>
                            )
                        }) :
                        <th scope="col" className="py-3 px-6">
                            loading
                        </th>
                    }
                    <th scope="col" className="py-3 px-6">
                        {'Edit'}
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    dataRows ? Object.keys(dataRows).map((values, i) => {
                        const HandleEdit = async (event: React.MouseEvent<HTMLButtonElement>) => { // open dialog
                            event.preventDefault();
                            
                            setModalID(values);
                            setShowModal(true);
                        }

                        return(
                            <>
                            <tr className="bg-white border-b" key={i}>
                                {
                                    Object.keys(graphElements).map((v: string, x: number) => {
                                        return(
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap" key={x}>
                                                {
                                                parseType(graphElements[v].props.type, dataRows[values][v])
                                                }
                                            </th>
                                        )
                                       
                                    })
                                }
                                 
                                <td className="py-4 px-6">
                                    <button 
                                    className="font-medium text-blue-600"
                                    onClick={HandleEdit}
                                    >Edit</button>
                                </td>
                            </tr>
                            </>
                            
                        )
                    }) :
                    <tr className="bg-white border-b">

                    </tr>
                }
                
            </tbody>
        </table>
    </div>
        </>
    }
        
    </>
    
    )
}

export default DataTable;
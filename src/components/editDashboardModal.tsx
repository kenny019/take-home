import React, {
    useState,
    useContext,
} from 'react';

import {
    populateData
} from '../helpers/populateData';

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

const EditDashboardModal = ({ _id, setShowModal, rowData, graphElements}: {_id: string, setShowModal: React.Dispatch<React.SetStateAction<boolean>>, rowData: rowData, graphElements: elementData}) : JSX.Element => { 

    let { apiData, setApiData } = useContext(populateData); 

    const [clonedRowData, setClonedRowData] = useState<rowData>({});

    const SubmitEdit = async (event: React.MouseEvent<HTMLButtonElement>) => { // open dialog
        event.preventDefault();

        console.log(clonedRowData)

        apiData.data.map((obj, i) => {
            if (clonedRowData[obj._id]) {
                Object.keys(clonedRowData[obj._id]).map((key) => {
                    apiData.data[i][key] = clonedRowData[obj._id][key];
                })
            }
        })
       
        setApiData(apiData);
    }


    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit {_id}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-1 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form className="space-y-6" action="#">
                    {
                        Object.keys(graphElements).map((v) => {

                            return (
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">{
                                    graphElements[v].props.name
                                    }
                                    </label>
                                    <input 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                    placeholder={
                                        rowData[_id][v]
                                    }
                                    onChange={(e) => {
                                        apiData.data?.map((obj, i) => {
                                            if (obj._id === _id) {
                                                setClonedRowData(obj => ({
                                                    ...obj, [_id]: {
                                                        [v]: e.target.value,
                                                    }
                                                }))
                                            }
                                        })
                                    }}
                                    required
                                    />
                                </div>
                            );
                        })
                    }
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(e) => {
                        SubmitEdit(e);
                        setShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )

}

export default EditDashboardModal;
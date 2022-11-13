import React, {
	useEffect,
	useState,
} from 'react';
import './App.css';
import {
	populateData,
} from './helpers/populateData';

import DataTable from './components/dataTable';

function App() {
	
	// todo add default values file
	let [apiData, setApiData] = useState({
		graph: {
			elements: {

			}
		},
		title: '',
		data: [] 
	});

	useEffect(() => {
		const getAPIData: any = async () => {
			let res = await fetch('http://localhost:8080/api');
			const json = await res.json()
			setApiData(json);
		}
		getAPIData()
	}, [])

  return (
	<div className='flex h-screen'>
		<div className='w-1/2 m-auto'>
			<populateData.Provider value={{apiData, setApiData}}>
			<DataTable/>
			</populateData.Provider>
		</div>
	</div>
	
  );
}

export default App;


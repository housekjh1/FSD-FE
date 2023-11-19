import { useState } from "react"
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const GithubAPI = () => {

    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState([]);
    const columns = [
        { field: 'full_name', sortable: true, filter: true },
        { field: 'html_url', sortable: true, filter: true },
        { field: 'owner.login', sortable: true, filter: true },
        {
            field: 'full_name',
            cellRenderer: params =>
                <button onClick={() => alert(params.value)}>
                    Press Me
                </button>
        }
    ]


    const fetchData = () => {
        fetch(`https://api.github.com/search/repositories?q=${keyword}`)
            .then(resp => resp.json())
            .then(data => {
                setData(data.items)
                console.log(data.items)
            })
            .catch(e => console.log(e));
    }

    return (
        <div className="container mx-auto flex flex-col justify-center items-center">
            <div className="flex flex-col md:flex-row gap-5">
                <input value={keyword} onChange={e => setKeyword(e.target.value)} />
                <button onClick={fetchData}>Fetch</button>
            </div>
            <div className="ag-theme-material" style={{ height: 500, width: '55%' }}>
                <AgGridReact
                    rowData={data}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                />
            </div>
        </div>
    )
}

export default GithubAPI

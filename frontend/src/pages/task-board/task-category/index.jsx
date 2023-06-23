import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { getTaskCategories } from '../../../services/task-category/taskCategoryService';

export default function TaskCategoryList(){

    const [data, setData] = useState([]);
    const [pending, setPending] = useState(true);
    const [searchQuery, setSearchQuery] = useState();
    const [filters, setFilters] = useState({
        order: {},
        q:null,
        page: 1,
        rows: 10,
      });

    const handleSearch = (query) =>{
        setFilters({ ...filters, q:query?.target?.value });
    }

    const handlePageChange = (pageNumber) => {
        setFilters({ ...filters, page: pageNumber });
    };

    const handlePerRowsChange = (rowsNumber) => {
        setFilters({ ...filters, rows: rowsNumber });
    };
    const handleOnSort = (e, dir) => {
        setFilters({ ...filters, order: {sortColumn: e?.sortField, sort: dir} });
    };

    const categories = async () => {
        const { data } = await getTaskCategories(filters);
        setData(data);
        setPending(false);
    }

    useEffect(() => { categories() },[filters]);

    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true, sortField: 'name' },

        {
            name: "Action",
            selector: (row) => row.action,
            format: (row) => (
                <>
                    <Link to={"/panel/employees/" + row.id}  className="btn btn-primary btn-sm m-1"> <i className="fa fa-edit"></i> Edit </Link>
                    <button className="btn btn-danger btn-sm"> <i className="fa fa-trash"></i> Delete </button>
               </>
            ),
        }
    ];

    console.log(filters);
    return(
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <h5>Task Categories</h5>
                        <div className="d-flex">
                            <Link to="/task-categories/create" className="btn btn-sm btn-primary m-1" title="Task Category"> Create Task</Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 offset-md-8 mb-0">
                            <input type="text" onChange={handleSearch} value={filters?.q} className="form-control" placeholder="Search..." />
                        </div>
                        <div className="col-12">
                            <DataTable 
                                columns={columns}
                                data={data?.data?.data}
                                progressPending={pending}
                                pagination
                                sortServer
                                paginationServer
                                paginationTotalRows={data?.data?.total}
                                currentPage={data?.data?.current_page}
                                onChangeRowsPerPage={handlePerRowsChange}
                                onChangePage={handlePageChange}
                                onSort={handleOnSort}
                            />
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}
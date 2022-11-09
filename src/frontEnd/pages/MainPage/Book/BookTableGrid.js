import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { number } from "prop-types";
import BorrowAction from "../../components/BorrowAction";
import { useValue } from "../../../context/Provider";
import { getBook_array } from "../../Action/createBook";

// TableGrid for all books
// determine table title here
export default function TableGrid() {
  const {
    state: { book_array },
    dispatch,
  } = useValue();
  console.log(book_array);
  //get all books from the database
  useEffect(() => {
    if (book_array.length == 0) getBook_array(dispatch);
  }, []);
  const [rowId, setRowId] = useState(null);
  //header of each column of the table
  const headers = useMemo(
    () => [
      //   {
      //     field: "picture",
      //     headerName: "Cover",
      //     width: 60,
      //     renderCell: (params) => <Avatar src={params.row.photoHRL} />,
      //     sortable: false,
      //     filterable: false,
      //     flex: 1,
      //   },
      {
        field: "_id",
        headerName: "Book Id",
        width: 60,
        type: number,
        flex: 1,
      },
      {
        field: "bookName",
        headerName: "Book Name",
        width: 200,
        flex: 1,
      },
      {
        field: "condition",
        headerName: "Condition",
        width: 180,
        sortable: false,
        flex: 1,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 300,
        sortable: false,
        flex: 1,
        editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        type: "singleSelect",
        valueOptions: ["Avaliable", "Lost"],
        editable: true,
        sortable: false,
        flex: 1,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        type: "action",
        //passing the parms of each row of the table to the action
        renderCell: (params) => (
          <BorrowAction {...{ params, rowId, setRowId }} />
        ),
        flex: 1,
      },
    ],
    [rowId]
  );

  return (
    <Box sx={{ height: 600, width: "100%", flex: 1 }}>
      <Typography
        variant="span"
        component="span"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Books
      </Typography>
      <DataGrid
        components={{ Toolbar: GridToolbar }}
        columns={headers}
        rowSelection="multiple"
        rows={book_array}
        getRowId={(row) => row._id}
        componentsProps={{
          //quick search of the table
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        onCellEditCommit={(params) => setRowId(params.id)}
      />
    </Box>
  );
}

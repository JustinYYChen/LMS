import { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { number } from "prop-types";
import { useValue } from "../../../context/Provider";
import { getRecords } from "../../Action/createRecord";
import moment from "moment";

//quick search bar at the top of the table
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}
//search for the year with input of 4 digits
const getApplyFilterFnSameYear = (value) => {
  var re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if (!value || !value.match(re)) {
    return null;
  }
  return (params) => {
    console.log(value);
    return (
      new Date(params.value).getDate() ===
      moment(value, "DD/MM/YYYY").toDate().getDate()
    );
  };
};

// RecordTable:
// determine record table title here
// get each record and show as lines
//similar to the book table grid
export default function RecordTable(props) {
  const {
    state: { records },
    dispatch,
  } = useValue();
  console.log(records);
  useEffect(() => {
    if (records.length == 0) getRecords(dispatch);
  }, []);
  const fields = [
    {
      field: "_id",
      headerName: "Record Id",
      width: 60,
      type: number,
      flex: 1,
      filtertable: false,
    },
    {
      field: "bookId",
      headerName: "Book Id",
      width: 60,
      type: number,
      flex: 1,
    },
    {
      field: "bookName",
      headerName: "Book Name",
      width: 180,
      flex: 1,
    },
    {
      field: "userPhone",
      headerName: "User PhoneNumber",
      width: 100,
      flex: 1,
    },
    {
      field: "type",
      headerName: "Record Type",
      width: 200,
      type: "singleSelect",
      valueOptions: [
        "Borrowed",
        "Returned",
        "Lost",
        "Book Added",
        "Unavaliable",
      ],
      editable: true,
      sortable: false,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Recorded Date",
      width: 180,
      //renderCell: (params) => moment(params.row.dateTime).format("DD/MM/YYYY"),
      type: "date",
      flex: 1,
    },
  ];
  const headers = useMemo(
    () =>
      fields.map((header) => {
        if (header.field === "createdAt") {
          return {
            ...header,
            getApplyQuickFilterFn: getApplyFilterFnSameYear,
          };
        }
        if (header.field === "bookId") {
          return {
            ...header,
            getApplyQuickFilterFn: undefined,
          };
        }
        return header;
      }),
    [fields]
  );

  //get each row data
  const { datas } = props;
  let filterValue;
  //check is it come from book page and give filter inside

  if (datas == null) {
    console.log("empty");

    filterValue = "";
  } else {
    console.log(datas._id);
    filterValue = datas._id;
  }

  return (
    <Box sx={{ height: 650, width: "100%", flex: 1 }}>
      <Typography
        variant="span"
        component="span"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Records Information
      </Typography>
      <DataGrid
        columns={headers}
        rows={records}
        getRowId={(row) => row._id}
        // componentsProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //     quickFilterProps: { debounceMs: 300 },
        //   },
        // }}
        components={{ Toolbar: QuickSearchToolbar }}
        //set the initial filter for viewing the historu of record of
        //each book
        initialState={{
          filter: {
            filterModel: {
              items: [
                {
                  columnField: "bookId",
                  operatorValue: "contains",
                  value: filterValue,
                },
              ],
            },
          },
        }}
      />
    </Box>
  );
}

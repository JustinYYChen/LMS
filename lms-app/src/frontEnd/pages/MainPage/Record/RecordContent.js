import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import RecordTable from "./RecordTableGrid";

// get datas and generate RecordTablePage
// RecordTablePage: RecordTable
export default function RecordTablePage(props) {
  //get the touched row info
  const { datas } = props;
  return (
    <Paper sx={{ height: 750, margin: "auto", overflow: "hidden", flex: 1 }}>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        <RecordTable datas={datas}></RecordTable>
      </Typography>
    </Paper>
  );
}

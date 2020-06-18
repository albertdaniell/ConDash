import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  LinearProgress,
  Typography,
  Button,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AppButtonGroups from "../../components/AppButtonGroups";
import appDate from "../../constants/appDate";
import CONSTANTVAR from '../../constants/constVariables'
import { Add } from "@material-ui/icons";

const axios = require("axios");

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "",
    numeric: false,
    disablePadding: true,
    label: "Institution Name",
  },
  {
    id: "uniformPrices.short",
    numeric: true,
    disablePadding: false,
    label: "Uniform Price (Short)",
  },

  {
    id: "uniformPrices.short",
    numeric: true,
    disablePadding: false,
    label: "Uniform Price (Shirt)",
  },

  {
    id: "uniformPrices.sweater",
    numeric: true,
    disablePadding: false,
    label: "Uniform Price (Sweater)",
  },
  {
    id: "uniformPrices.tie",
    numeric: true,
    disablePadding: false,
    label: "Uniform Price (Tie)",
  },

  { id: "orders", numeric: true, disablePadding: false, label: "Todays Orders" },
  { id: "deleted", numeric: true, disablePadding: false, label: "" },


  { id: "actions", numeric: true, disablePadding: false, label: "Action" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
function AllInstitutions() {
  const classes = useStyles();
  const [allInstitutionsData,setAllInstitutionsData]=useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allInstitutions, setInstitutions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedId,setSelectedId]=useState('');

  const getInstitutions = () => {
    axios({
      method: "GET",
      url: `${CONSTANTVAR.APIURL}institutions`,
      body:{deletedStatus:false},
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: 'no-cors' 
    })
      .then((res) => {
        //console.log(res);
      setInstitutions(  res.data[0].rows.filter((row)=>{

        return row.deletedStatus === false
      }))

      setAllInstitutionsData(res.data[0].rows)
     //   setInstitutions(res.data[0].rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ViewAllInstitutions=()=>{
    setInstitutions(allInstitutionsData)
  }

  const getOrders=(id)=>{
   axios({
     method:'GET',
     url: `${CONSTANTVAR.APIURL}carts`,
     mode: 'no-cors' 

   }).then((res)=>{
    console.log(res);
     setOrders(res.data[0].rows)

   })

  }

  const getOrdersForInstitution=(id)=>{
    console.log(id)
    return orders.filter((order)=>{
      return order.Userid === id && order.dateAdded === appDate.fullDate
    }).length
  }


  const deleteInstitution=(id)=>{
    console.log("Wanting to delete id ", id)
    axios({
      method:'PUT',
      url:`${CONSTANTVAR.APIURL}institutions/update/${id}`,
      data:{deletedStatus:true},
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: 'no-cors' 
    }).then((res)=>{
      console.log(res)
      if(res.data.status === 200){
        getInstitutions();

      }
    })
  }

  useEffect(() => {
    getInstitutions();
    getOrders()
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const options = allInstitutions.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, allInstitutions.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Container>
        <Typography id="textHead" variant="h4" component="h4">
          All Institution
        </Typography>
        <div id="toolsDiv">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={2}>
              <Typography>
                Institutions{" "}
                <span style={{ fontSize: 25 }}>{allInstitutions.length}</span>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                id="combo-box-demo"
                options={options.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search" variant="standard" />
                )}
              />
            </Grid>
            <Grid style={{ textAlign: "right" }} item xs={12} sm={2}>
            <Button variant="contained" color="primary">
                 <Add></Add> Search
                </Button>
            </Grid>
            <Grid style={{ textAlign: "right" }} item xs={12} sm={2}>
            <Button onClick={()=>ViewAllInstitutions()} variant="outlined" color="primary">
                 <Add></Add> View All 
                </Button>
            </Grid>
            <Grid style={{ textAlign: "right" }} item xs={12} sm={2}>
              <NavLink to="/addInstitution">
                <Button variant="contained" color="secondary">
                 <Add></Add> Add 
                </Button>
              </NavLink>
            </Grid>
          </Grid>
        </div>
        <Paper className={classes.paper}>
          <TableContainer id="tableContainer">
            {allInstitutions.length === 0 || allInstitutions === "undefined" ? (
              <LinearProgress color="secondary" />
            ) : null}
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={allInstitutions.length}
              />
              {allInstitutions.length !== 0 ||
              allInstitutions !== "undefined"  || orders.length !== 0 || orders !== 'undefined'? (
                <TableBody>
                  {stableSort(allInstitutions, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((institution, index) => {
                      const isItemSelected = isSelected(institution.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={institution.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {institution.name}
                          </TableCell>
                          <TableCell align="right">
                            {institution.uniformPrices.short}
                          </TableCell>
                          <TableCell align="right">
                            {institution.uniformPrices.skirt}
                          </TableCell>
                          <TableCell align="right">
                            {institution.uniformPrices.sweater}
                          </TableCell>
                          <TableCell align="right">
                            {institution.uniformPrices.tie}
                          </TableCell>
                          <TableCell align="right">
                            {
                              getOrdersForInstitution(institution._id) >=1 ?
                              <span id="myBadge">{getOrdersForInstitution(institution._id)}</span>
:                           <span id="myBadge2">{getOrdersForInstitution(institution._id)}</span>

                            }
                            
                          </TableCell>
                          <TableCell align="right">
                            {institution.deletedStatus === true? <span>Deleted</span> :<span>Active</span>}
                          </TableCell>
                          <TableCell align="right">
                            <AppButtonGroups id={institution._id} setSelectedId={setSelectedId} selectedId={selectedId} deleteInstitution={deleteInstitution} deletedStatus={institution.deletedStatus}></AppButtonGroups>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <p>Please wait...</p>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allInstitutions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Container>
    </div>
  );
}

export default AllInstitutions;

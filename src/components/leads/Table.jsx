import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  getLeadsTableHead,
  getLeadsTableData,
  setDateLabel,
  editLead,
  getLeadsCount,
} from "../../store/actions/Leads";
import { getSalesExecutive, getSingleUser } from "../../store/actions/Users";
import { useSelector, useDispatch } from "react-redux";
import ExecutiveDropDown from "./ExecutiveDropdown";
import SingleLead from "../leadSingle/SingleLead";
import { LEAD_TABLE_DATA_SUCCESS } from "../../store/actionTypes/Leads";
import { ConvertDateToLocal, createRowPerPageOptionArray } from "../../helpers/helperFunctions";
import NoResultFound from "../NoResultFound/NoResultFound";
import { PresaletoSalesIcon, SalestoPresaleIcon } from "../../assets/Icons";
import { LOAD_LEAD_SUCCESS } from "../../store/actionTypes/SingleLead";
import { getLeadsTableRestrictionData, tableColumNames } from "../../constants/UserRoles";

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

  // console.log("table data before map......>>>>",array);

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

let hiddenTableRowsId = ["flag"]

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeadsTableHead());
    // dispatch(getSingleUser({ role: "Pre Sale Executive" }));
  }, [dispatch]);
  const { headCells } = useSelector((state) => state.leads);




  return (
    <TableHead className={classes.head}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
            style={{ color: "white" }}
          />
        </TableCell>

        <TableCell align="center" style={{ maxWidth: "fit-content !important" }}>

        </TableCell>

        {headCells.map((headCell) => (



          !getLeadsTableRestrictionData().includes(headCell.id) ?

            <TableCell
              key={headCell.id}
              align="center"
              // align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              style={{ color: "white", minWidth: "100px" }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {console.log(headCell.id)}
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
            : null





        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,

        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: 20,
    minWidth: 110,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
  head: {
    backgroundColor: "#3f50b5",
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
  row: {
    backgroundColor: "red",
  },
}));

export default function EnhancedTable() {
  let history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [nextPage, setNextPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [preSale, setPreSale] = React.useState("");
  const [saleExe, setSalesExe] = React.useState("");
  let [isNodata, setNodata] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    // dispatch(setDateLabel("createdAt"));
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });
    dispatch(getLeadsTableData(rowsPerPage, page));
    dispatch(getLeadsCount());
    // dispatch(getLeadsTableData());
  }, [dispatch]);




  const { rows, loader, leadCount, masterData, filterdata } = useSelector(
    (state) => state.leads
  );


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filterdata.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.log(name);
    {
      /*<SingleLead id=name />*/
    }
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    // history.push("/details", { id: name });
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    setNextPage(newPage + 1);
    console.log("New Page", newPage, nextPage);
    // if (newPage > nextPage) {
    dispatch(getLeadsTableData(rowsPerPage, newPage));
    // }
  };



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };



  const handleChange = (event, id) => {
    setPreSale(event.target.value.firstName);
    console.log("uuuu", event.target.value);

    dispatch(
      editLead({
        id: id,
        presaleExecutive: event.target.value._id,
      })
    );
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });
    dispatch(getLeadsTableData(rowsPerPage, page));
  };



  const handleChangeSales = (event, id) => {
    setSalesExe(event.target.value.firstName);
    dispatch(
      editLead({
        id: id,
        salesExecutive: event.target.value._id,
      })
    );
    dispatch({
      type: LEAD_TABLE_DATA_SUCCESS,
      payload: [],
      updatedMasterData: [],
      updatedFilterData: [],
    });
    dispatch(getLeadsTableData(rowsPerPage, page));

    console.log("uuuu", event.target.value.firstName, id);
  };
  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
  // }));

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const { users, sales } = useSelector((state) => state.user);
  console.log("Executies", sales);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filterdata.length - page * rowsPerPage);
  // console.log("Data", masterData, filterdata);
  // console.log("va", saleExe);

  const { headCells } = useSelector((state) => state.leads);


  const { stageStatusData } = useSelector((state) => state.setting);


  let getExectiveNameById = (para_type, para_id) => {

    if (para_type === "presale") {
      let finder = users.find(element => element._id === para_id)

      let result = `${finder ? (finder.firstName ? (finder.lastName ? (finder.firstName + " " + finder.lastName) : (finder.firstName)) : "") : ("")}`
      return result

    }

    else if (para_type === "sales") {
      let finder = sales.find(element => element._id === para_id)
      let result = `${finder ? (finder.firstName ? (finder.lastName ? (finder.firstName + " " + finder.lastName) : (finder.firstName)) : "") : ("")}`
      return result
    }

  }


  let getStageStatusFromID = (para_type, para_id) => {

    if (para_type === "stage") {
      let finder = stageStatusData.find(element => element._id === para_id)
      return finder
    }

    else if (para_type === "status") {

      let result = null


      stageStatusData.find((element) => {

        element.statusList.filter((element2) => {

          if (element2._id === para_id) {

            result = element2
          }

        })



      })

      return result
    }



  }



  let getTriggerIcon = (isHandoverCompleted, handoverRequestedTo,) => {

    if (isHandoverCompleted !== null && handoverRequestedTo !== null) {

      if (!isHandoverCompleted && handoverRequestedTo == "salesExecutive") {
        return <PresaletoSalesIcon />
      }
      else if (!isHandoverCompleted && handoverRequestedTo == "presaleExecutive") {
        return <SalestoPresaleIcon />
      }

    }
    else {
      return null
    }


  }



  useEffect(() => {

    filterdata === null ? setNodata(false) : filterdata.length < 1 ? setNodata(true) : setNodata(false)


  }, [dispatch])



  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {loader ? (
          <div style={{ width: "100%", padding: "25px 0px" }}>
            <CircularProgress style={{ marginLeft: "50%" }} />
          </div>
        ) : (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filterdata.length}
              />
              <TableBody>
                {

                  filterdata && filterdata.length > 0 ?

                    stableSort(filterdata, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {

                        const isItemSelected = isSelected(row._id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row._id)}
                            onClick={(event) =>{
                              dispatch({type:LOAD_LEAD_SUCCESS,payload:{}})
                              history.push("/details", { id: row._id })
                            }}

                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row._id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleClick(e, row._id);
                                }}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>

                            <TableCell align="center">
                              {getTriggerIcon(row.isHandoverCompleted, row.handoverRequestedTo)}
                            </TableCell>






                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[0]) ?

                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                  align="center"
                                >
                                  {row.firstName}
                                </TableCell>

                                : null
                            }



                            {/* <TableCell align="center">{row.flag}</TableCell> */}

                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[1]) ?

                                <TableCell align="center">{ConvertDateToLocal(row.createdAt)}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[2]) ?

                                <TableCell align="center">{ConvertDateToLocal(row.updatedAt)}</TableCell>

                                : null
                            }




                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[3]) ?

                                <TableCell align="center">{row.email}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[4]) ?

                                <TableCell align="center">{row.phone}</TableCell>

                                : null
                            }





                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[5]) ?

                                row.presaleExecutive === "" &&
                                  row.salesExecutive === "" ? (
                                  <TableCell align="center" style={{ flexWrap: "wrap" }}>
                                    {/* <ExecutiveDropDown /> */}

                                    <FormControl
                                      variant="outlined"
                                      className={classes.formControl}
                                      size="small"
                                    // style={{ backgroundColor: "#1e88e5" }}
                                    >
                                      <InputLabel
                                        id="demo-simple-select-outlined-label"
                                        style={{
                                          height: 40,
                                          fontSize: 14,
                                          paddingBottom: 30,
                                          color: "#1e88e5",
                                        }}
                                      >
                                        Assign To
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        // value={preSale}
                                        onChange={(event) =>
                                          handleChange(event, row._id)
                                        }
                                        placeholder="Assign To"
                                        // label="Age"
                                        style={{ height: 30, color: "#1e88e5" }}
                                        onClick={
                                          (e, value) => e.stopPropagation()

                                          // handleClick( row._id))
                                        }
                                      >
                                        {users.map((val, i) => (
                                          <MenuItem value={val}>
                                            {val.firstName}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                    {/* <div
                              // className="btn-group"
                              style={{ width: "100%" }}
                            >
                              <button
                                data-toggle="dropdown"
                                type="button"
                                style={{
                                  textDecoration: "underline",
                                  color: "#1e88e5",
                                  textTransform: "capitalize",
                                  fontSize: 13,
                                  width: "max-content",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(
                                    getSingleUser({
                                      role: "Pre Sale Executive",
                                    })
                                  );
                                }}
                              >
                                Assign To
                              </button> 
                              <div className="dropdown-menu select-status-dropdown">
                                    {this.state.allExecutives.map(
                                      (executive, i) => {
                                        return (
                                          <a
                                            className="dropdown-item"
                                            key={i}
                                            onClick={() => {
                                              this.assignExecutive(
                                                executive,
                                                n._id
                                              );
                                            }}
                                          >
                                            {executive.name}
                                          </a>
                                        );
                                      }
                                    )}
                                  </div>
                            </div> */}
                                  </TableCell>
                                ) : (
                                  <TableCell align="center">
                                    {
                                      row.presaleExecutive ? row.presaleExecutive.firstName : null

                                    }

                                    {/* {users?users.filter((element)=>element._id===row.presaleExecutive?element.firstName:null)[0].firstName:null} */}
                                  </TableCell>
                                )

                                : null
                            }



                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[6]) ? (

                                !row.presaleExecutive &&
                                  !row.salesExecutive ? (
                                  <TableCell align="center">
                                    {/* <ExecutiveDropDown /> */}
                                    <FormControl
                                      variant="outlined"
                                      className={classes.formControl}
                                      size="small"
                                    // style={{ backgroundColor: "#1e88e5" }}
                                    >
                                      <InputLabel
                                        id="demo-simple-select-outlined-label"
                                        style={{
                                          height: 40,
                                          fontSize: 14,
                                          paddingBottom: 30,
                                          color: "#1e88e5",
                                        }}
                                      >
                                        Assign To
                                      </InputLabel>
                                      <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        // value={saleExe}
                                        onChange={(event) =>
                                          handleChangeSales(event, row._id)
                                        }
                                        placeholder="Assign To"
                                        // label="Age"
                                        style={{ height: 30, color: "#1e88e5" }}
                                        onClick={
                                          (e) => e.stopPropagation()
                                          // handleClick( row._id))
                                        }
                                      >
                                        {sales.map((val, i) => (
                                          <MenuItem value={val}>
                                            {val.firstName}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                ) : (
                                  <TableCell align="center">
                                    {
                                      row.salesExecutive?.firstName
                                    }
                                  </TableCell>
                                )

                              ): null
                            }






                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[7]) ?

                                <TableCell align="center">{row.contactOn}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[8]) ?

                                <TableCell align="center">{row.stage?.name}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[9]) ?

                                <TableCell align="center">{row.status?.name}</TableCell>

                                : null
                            }



                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[10]) ?

                                <TableCell align="center" style={{ minWidth: "150px" }}>{row.projects}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[11]) ?

                                <TableCell align="center">{row.channel}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[12]) ?

                                <TableCell align="center">{row.medium}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[13]) ?

                                <TableCell align="center">{row.source}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[14]) ?

                                <TableCell align="center">{row.subSource}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[15]) ?

                                <TableCell align="center">{row.campaignname}</TableCell>

                                : null
                            }


                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[16]) ?

                                <TableCell align="center">{row.campaignterm}</TableCell>

                                : null
                            }

                            {
                              !getLeadsTableRestrictionData().includes(tableColumNames[17]) ?

                                <TableCell align="center">{row.campaigncontent}</TableCell>

                                : null
                            }


                          </TableRow>
                        );
                      })

                    : isNodata ?
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={headCells.length + 1} >
                          <NoResultFound />
                        </TableCell>
                      </TableRow> : null

                }
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} >

                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {
          console.log(leadCount)
        }
        <TablePagination
          rowsPerPageOptions={createRowPerPageOptionArray(filterdata?.length)}
          component="div"
          count={filterdata?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

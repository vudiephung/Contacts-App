import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import React, { Fragment, useEffect, useState } from "react";
import AddDrawer from "./AddDrawer";
import ContactDetail from "./ContactDetail";

interface Geo {
  lat: string;
  long: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Contact {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  phone: string;
  address: Address;
  company: Company;
}

interface TableData {
  name: string;
  username: string;
  email: string;
  website: string;
  phone: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "website",
    numeric: true,
    disablePadding: false,
    label: "Website",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        marginBottom: 2,
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} deleteSelected
        </Typography>
      ) : (
        <Box sx={{ flex: "100%" }}>
          <Grid sx={{ alignItems: "center" }} container>
            <Grid item>
              <Typography variant="h4" id="tableTitle" component="div">
                Contacts
              </Typography>
            </Grid>
            <Grid item>
              <AddDrawer />
            </Grid>
          </Grid>
        </Box>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          sx={{
            justifyContent: "right",
          }}
          title="Filter list"
        >
          <Paper
            component="form"
            sx={{
              p: "2px 3px",
              display: "flex",
              width: 250,
              borderRadius: "20px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Filter"
              inputProps={{ "aria-label": "Filter" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function Contacts() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof TableData>("name");
  const [deleteSelected, setDeleteSelected] = useState<readonly number[]>([]);
  const [openDialogId, setOpenDialogId] = useState<number>(-1);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";

    const fetchContactsData = async () => {
      try {
        const response = await fetch(url);
        const contacts = await response.json();
        setContacts(contacts);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchContactsData();
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = contacts.map((n) => n.id);
      setDeleteSelected(newSelecteds);
      return;
    }
    setDeleteSelected([]);
  };

  const handleClickSelect = (event: React.MouseEvent<unknown>, id: number) => {
    event.stopPropagation();
    const selectedIndex = deleteSelected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(deleteSelected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(deleteSelected.slice(1));
    } else if (selectedIndex === deleteSelected.length - 1) {
      newSelected = newSelected.concat(deleteSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        deleteSelected.slice(0, selectedIndex),
        deleteSelected.slice(selectedIndex + 1)
      );
    }

    setDeleteSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => deleteSelected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty contacts.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - contacts.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={deleteSelected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={deleteSelected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={contacts.length}
            />
            <TableBody>
              {stableSort(contacts, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact, index) => {
                  const isItemSelected = isSelected(contact.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const isOpenDialog = contact.id === openDialogId;

                  return (
                    <Fragment key={contact.id}>
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={contact.id}
                        onClick={() => setOpenDialogId(contact.id)}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) =>
                            handleClickSelect(event, contact.id)
                          }
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {contact.name}
                        </TableCell>
                        <TableCell align="right">{contact.username}</TableCell>
                        <TableCell align="right">{contact.email}</TableCell>
                        <TableCell align="right">{contact.website}</TableCell>
                        <TableCell align="right">{contact.phone}</TableCell>
                      </TableRow>
                      {isOpenDialog && (
                        <ContactDetail
                          setOpenDialogId={setOpenDialogId}
                          contact={contact}
                        />
                      )}
                    </Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={handleChangeDense}
            color="secondary"
          />
        }
        label="Dense padding"
      />
    </Box>
  );
}

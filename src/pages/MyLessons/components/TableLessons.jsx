import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { visuallyHidden } from '@mui/utils';
import { useHistory } from "react-router-dom";

import {formatDate, formatTime} from '@utils/timeHelp';

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'className',
        numeric: false,
        disablePadding: false,
        label: 'Class',
    },
    {
        id: 'gameType',
        numeric: true,
        disablePadding: false,
        label: 'Game',
    },
    {
        id: 'gameTime',
        numeric: true,
        disablePadding: false,
        label: 'Game time',
    },
    {
        id: 'percentCorrect',
        numeric: true,
        disablePadding: false,
        label: '%Correct',
    },
    {
        id: 'devinationTime',
        numeric: true,
        disablePadding: false,
        label: 'Devination time',
    },
    {
        id: 'numberQuestion',
        numeric: true,
        disablePadding: false,
        label: 'Number of questions',
    },
];

function EnhancedTableHead(props) {
  const { 
      order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({danceCheckBoxChecked, danceCheckBoxCheckedChsnge}) => {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                bgcolor: "white",
                borderBottom: 1,
                mt: "5px",
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h4"
                id="tableTitle"
                component="div"
            >
                Lessons list
            </Typography>
            <FormControlLabel
                sx={{
                    width: 210
                }}
                width={10}
                control={<Switch checked={danceCheckBoxChecked} onChange={danceCheckBoxCheckedChsnge} />}
                label="Dense padding"
            />
        </Toolbar>
    );
};


export const TableLessons = ({rows}) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('className');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    let history = useHistory();

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' , maxWidth: 1000, margin: '0px auto 0px'}}>
        <Paper sx={{ width: '100%', mb: 2, border: 1}}>
            <EnhancedTableToolbar 
                danceCheckBoxChecked={dense}
                danceCheckBoxCheckedChsnge={handleChangeDense}
            />
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        numSelected={0}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                            <TableRow
                                hover
                                tabIndex={-1}
                                key={row.mongoLessonId}
                                sx={{cursor: 'pointer'}}
                                onClick={() => history.push(`/lesson/${row.mongoLessonId}`)}
                            >
                                <TableCell
                                    component="th"
                                    sx={{letterSpacing: 0}}
                                    id={labelId}
                                    scope="row"
                                >
                                    <Typography
                                        variant="h6"
                                    >
                                        {row.className}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">{row.gameType}</TableCell>
                                <TableCell align="right">{formatDate(new Date(row.gameTime))}</TableCell>
                                <TableCell align="right">{(row.percentCorrect*100).toFixed(0)}</TableCell>
                                <TableCell align="right">{formatTime(row.devinationTime.toFixed(0))}</TableCell>
                                <TableCell align="right">{row.numberQuestion}</TableCell>
                            </TableRow>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </Box>
  );
}
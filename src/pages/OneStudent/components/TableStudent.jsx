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
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import UpArrowSvg from '@ui/icons/up-arrow.svg';


import { visuallyHidden } from '@mui/utils';
import { useHistory } from "react-router-dom";
import {formatTime} from '@utils/timeHelp';

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
    label: 'Name',
  },
  {
    id: 'correctPercent',
    numeric: true,
    disablePadding: false,
    label: '%Correct',
  },
  {
    id: 'averageTime',
    numeric: true,
    disablePadding: false,
    label: 'Average student response time',
  },
  {
    id: 'numberQuestion',
    numeric: true,
    disablePadding: false,
    label: 'Number of questions',
  },
  {
    id: 'button',
    numeric: true,
    disablePadding: false,
    label: '',
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

const EnhancedTableToolbar = ({ danceCheckBoxChecked, danceCheckBoxCheckedChsnge}) => {
    let history = useHistory();
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                bgcolor: "white",
                mt: "5px",
                justifyContent: 'space-around'
            }}
        >
            {/* <Box
                sx={{display: 'flex', flexDirection: 'column'}}
            >
            <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                <Typography
                    sx={{mr: 1}}
                    variant="h6"
                >
                Correct: 
                </Typography>
                <Typography
                    sx={{ }}
                    variant="h4"
                >
                    { productiveInfo.numberQuestion !== 0 ?
                    (100 * productiveInfo.numberCorrect/productiveInfo.numberQuestion).toFixed(0)
                    : 0}
                    <span>%</span>
                </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                <Typography
                    sx={{mr: 1}}
                    variant="h6"
                >
                Average time: 
                </Typography>
                <Typography
                    sx={{ }}
                    variant="h4"
                >
                    { productiveInfo.numberQuestion !== 0 ?
                    formatTime((productiveInfo.allTimeNedded/productiveInfo.numberQuestion).toFixed(0))
                    : 0}
                </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'baseline'}}>
                <Typography
                    sx={{mr: 1}}
                    variant="h6"
                >
                Number question: 
                </Typography>
                <Typography
                    sx={{}}
                    variant="h4"
                >
                    {productiveInfo.numberQuestion}
                </Typography>
            </Box>
            </Box>
            <FormControlLabel
                sx={{
                    width: 210
                }}
                width={10}
                control={<Switch checked={danceCheckBoxChecked} onChange={danceCheckBoxCheckedChsnge} />}
                label="Dense padding"
            /> */}
        </Toolbar>
    );
};


export const TableStudent = ({rows, openInfoList}) => {
    const [openInfo, setOpenInfo] = useState(openInfoList);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('className');
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
        {/* <EnhancedTableToolbar
            productiveInfo={productiveInfo}
            danceCheckBoxChecked={dense}
            danceCheckBoxCheckedChsnge={handleChangeDense}
        /> */}
        <Paper sx={{ width: '100%', mb: 2, border: 1}}>
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
                                <React.Fragment key={row.mongoLessonId}>
                                <TableRow
                                    tabIndex={-1}
                                >
                                    <TableCell
                                        component="th"
                                        sx={{letterSpacing: 0}}
                                        id={labelId}
                                        scope="row"
                                    >
                                        <Typography
                                            variant="h6"
                                            width={150}
                                        >
                                            {row.className}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">{row.correctPercent}</TableCell>
                                    <TableCell align="right">{formatTime(row.averageTime)}</TableCell>
                                    <TableCell align="right">
                                        {row.numberQuestion}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            sx={{width: 100}}
                                            onClick={() => setOpenInfo((prevState) => {
                                                const result = prevState;
                                                result[row.mongoLessonId] = !prevState[row.mongoLessonId];
                                                return {...result};
                                            })}
                                        >
                                            <span>Info</span>
                                            <Box sx={{
                                                width: 15,
                                                height: 15,
                                                ml: '10px',
                                                mt: openInfo[row.mongoLessonId] ? '-7px' : '3px',
                                                transform: openInfo[row.mongoLessonId] ? 'inherit' : 'rotateX(180deg)'
                                            }} >
                                                <UpArrowSvg />
                                            </Box>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow key={`wwjfndjfnd${row.mongoLessonId}`}>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={openInfo[row.mongoLessonId]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: "15px 10px 20px 10px" }}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        Academic performance
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                        <TableRow>
                                                            <TableCell>Subject</TableCell>
                                                            <TableCell>Topic</TableCell>
                                                            <TableCell>Time</TableCell>
                                                            <TableCell>Answer</TableCell>
                                                            <TableCell align="right">Question</TableCell>
                                                        </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        {row.answer.map(({correct, timeNeeded, question}, index) => (
                                                            <TableRow  key={index}>
                                                                <TableCell component="th" scope="row">
                                                                    {question.subject}
                                                                </TableCell>
                                                                <TableCell>{question.topic}</TableCell>
                                                                <TableCell>{formatTime(timeNeeded)}</TableCell>
                                                                <TableCell>
                                                                    {correct ? 'correct' : 'incorrect'}
                                                                </TableCell>
                                                                <TableCell align="right">{question.content}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
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
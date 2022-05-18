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
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { visuallyHidden } from '@mui/utils';
import { useHistory } from "react-router-dom";
import {AvatarGenerator} from '@utils/AvatarGenerator';

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
		id: 'nameStudent',
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
		id: 'averageStudent',
		numeric: true,
		disablePadding: false,
		label: 'Average student response time',
	},
	{
		id: 'deviationStudent',
		numeric: true,
		disablePadding: false,
		label: 'Deviation from average response time',
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

const EnhancedTableToolbar = ({mongoClassId, classTitle, danceCheckBoxChecked, danceCheckBoxCheckedChsnge}) => {
		let history = useHistory();
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
						<IconButton
								size="medium"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={() => history.push(`/class/${mongoClassId}`)}
								color="inherit"
						>
								<Typography
										sx={{ flex: '1 1 100%' }}
										variant="h4"
										id="tableTitle"
										component="div"
								>
										{classTitle}
								</Typography>
						</IconButton>
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


export const TableClassPerfomance = ({rows, classTitle, mongoClassId}) => {
	let history = useHistory();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('nameStudent');
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
		<Paper sx={{ width: '100%', mb: 2, border: 1}}>
			<EnhancedTableToolbar 
				classTitle={classTitle}
				mongoClassId={mongoClassId}
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
								tabIndex={-1}
								key={row.idBracelet}
							>
								<TableCell
									align="left"
								>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
										}}
									>
										{row.avatar ?
											<IconButton
												sx={{
													mr: 2,
												}}
												onClick={() => history.push(`/student/${row.idBracelet}`)}
											>
												<AvatarGenerator
													avatar={row.avatar}
													width="40px"
													height="40px"
													name={row.nameStudent}
												/>
											</IconButton>
										: null}
										<Typography
											variant="h6"
											width={150}
											ml={3}
										>
											{row.nameStudent}
										</Typography>
									</Box> 
									</TableCell>
									<TableCell align="right">{row.correctPercent}</TableCell>
									<TableCell align="right">{row.averageStudent}</TableCell>
									<TableCell align="right">{row.deviationStudent}</TableCell>
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
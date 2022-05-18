import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


import Logo from '@ui/icons/logo.svg';
import MenuSvg from '@ui/icons/menu.svg';
import {useDispatch, useSelector} from 'react-redux';
import {logoutStudent} from '@redux/actions';
import { useHistory, useLocation } from "react-router-dom";
import {AvatarGenerator} from '@utils/AvatarGenerator';

const pages = [
	{label: 'Lessons', href: '/student/lessons'},
	{label: 'Instruction', href: '/instruction'}
];
const settings = [
	{label: 'Profile', href: '/profile/student'},
	{label: 'Logout', href: '/logout'}
];

export const StudentMenuLayout = ({children}) => {
	let history = useHistory();
	const location = useLocation();
	const pathCurrent = location.pathname.slice(0, 6)
	const student = useSelector((state) => state.student);
	const dispatch = useDispatch();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	console.log('student', student);
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box>
			<AppBar position="static" color="inherit">
				<Container maxWidth="md">
					<Toolbar disableGutters>
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="medium"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuSvg />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									width: '1000px',
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map(({label, href}) => (
									<MenuItem key={label} onClick={() => {
										handleCloseNavMenu();
										history.push(`${href}`);
									}}>
										<Typography 
											align="center"
											sx={{borderBottom: pathCurrent === href.slice(0, 6) ? 1 : 0}}
										>
											{label}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Box sx={{ flexGrow: 1, alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
							<Box
								style={{margin: "0 20px 0 0"}}
							>
								<Logo />
							</Box>
							{pages.map(({label, href}) => (
								<Button
									key={label}
									onClick={() => {
										handleCloseNavMenu();
										history.push(`${href}`);
									}}
									sx={{ my: 2, color: 'black', display: 'block' }}
								>
									<Typography 
										align="center"
										sx={{borderBottom: pathCurrent === href.slice(0, 6) ? 1 : 0}}
									>
										{label}
									</Typography>
								</Button>
							))}
						</Box>

						<Box sx={{ 
							flexGrow: 0,
 						}}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									{student.avatar ? (
										<AvatarGenerator 
                                            avatar={student.avatar}
                                            width="40px"
                                            height="40px"
                                            name={student.name}
                                        />) : (
											<Avatar alt="Remy Sharp"/>
										)}
								</IconButton>
							</Tooltip>
							<Menu
								id="account-menu"								
								anchorEl={anchorElUser}
								keepMounted
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
								sx={{
									elevation: 3,
									overflow: 'visible',
									filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
									mt: 1.5,
									'&::before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
										zIndex: 0,
									},
								}}
								transformOrigin={{ horizontal: 'right', vertical: 'top' }}
								anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
							>
							{settings.map(({label, href}) => (
								<MenuItem key={label} onClick={() => {
									handleCloseUserMenu();
									if(href === '/logout') {
										dispatch(logoutStudent());
									} else {
										history.push(`${href}`);
									}
								}}>
									<Typography align="center">{label}</Typography>
								</MenuItem>
							))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			{children}
		</Box>
	);
};

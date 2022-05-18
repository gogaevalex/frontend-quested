import st from 'styled-components';
import * as Yup from "yup";
import { Formik } from "formik";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from 'react-redux';

import {updateTeacherProfile} from '@redux/actions';

export const ProfileTeacher = () => {
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	const teacher = useSelector((state) => state.teacher);
	// const isLoad = loads.isLoadAuth;
	
	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			justifyContent="center"
			mt={7}
			mb={7}
		>
			<Typography
				variant="h3"
				align="center"
			>
				{`${teacher.name} ${teacher.surname}`}
			</Typography>
			<Container maxWidth="sm" sx={{mb: 4, mt: 4}} >
				<Formik
					initialValues={{
						name: teacher.name,
						surname: teacher.surname,
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().max(100).required("Name is required"),
						surname: Yup.string().max(100).required("Surname is required"),
					})}
					onSubmit={(values, { setSubmitting }) => {
						console.log('values', values)
						dispatch(updateTeacherProfile({
							name: values.name,
							surname: values.surname,
						}));
						setSubmitting(false);
					}}
				>
					{({
						errors,
						handleBlur,
						handleChange,
						handleSubmit,
						isSubmitting,
						touched,
						values,
					}) => {
						return (
						<form onSubmit={handleSubmit}>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"
								align="center"
							>
								you can change your details
							</Typography>
							<TextField
								error={Boolean(touched.name && errors.name)}
								fullWidth
								helperText={touched.name && errors.name}
								label="Name"
								margin="normal"
								name="name"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.name}
								variant="outlined"
							/>
								<TextField
								error={Boolean(touched.surname && errors.surname)}
								fullWidth
								helperText={touched.surname && errors.surname}
								label="Surname"
								margin="normal"
								name="surname"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.surname}
								variant="outlined"
							/>
							<Box my={2}>
								<Button
									color="primary"
									disabled={isSubmitting}
									fullWidth
									size="large"
									type="submit"
									variant="contained"
								>
									Change details
								</Button>
							</Box>
						</form>
					)}}
				</Formik>
			</Container>
            <Container maxWidth="sm">
				<Formik
					initialValues={{
						password: "",
						confirmPassword: "",
					}}
					validationSchema={Yup.object().shape({
						password: Yup.string().min(6).max(100).required("Password is required"),
						confirmPassword: Yup.string().min(6).max(100).required("Confirm password is required"),
					})}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(teacherReg({
							password: values.password,
						}));
						setSubmitting(false);
					}}
				>
					{({
						errors,
						handleBlur,
						handleChange,
						handleSubmit,
						isSubmitting,
						touched,
						values,
					}) => {
						let helperTextConfirmPassword = ""
						if (Boolean(touched.confirmPassword && errors.confirmPassword)) {
							helperTextConfirmPassword = errors.confirmPassword;
						} else if (Boolean(touched.confirmPassword && !errors.confirmPassword) && 
							(values.confirmPassword !== values.password)) {
							helperTextConfirmPassword = 'Passwords do not match'
						}
						return (
						<form onSubmit={handleSubmit}>
							<Typography
								color="textSecondary"
								gutterBottom
								variant="body2"
								align="center"
							>
								You can change your password
							</Typography>
							<TextField
								error={Boolean(touched.password && errors.password)}
								fullWidth
								helperText={touched.password && errors.password}
								label="Password"
								margin="normal"
								name="password"
								onBlur={handleBlur}
								onChange={handleChange}
								type="password"
								value={values.password}
								variant="outlined"
							/>
							<TextField
								error={Boolean(touched.confirmPassword && errors.confirmPassword)
									|| (Boolean(touched.confirmPassword && !errors.confirmPassword)
									&& (values.confirmPassword !== values.password))}
								fullWidth
								helperText={helperTextConfirmPassword}
								label="Confirm password"
								margin="normal"
								name="confirmPassword"
								onBlur={handleBlur}
								onChange={handleChange}
								type="password"
								value={values.confirmPassword}
								variant="outlined"
							/>
							<Box my={2}>
								<Button
									color="primary"
									disabled={isSubmitting}
									fullWidth
									size="large"
									type="submit"
									variant="contained"
								>
									Change passworg
								</Button>
							</Box>
						</form>
					)}}
				</Formik>
			</Container>
		</Box>
	);
};
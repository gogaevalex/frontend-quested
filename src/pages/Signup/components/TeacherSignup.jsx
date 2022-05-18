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

import {teacherReg} from '@redux/actions';

export const TeacherSignup = () => {
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	// const {loads} = useSelector((state) => state.teacher);
	// const isLoad = loads.isLoadAuth;
	
	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			justifyContent="center"
		>
			<Container maxWidth="sm">
				<Formik
					initialValues={{
						teacherId: "",
						email: "",
						password: "",
						confirmPassword: "",
						name: "",
						surname: "",
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().email().required("email is required"),
						password: Yup.string().min(6).max(100).required("Password is required"),
						confirmPassword: Yup.string().min(6).max(100).required("Confirm password is required"),
						teacherId: Yup.string().max(100).required("admin code is required"),
						name: Yup.string().max(100).required("Name is required"),
						surname: Yup.string().max(100).required("Surname is required"),
					})}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(teacherReg({
							teacherId: values.teacherId,
							email: values.email,
							password: values.password,
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
								Take your teacher code from the app to register
							</Typography>
							<TextField
								error={Boolean(touched.teacherId && errors.teacherId)}
								fullWidth
								helperText={touched.teacherId && errors.teacherId}
								label="AdminCode"
								margin="normal"
								name="teacherId"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.teacherId}
								variant="outlined"
							/>
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
							<TextField
								error={Boolean(touched.email && errors.email)}
								fullWidth
								helperText={touched.email && errors.email}
								label="Email"
								margin="normal"
								name="email"
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								variant="outlined"
							/>
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
									Sign up now
								</Button>
							</Box>
							<Typography color="textSecondary" variant="body1">
								Have an account?{" "}
								<Link href="/login" variant="h6">
									Sign in
								</Link>
							</Typography>
						</form>
					)}}
				</Formik>
			</Container>
		</Box>
	);
};

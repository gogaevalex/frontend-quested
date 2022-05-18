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

import {studentReg} from '@redux/actions';

export const StudentSignup = () => {
	const dispatch = useDispatch();
	// eslint-disable-next-line no-unused-vars
	// const {loads} = useSelector((state) => state.admin);
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
						idBracelet: "",
						password: "",
						confirmPassword: "",
					}}
					validationSchema={Yup.object().shape({
						password: Yup.string().min(6).max(100).required("Password is required"),
						confirmPassword: Yup.string().min(6)
							.max(100).required("Confirm password is required"),
						idBracelet: Yup.string().max(100).required("Сode bracelet is required"),

					})}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(studentReg({
							idBracelet: values.idBracelet,
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
									Take your bracelet from the teacher and create a password
								</Typography>
								<TextField
									error={Boolean(touched.idBracelet && errors.idBracelet)}
									fullWidth
									helperText={touched.idBracelet && errors.idBracelet}
									label="Code bracelet"
									margin="normal"
									name="idBracelet"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.idBracelet}
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

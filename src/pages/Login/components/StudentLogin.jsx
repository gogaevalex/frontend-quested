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

import {studentLogin} from '@redux/actions';

export const StudentLogin = () => {
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
					}}
					validationSchema={Yup.object().shape({
						password: Yup.string().max(255).required("Password is required"),
						idBracelet: Yup.string().max(255).required("admin code is required"),

					})}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(studentLogin(values));
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
					}) => (
						<form onSubmit={handleSubmit}>
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
							<Box my={2}>
								<Button
									color="primary"
									disabled={isSubmitting}
									fullWidth
									size="large"
									type="submit"
									variant="contained"
								>
									Sign in now
								</Button>
							</Box>
                            <Typography color="textSecondary" variant="body1">
                                Not have an account?{" "}
                                <Link href="/signup" variant="h6">
                                    Sign up
                                </Link>
                            </Typography>
						</form>
					)}
				</Formik>
			</Container>
		</Box>
	);
};

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

import {teacherLogin} from '@redux/actions';

export const TeacherLogin = () => {
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
						email: "",
						password: "",
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().email().required("email is required"),
						password: Yup.string().max(255).required("Password is required"),

					})}
					onSubmit={(values, { setSubmitting }) => {
						dispatch(teacherLogin(values));
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

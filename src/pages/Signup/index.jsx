import st from 'styled-components';
import * as Yup from "yup";
import { Formik } from "formik";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import {StudentSignup} from './components/StudentSignup';
import {TeacherSignup} from './components/TeacherSignup';

export const Signup = () => {
    const [isTeacher, setIsTeacher] = useState(false);
	return (
		<Box
			display="flex"
			flexDirection="column"
			height="100%"
			justifyContent="center"
		>
            <Container maxWidth="sm">
                <Typography color="textPrimary" variant="h2" align="center">
                    Create new account
                </Typography>
                <Box
                    display="flex"
                    justifyContent= "center"
                    style={{
                        margin: "0 0 20px 0",
                    }}
                >
                    <Button
                        color="primary"
                        size="large"
                        variant={!isTeacher ? 'contained' : 'outlined'}
                        onClick={() => setIsTeacher(false)}
                        style={{
                            margin: "20px",
                        }}
                    >
                        Student
                    </Button>
                    <Button
                        color="primary"
                        size="large"
                        variant={isTeacher ? 'contained' : 'outlined'}
                        onClick={() => setIsTeacher(true)}
                        style={{
                            margin: "20px",
                        }}                >
                        Teacher
                    </Button>
                </Box>
            </Container>
            {isTeacher ? <TeacherSignup /> : <StudentSignup /> }
		</Box>
	);
};

import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	return (
		<Container variant="small">
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField name="username" label="Username" />
						<Box mt={4}>
							<InputField
								name="password"
								label="Password"
								type="password"
							/>
						</Box>
						<Button
							mt={4}
							type="submit"
							isLoading={isSubmitting}
							variantColor="teal"
						>
							Register
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default Register;

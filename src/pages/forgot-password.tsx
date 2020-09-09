import { Alert, AlertIcon, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC = ({}) => {
	const router = useRouter();
	const [complete, setComplete] = useState(false);
	const [, forgotPassword] = useForgotPasswordMutation();
	return (
		<Container variant="small">
			<Formik
				initialValues={{ email: "" }}
				onSubmit={async (values) => {
					await forgotPassword(values);
					setComplete(true);
				}}
			>
				{({ isSubmitting }) =>
					complete ? (
						<Alert status="success">
							<AlertIcon />
							If an account with that email exists, we sent you an
							email
						</Alert>
					) : (
						<Form>
							<InputField
								name="email"
								label="Email"
								type="email"
							/>
							<Button
								mt={4}
								type="submit"
								isLoading={isSubmitting}
								variantColor="teal"
							>
								Reset password
							</Button>
						</Form>
					)
				}
			</Formik>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

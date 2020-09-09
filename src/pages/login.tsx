import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link } from "@chakra-ui/core";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

const Login: React.FC = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
	return (
		<Container variant="small">
			<Box mb={4}>
				<Formik
					initialValues={{ usernameOrEmail: "", password: "" }}
					onSubmit={async (values, { setErrors }) => {
						const response = await login(values);
						if (response.data?.login.errors) {
							setErrors(toErrorMap(response.data.login.errors));
						} else if (response.data?.login.user) {
							router.push("/");
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField
								name="usernameOrEmail"
								label="Username or email"
							/>
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
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
			<Box textAlign="right">
				<NextLink href="/forgot-password">
					<Link>Forgot password?</Link>
				</NextLink>
			</Box>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Login);

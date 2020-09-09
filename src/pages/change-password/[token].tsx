import React, { useState } from "react";
import { NextPage } from "next";
import { Container } from "../../components/Container";
import { Formik, Form } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import {
	Button,
	Alert,
	AlertIcon,
	AlertDescription,
	CloseButton,
	Link,
} from "@chakra-ui/core";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
	const router = useRouter();
	const [, changePassword] = useChangePasswordMutation();
	const [tokenError, setTokenError] = useState("");
	return (
		<Container variant="small">
			<Formik
				initialValues={{ newPassword: "" }}
				onSubmit={async ({ newPassword }, { setErrors }) => {
					const response = await changePassword({
						newPassword,
						token,
					});
					if (response.data?.changePassword.errors) {
						const errorMap = toErrorMap(
							response.data.changePassword.errors
						);
						if ("token" in errorMap) {
							setTokenError(errorMap.token);
						}
						setErrors(errorMap);
					} else if (response.data?.changePassword.user) {
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						{tokenError ? (
							<Alert status="error" mb={4}>
								<AlertIcon />
								<AlertDescription>
									{tokenError}
									<NextLink href="/forgot-password">
										<Link ml={2}>Get new one</Link>
									</NextLink>
								</AlertDescription>
								<CloseButton
									position="absolute"
									right="8px"
									top="8px"
								/>
							</Alert>
						) : null}
						<InputField
							name="newPassword"
							label="New password"
							type="password"
						/>
						<Button
							mt={4}
							type="submit"
							isLoading={isSubmitting}
							variantColor="teal"
						>
							Change password
						</Button>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

ChangePassword.getInitialProps = ({ query }) => ({
	token: query.token as string,
});

export default withUrqlClient(createUrqlClient)(ChangePassword);

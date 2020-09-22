import React from "react";
import { NextPage } from "next";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useGetIdFromUrl } from "../../../utils/useGetIdFromUrl";
import {
	usePostQuery,
	useUpdatePostMutation,
} from "../../../generated/graphql";
import { useRouter } from "next/router";

const EditPost: NextPage = () => {
	const id = useGetIdFromUrl();
	const router = useRouter();
	const [{ data, fetching }] = usePostQuery({ variables: { id } });
	const [, updatePost] = useUpdatePostMutation();

	if (fetching) {
		return <Layout>Loading...</Layout>;
	}

	if (!data?.post) {
		return (
			<Layout>
				<Box>Could not find post</Box>
			</Layout>
		);
	}

	return (
		<Layout variant="small">
			<Formik
				initialValues={{ title: data.post.title, text: data.post.text }}
				onSubmit={async (values) => {
					await updatePost({ id, ...values });
					router.push("/");
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField name="title" label="Title" />
						<Box mt={4}>
							<InputField
								name="text"
								label="Body"
								textarea
								height="300px"
							/>
						</Box>
						<Button
							mt={4}
							type="submit"
							isLoading={isSubmitting}
							variantColor="teal"
						>
							Update post
						</Button>
					</Form>
				)}
			</Formik>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient)(EditPost);

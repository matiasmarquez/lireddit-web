import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostQuery } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Box, Heading, Text } from "@chakra-ui/core";

const Post: NextPage = () => {
	const router = useRouter();
	const param = router.query.id;
	const id = typeof param === "string" ? parseInt(param) : -1;
	const [{ data, fetching, error }] = usePostQuery({
		pause: id === -1,
		variables: {
			id: id,
		},
	});

	if (error) {
		console.log("error", error.message);
	}

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
		<Layout>
			<Heading mb={4}>{data.post.title}</Heading>
			<Text>{data.post.text}</Text>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);

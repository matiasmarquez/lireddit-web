import React from "react";
import { NextPage } from "next";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Layout } from "../../components/Layout";
import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl ";
import { PostActions } from "../../components/PostActions";

const Post: NextPage = () => {
	const [{ data, error, fetching }] = useGetPostFromUrl();

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
			<Flex align="center" justify="space-between">
				<Heading mb={4}>{data.post.title}</Heading>
				<PostActions id={data.post.id} authorId={data.post.author.id} />
			</Flex>
			<Text>{data.post.text}</Text>
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);

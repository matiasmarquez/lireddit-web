import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 10,
		cursor: null as null | string,
	});

	const [{ data, fetching }] = usePostsQuery({
		variables,
	});
	return (
		<Layout>
			<Flex align="center" justify="space-between">
				<Heading>LiReddit</Heading>
				<NextLink href="/create-post">
					<Button variantColor="teal" size="sm">
						Create post
					</Button>
				</NextLink>
			</Flex>
			<br />
			{!data && fetching ? (
				<div>loading...</div>
			) : (
				<Stack spacing={8}>
					{data!.posts.posts.map((p) => (
						<Box key={p.id} p={5} shadow="md" borderWidth="1px">
							<Heading fontSize="xl">{p.title}</Heading>
							<Text mt={4}>{p.shortText}</Text>
						</Box>
					))}
				</Stack>
			)}
			{data && data.posts.hasMore ? (
				<Flex justify="center">
					<Button
						onClick={() => {
							setVariables({
								limit: variables.limit,
								cursor:
									data.posts.posts[
										data.posts.posts.length - 1
									].createdAt,
							});
						}}
						isLoading={fetching}
						my={8}
					>
						load more
					</Button>
				</Flex>
			) : null}
		</Layout>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);

import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { PostActions } from "../components/PostActions";
import { UpdootSection } from "../components/UpdootSection";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

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
			{!data && fetching ? (
				<div>loading...</div>
			) : (
				<Stack spacing={8}>
					{data!.posts.posts.map((p) =>
						!p ? null : (
							<Flex
								key={p.id}
								p={5}
								shadow="md"
								borderWidth="1px"
							>
								<UpdootSection post={p} />
								<Box flex={1}>
									<Flex justify="space-between">
										<Box>
											<NextLink
												href="/post/[id]"
												as={`/post/${p.id}`}
											>
												<Link>
													<Heading fontSize="xl">
														{p.title}
													</Heading>
												</Link>
											</NextLink>
											<Text
												fontSize="sm"
												as="i"
												color="gray"
											>
												Posted by {p.author.username}
											</Text>
											<Text mt={4}>{p.shortText}</Text>
										</Box>
										<PostActions
											id={p.id}
											authorId={p.author.id}
										/>
									</Flex>
								</Box>
							</Flex>
						)
					)}
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

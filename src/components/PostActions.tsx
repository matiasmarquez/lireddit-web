import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface PostActionsProps {
	id: number;
	authorId: number;
}

export const PostActions: React.FC<PostActionsProps> = ({ id, authorId }) => {
	const [, deletePost] = useDeletePostMutation();
	const [{ data }] = useMeQuery();

	if (data?.me?.id !== authorId) {
		return null;
	}

	return (
		<Box>
			<NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
				<IconButton
					as={Link}
					icon="edit"
					aria-label="Edit post"
					size="sm"
					onClick={() => {
						console.log("edit");
					}}
				/>
			</NextLink>
			<IconButton
				ml={3}
				variantColor="red"
				icon="delete"
				aria-label="Delete post"
				size="sm"
				onClick={() => {
					deletePost({
						id,
					});
				}}
			/>
		</Box>
	);
};

import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
	post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
	const [loading, setLoading] = useState<"updoot" | "downdoot" | null>(null);
	const [, vote] = useVoteMutation();
	return (
		<Flex direction="column" align="center" justify="center" mr={4}>
			<IconButton
				onClick={async () => {
					if (post.voteStatus === 1) {
						return;
					}
					setLoading("updoot");
					await vote({
						postId: post.id,
						value: 1,
					});
					setLoading(null);
				}}
				variantColor={post.voteStatus === 1 ? "green" : undefined}
				isLoading={loading === "updoot"}
				aria-label="updoot post"
				icon="chevron-up"
			/>
			{post.points}
			<IconButton
				onClick={async () => {
					if (post.voteStatus === -1) {
						return;
					}
					setLoading("downdoot");
					await vote({
						postId: post.id,
						value: -1,
					});
					setLoading(null);
				}}
				variantColor={post.voteStatus === -1 ? "red" : undefined}
				isLoading={loading === "downdoot"}
				aria-label="downdoot post"
				icon="chevron-down"
			/>
		</Flex>
	);
};

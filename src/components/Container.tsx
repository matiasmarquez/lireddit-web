import React from "react";
import { Box } from "@chakra-ui/core";

export type ContainerVariant = "small" | "regular";

interface ContainerProps {
	variant?: ContainerVariant;
}

export const Container: React.FC<ContainerProps> = ({
	children,
	variant = "regular",
}) => {
	return (
		<Box
			mt={8}
			mx="auto"
			maxW={variant === "regular" ? "800px" : "400px"}
			w="100%"
		>
			{children}
		</Box>
	);
};

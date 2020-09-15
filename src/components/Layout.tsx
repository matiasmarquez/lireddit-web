import React from "react";
import { Container, ContainerVariant } from "./Container";
import { NavBar } from "./NavBar";

interface LayoutProps {
	variant?: ContainerVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
	return (
		<>
			<NavBar />
			<Container variant={variant}>{children}</Container>
		</>
	);
};

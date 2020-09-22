import { usePostQuery } from "../generated/graphql";
import { useGetIdFromUrl } from "./useGetIdFromUrl";

export const useGetPostFromUrl = () => {
	const id = useGetIdFromUrl();
	return usePostQuery({
		variables: { id },
	});
};

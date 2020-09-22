import { useRouter } from "next/router";

export const useGetIdFromUrl = () => {
	const router = useRouter();
	const param = router.query.id;
	return typeof param === "string" ? parseInt(param) : -1;
};

import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

function ProductItemSkeleton() {
  return (
    <Stack spacing={0.5} width="100%" padding="1rem" margin="1rem 0">
      <Skeleton variant="rectangular" height={"18rem"} animation="wave" />
      <Skeleton variant="text" height={35} animation="wave" />
      <Skeleton variant="text" height={35} animation="wave" />
      <Skeleton
        variant="rectangular"
        width={"3rem"}
        height={"1rem"}
        animation="wave"
      />
      <Skeleton variant="rectangular" height={"3rem"} animation="wave" />
    </Stack>
  );
}

export default ProductItemSkeleton;

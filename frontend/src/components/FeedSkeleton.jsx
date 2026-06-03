import { Box, Card, Skeleton, Stack } from "@mui/material";

export const FeedSkeleton = () => (
  <Stack spacing={1.5}>
    {Array.from({ length: 3 }).map((_, index) => (
      <Card
        key={index}
        elevation={0}
        sx={{ border: "1px solid #edeff1", borderRadius: 2, p: 2 }}
      >
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <Skeleton variant="circular" width={32} height={32} />
          <Box flex={1}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="20%" />
          </Box>
          <Skeleton variant="rounded" width={88} height={32} sx={{ borderRadius: "999px" }} />
        </Stack>
        <Skeleton variant="text" width="85%" height={28} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
        <Stack direction="row" spacing={1} mt={2}>
          <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: "999px" }} />
          <Skeleton variant="rounded" width={72} height={36} sx={{ borderRadius: "999px" }} />
        </Stack>
      </Card>
    ))}
  </Stack>
);

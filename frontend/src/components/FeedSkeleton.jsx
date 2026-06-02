import { Card, CardContent, Skeleton, Stack } from "@mui/material";

export const FeedSkeleton = () => (
  <Stack spacing={2}>
    {Array.from({ length: 3 }).map((_, index) => (
      <Card key={index}>
        <CardContent>
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
        </CardContent>
      </Card>
    ))}
  </Stack>
);

import { Card, CardContent, Typography } from "@mui/material";

export const EmptyState = ({ title, description }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
    </CardContent>
  </Card>
);

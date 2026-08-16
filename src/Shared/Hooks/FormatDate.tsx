export const formatDate = ({ createdAt }: { createdAt: string }) => (
  new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
);
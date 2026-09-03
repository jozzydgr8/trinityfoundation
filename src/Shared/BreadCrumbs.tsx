import { Link, useMatches } from "react-router-dom";

type BreadcrumbHandle = {
  breadcrumb:
    | string
    | ((match: {
        params: Record<string, string | undefined>;
      }) => string);
};

export default function Breadcrumbs() {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => match.handle)
    .filter((match) => {
      const handle = match.handle as BreadcrumbHandle;
      return handle.breadcrumb;
    })
    .map((match) => {
      const handle = match.handle as BreadcrumbHandle;

      const label =
        typeof handle.breadcrumb === "function"
          ? handle.breadcrumb(match)
          : handle.breadcrumb;

      return {
        label,
        pathname: match.pathname,
      };
    });

  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <span  key={breadcrumb.pathname}>
            {isLast ? (
              <span>{breadcrumb.label}</span>
            ) : (
              <Link to={breadcrumb.pathname}>
                {breadcrumb.label}
              </Link>
            )}

            {!isLast && <span> &gt; </span>}
          </span>
        );
      })}
    </nav>
  );
}

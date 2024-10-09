import Link from "next/link";

export default function CustomLink({
  href,
  title,
  icon,
  className,
  titleClassName,
}) {
  return (
    <Link href={href || "/"} className={className || ""}>
      {icon && icon}
      {title && (
        <p className={titleClassName || "text-sm font-medium"}>{title}</p>
      )}
    </Link>
  );
}

import { Link } from "@inertiajs/react";

function Pagination({ links }) {
  return (
    <nav className="text-right my-4">
      {links.map((link, index) => (
        <Link
          preserveScroll
          key={index}
          href={link.url || ""}
          className={
            "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs mx-2 " +
            (link.active ? "bg-gray-950 " : " ") +
            (!link.url
              ? "!text-gray-500 cursor-not-allowed "
              : "hover:bg-gray-950")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}

export default Pagination;

//

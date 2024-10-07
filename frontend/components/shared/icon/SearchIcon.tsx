import React from "react";

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    color={"#000000"}
    fill={"none"}
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 10H7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2 17H7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2 3H19"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M19.6 18.6L22 21M20.8 14.4C20.8 11.4176 18.3824 9 15.4 9C12.4176 9 10 11.4176 10 14.4C10 17.3824 12.4176 19.8 15.4 19.8C18.3824 19.8 20.8 17.3824 20.8 14.4Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default SearchIcon;

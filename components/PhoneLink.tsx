"use client";

import React from "react";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function PhoneLink({ href, onClick, ...rest }: Props) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}

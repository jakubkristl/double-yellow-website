"use client";

import React from "react";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function PhoneLink({ href, onClick, ...rest }: Props) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (typeof window !== "undefined" && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion(href);
    }
    if (onClick) {
      onClick(event);
    }
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}

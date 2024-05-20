import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ToggleMode";

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="p-4 flex items-center justify-between relative mx-2">
      <aside className="flex items-center gap-2 ">
        <img src="./assets/strapi-logo.png" alt="" width={30} height={30} />
        <h4 className="sm:text-4xl font-bold text-primary">Strapi.</h4>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link to={"/"}>Pricing</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Documentation</Link>
          <Link to={"/"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
      
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;

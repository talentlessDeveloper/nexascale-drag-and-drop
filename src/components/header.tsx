import { ModeToggle } from "./mode-toggle";

import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="container mx-auto flex justify-between items-center py-5 shadow-md">
        <a href="/" className="text-2xl">
          NexaScale
        </a>

        <ModeToggle />
      </nav>
    </header>
  );
};

export default Header;

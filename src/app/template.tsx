import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      {children}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    </React.Fragment>
  );
}

"use client";

import React from "react";

const Page = () => {
  return (
    <div className="w-full flex justify-center p-4">
      <video
        src="/videos/educafe.mp4"
        controls
        autoPlay
        muted
        loop
        playsInline
        className="w-full max-w-5xl rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Page;

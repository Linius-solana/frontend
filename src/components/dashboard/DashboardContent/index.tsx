"use client";

import { Tab, Tabs } from "@nextui-org/react";
import React from "react";

import PostContent from "./PostContent";

import { MOCK_POST_DATA, MOCK_POST_DATA2 } from "@/config/constants";

export type Post = {
  post_content: string;
  post_image: string[];
  user_address: string;
};

const DashboardContent = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        className="mb-4"
        color="default"
        radius="full"
        variant="light"
      >
        <Tab key="trending" title="Trending">
          <PostContent {...MOCK_POST_DATA} />
          <PostContent {...MOCK_POST_DATA2} />
        </Tab>
        <Tab key="music" title="Music">
          <PostContent {...MOCK_POST_DATA} />
        </Tab>
        <Tab key="videos" title="Videos">
          <PostContent {...MOCK_POST_DATA} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DashboardContent;

/**
 * @file constants.ts
 * @summary Constants for the frontend, all the constants should be defined here
 */

import { faker } from "@faker-js/faker";
import { Network } from "@aptos-labs/ts-sdk";

import { PostContentProps } from "@/components/dashboard/DashboardContent/PostContent";
import { ProfileDetailType } from "@/types";

export const APP_NAME = "My App";
export const APP_VERSION = "0.0.1";
export const APP_DESCRIPTION = "My App Description";
export const APP_KEYWORDS = "My App Keywords";

export const PROFILE: ProfileDetailType = {
  name: faker.person.fullName(),
  address: faker.finance.ethereumAddress(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  id: faker.finance.ethereumAddress(),
  projectsNumber: faker.number.int({
    min: 1,
    max: 100,
  }),
  earningsNumber: faker.number.int({
    min: 1,
    max: 100,
  }),
  fieldNumber: faker.number.int({
    min: 1,
    max: 100,
  }),
  tokenValue: faker.number.int({
    min: 1,
    max: 100,
  }),
  backgroundUrl: faker.image.urlLoremFlickr({
    category: "nature",
    width: 600,
    height: 400,
  }),
};

export const MOCK_PROJECT_DATA = {
  projectName: faker.lorem.words(),
  projectDescription: faker.lorem.sentence(),
  projectLink: faker.internet.url(),
  projectImageLink: faker.image.url(),
  contributors: faker.number.int({
    min: 1,
    max: 100,
  }),
  saleType: "Public",
  minBuy: faker.number.int({
    min: 1,
    max: 100,
  }),
  maxBuy: faker.number.int({
    min: 1,
    max: 100,
  }),
  tokenValue: faker.number.int({
    min: 1,
    max: 100,
  }),
  progress: faker.number.int({
    min: 1,
    max: 100,
  }),
};

export const MOCK_POST_DATA: PostContentProps = {
  author: "Super Team VN",
  avatarUrl: "/super_team.jpg",
  lastActive: 1,
  isActive: true,
  imageUrl: "/radar.jpg",
  postContent:
    "Colosseum's hackathons are intensive engineering and business sprints offering elite developers the chance to win prizes up to $50,000 in USDC, pre-seed funding, and mentorship across categories like Consumer, DeFi, Payments, DePIN, Gaming, Infrastructure, DAOs & Network States, as well as special awards for University teams, Public Goods, and Climate-friendly projects",
  commentList: [
    "Colosseum's hackathons seem like a fantastic opportunity for developers to showcase their skills while competing for significant prizes and funding. The focus on categories like DeFi, Gaming, and Climate-friendly projects makes it a well-rounded event for diverse innovators.",
  ],
};

export const MOCK_POST_DATA2: PostContentProps = {
  author: "EyC8VijeYiCQK5immH22YFSttjDWBDSeoh8CsTMXRjgF",
  avatarUrl: "/solana_image.jpg",
  lastActive: 1,
  isActive: true,
  imageUrl: "/wif.jpeg",
  postContent: "Trade $WIF on Raydium for best prices 👍👍",
  commentList: ["LFG 🚀", "Best $WIF 🚀"],
};

export const MOCK_PROJECT_DETAILS = {
  projectDescription: faker.lorem.paragraphs(10, "\n"),
  projectLink: faker.internet.url(),
  projectImageLink: faker.image.urlLoremFlickr({
    category: "nature",
    width: 600,
    height: 400,
  }),
};

export const NETWORK: Network =
  (process.env.NEXT_PUBLIC_APP_NETWORK as Network) || Network.TESTNET;

export const SOCIAL_ADDRESS = process.env.NEXT_PUBLIC_SOCIAL_ADDRESS as string;

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const IRYS_GATE_WAY = process.env.NEXT_PUBLIC_IRYS_GATE_WAY as string;

export const METADATA_OBJECT_ADDRESS = process.env
  .NEXT_PUBLIC_METADATA_OBJECT_ADDRESS as string;

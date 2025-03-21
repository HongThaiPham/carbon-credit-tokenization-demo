import { NavbarItemType } from "@/types/Navbar.type";

export const NAVBAR_ITEMS: NavbarItemType[] = [
  {
    label: "Admin",
    link: "/admin",
  },
  {
    label: "Minter",
    link: "/minter",
  },
  {
    label: "Consumer",
    link: "/consumer",
  },
];

export enum NFTRole {
  MINTER = "MINTER",
  CONSUMER = "CONSUMER",
}

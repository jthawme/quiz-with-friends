import React from "react";
import {
  Plus,
  PlusCircle,
  HelpCircle,
  Shield,
  Check,
  X,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  Settings,
  Menu,
  Minus,
  MoreHorizontal,
  Info,
  User,
  Image,
  Smile,
  Edit,
  Share2,
  Loader,
} from "react-feather";
import { ReactComponent as Help } from "./extra/help.svg";

export const icons = {
  plus: Plus,
  "plus-circle": PlusCircle,
  help: Help,
  "help-circle": HelpCircle,
  shield: Shield,
  check: Check,
  x: X,
  trash: Trash2,
  "thumbs-up": ThumbsUp,
  "thumbs-down": ThumbsDown,
  settings: Settings,
  menu: Menu,
  minus: Minus,
  more: MoreHorizontal,
  info: Info,
  user: User,
  image: Image,
  smile: Smile,
  edit: Edit,
  share: Share2,
  loader: Loader,
};

export type IconList = keyof typeof icons;

interface IconProps {
  name: IconList;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 24 }: IconProps) => {
  const El = icons[name];

  return <El size={size} />;
};

export { Icon };

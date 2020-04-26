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
} from "react-feather";

export const icons = {
  plus: Plus,
  "plus-circle": PlusCircle,
  help: HelpCircle,
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
};

export type IconList = keyof typeof icons;

interface IconProps {
  name: IconList;
}

const Icon: React.FC<IconProps> = ({ name }: IconProps) => {
  const El = icons[name];

  return <El />;
};

export { Icon };

import { icons, IconList } from "../components/Common/Icon";
import { select } from "@storybook/addon-knobs";

const options: { [key: string]: IconList } = Object.keys(icons).reduce(
  (prev, curr) => {
    return {
      ...prev,
      [curr]: curr,
    };
  },
  {},
);

const defaultValue: IconList = "check";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const iconSelect = (label: string, groupId?: string) =>
  select(label, options, defaultValue, groupId);

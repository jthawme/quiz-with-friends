import randomString from "randomstring";

export const getEntityId = (): string => randomString.generate();

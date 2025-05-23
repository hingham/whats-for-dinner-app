const getRecipeTypeFromId = (id: string): string => {
  const parts = id.split('#');
  if (parts.length > 1) {
    return parts[0];
  }
  return id;
};

const getUuidFromId = (id: string): string => {
  const parts = id.split('#');
  if (parts.length > 1) {
    return parts[1];
  }
  return id;
};
// eslint-disable-next-line import/prefer-default-export
export { getRecipeTypeFromId, getUuidFromId };

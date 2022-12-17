export const pageAcsess = {
  protected: ["users"], // '/users'
  public: [""], // "/"
};

export const checkAccess = (path: string) => {
  const pathSegments = path.split("/").slice(1)[0];

  if (pageAcsess.protected.includes(pathSegments)) {
    return "protected";
  }
  return "public";
};

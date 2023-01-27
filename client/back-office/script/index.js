const isUserLogged = async () => {
  try {
    var ret = await fetch("http://localhost:5000/api/admin/getId", {
      method: "POST",
      credentials: "include",
    });
    ret = await ret.json();
    return ret;
  } catch {
    return undefined;
  }
};

const isUserAdmin = async () => {
  var ret = await isUserLogged();
  return ret.admin;
};

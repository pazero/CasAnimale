const isUserLogged = async () => {
  try {
    var ret = await fetch("http://site212247.tw.cs.unibo.it/api/admin/getId", {
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

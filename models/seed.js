(async () => {
  //await require("./countryMaster").countryMaster.sync({ alter: true });
  //await require("./makeMaster").makeMaster.sync({ alter: true });
  //await require("./yearMaster").yearMaster.sync({ alter: true });
  //await require("./sideMaster").sideMaster.sync({ alter: true });
  await require("./user_role").user_role.drop();
  await require("./USERS").USERS.sync({ force: true });
  //await require("./sideMaster").sideMaster.sync({ alter: true });
  //await require("./groupMaster").groupMaster.sync({ alter: true });
  //await require("./itemMaster").itemMaster.sync({ alter: true });
  //await require("./short_codes").shortcodes.sync({ alter: true });
  //await require("./user_sessions").user_sessions.sync({ alter: true });
})();

(async () => {
  await require("./short_codes").shortcodes.findOrCreate({
    where: {
      module: "USER_ROLE",
      submodule: "MOBILE_USER",
      key: 1
    }, defaults: {
      value: "Mobile user"
    }
  }).then((res) => { console.log(res[1]) });
})();
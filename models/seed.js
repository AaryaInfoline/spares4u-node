(async () => {
  //await require("./countryMaster").countryMaster.sync({ alter: true });
  // await require("./makeMaster").makeMaster.sync({ alter: true });
  //await require("./yearMaster").yearMaster.sync({ alter: true });
  //await require("./sideMaster").sideMaster.sync({ alter: true });
  await require("./USERS").USERS.sync({ alter: true });
})();

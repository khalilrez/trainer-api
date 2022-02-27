module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profiles", {
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    dob: {
      type: Sequelize.DATEONLY,
    },
    height: {
      type: Sequelize.DOUBLE,
    },
    weight: {
      type: Sequelize.DOUBLE,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    special_conditions: {
      type: Sequelize.STRING,
    },
  });

  Profile.createProfile = async function (user) {
    let profile = await this.create({
      userId: user.id,
    });
    return profile.id;
  };

  return Profile;
};

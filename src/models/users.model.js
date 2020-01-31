// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema(
    {
      email: { type: String, unique: true, lowercase: true },
      password: { type: String },
      name: { type: String, required: true },
      profilePicture: { type: String },
      auth0Id: { type: String },
      googleId: { type: String },
      facebookId: { type: String },
      twitterId: { type: String },
      permissions: { type: [String], default: ['user'] },
      emailVerified: { type: Boolean, default: false },
      isApprovedByAdmin: { type: Boolean, default: false },
      adminApprovalData: { adminName: String, date: Date }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('users', users);
};

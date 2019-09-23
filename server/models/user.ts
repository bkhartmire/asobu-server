const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  phone_number: String,
  pin: Number,
  password_hash: String,
  profile_photo: String,
  interests: [String],
  exp: Number,
  lvl: Number,
  stats: {
    funny: Number,
    intellectual: Number,
    fun: Number,
    kind: Number,
    therapeutic: Number,
    interesting: Number
  },
  chats: [
    {
      chat_id: String,
      participants: [
        { first_name: String, email: String, profile_photo: String }
      ]
    }
  ],
  events: [{ event_id: String, is_creator: Boolean }],
  sent_hangout_requests: [
    {
      first_name: String,
      email: String,
      profile_photo: String,
      equipped_badges: [String]
    }
  ],
  received_hangout_requests: [
    {
      first_name: String,
      email: String,
      profile_photo: String,
      equipped_badges: [String]
    }
  ],
  accepted_hangouts: [
    {
      first_name: String,
      email: String,
      profile_photo: String,
      equipped_badges: [String]
    }
  ],
  ongoing_hangouts: [
    {
      hangout_id: String,
      participants: [
        {
          first_name: String,
          email: String,
          profile_photo: String,
          equipped_badges: [String]
        }
      ]
    }
  ],
  pending_reviews: [
    { first_name: String, email: String, profile_photo: String }
  ],
  blocked_users: [String],
  blocked_by_users: [String],
  equipped_badges: [String],
  longitude: Number,
  latitude: Number,
  is_active: Boolean,
  token: String
})

//separating list of users who a user has blocked and who a user has been blocked by will easily allow future functionality to unblock a user.
const User = mongoose.model('User', UserSchema)
export = User

import mongoose from 'mongoose';



const PasswordSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true, 
  },
  username:{
    type: String
  },
  password: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to User model
    required: true,
  },
});

const Password = mongoose.model('Password', PasswordSchema);
export default Password;
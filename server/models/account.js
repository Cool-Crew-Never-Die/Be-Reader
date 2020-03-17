import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const Account = new Schema({
  username: String,
  password: String,
  created: { type: Date, default: Date.now }
});

// generates hash
Account.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, 8);
};

// compares the password
Account.methods.validateHash = function(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("account", Account);

/* .model() 의 첫 번째 인수는 collection명 이고 복수형으로 설정.
account의 복수형은 accounts이므로 accounts collection이 만들어지고 저장.
collection명 직접 설정하려면 아래처럼 첫 번째 인수와 똑같이 세 번째 인수를 추가하여 전달해주면 됨.
.model(‘my_account’, Account, ‘my_account’)  */

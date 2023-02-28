const AbstractManager = require('./abstractManager');

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  
}

module.exports = UserManager;
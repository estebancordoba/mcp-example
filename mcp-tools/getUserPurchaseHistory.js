const pool = require('../db/pool');

module.exports = {
  name: 'getUserPurchaseHistory',
  description: 'Returns the purchase history of a user by ID',
  parameters: {
    type: 'object',
    properties: {
      userId: { type: 'string' }
    },
    required: ['userId']
  },
  run: async ({ userId }) => {
    const result = await pool.query(
      'SELECT item, date FROM purchases WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    return { purchases: result.rows };
  }
};

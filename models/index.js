const User = require('./User');
const Wishlist = require('./Wishlist');
const { Session } = require('express-session');


User.hasMany(Wishlist, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Wishlist.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});



module.exports = { User, Wishlist };
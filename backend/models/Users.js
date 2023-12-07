module.exports = (sequalize, DataTypes) => {
    const Users = sequalize.define("Users", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
       
    }, {
        tableName: 'users',
    }, {
        timestamp: true,
    })
    // Define the accessor method
    Users.prototype.getProductImageURL = function (protocol, hostname) {
        return this.profile_image ? `${protocol}://${hostname}/public/${this.profile_image}` : `${protocol}://${hostname}/public/dummy.jpg`;
    };
    return Users;
}
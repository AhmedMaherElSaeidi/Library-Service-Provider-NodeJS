// Gender Model (function)

module.exports = (db, type) => {
    return db.define("gender", {
        gender_id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gender: {
            type: type.STRING,
            allowNull: false,
        },
    });
};
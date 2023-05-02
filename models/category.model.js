// Category Model (function)

module.exports = (db, type) => {
    return db.define("category", {
        category_id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category: {
            type: type.STRING,
            allowNull: false,
        },
    });
};

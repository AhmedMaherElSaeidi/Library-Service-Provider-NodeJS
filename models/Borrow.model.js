// Borrow Model (function)

module.exports = (db, type) => {
    return db.define("borrow", {
        borrow_id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        return_date: {
            type: type.STRING,
            allowNull: true
        },
        status: {
            type: type.ENUM('accepted', 'waiting'),
            defaultValue: 'waiting',
            allowNull: false,
        },
    });
};

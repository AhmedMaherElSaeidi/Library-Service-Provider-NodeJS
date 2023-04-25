// Book Model (function)

module.exports = (db, type) => {
    return db.define("book", {
        book_id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ISBN: {
            type: type.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isNumeric: true,
            }
        },
        title: {
            type: type.STRING,
            allowNull: false,
        },
        author: {
            type: type.STRING,
            allowNull: false,
        },
        category: {
            type: type.STRING,
            allowNull: false,
        },
        description: {
            type: type.STRING,
            allowNull: false,
        },
        rack_number: {
            type: type.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 10,
            }
        },
        photo: {
            type: type.STRING,
            allowNull: false,
        },
    });
};

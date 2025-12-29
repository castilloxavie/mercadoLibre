import { DataTypes } from "sequelize";

import sequelizeDB from "../databases/databases.js";

const Categoria = sequelizeDB.define(
    "Categoria",
    {
        name: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.STRING, allowNull: false},
        slug: {type: DataTypes.STRING, allowNull: false, unique: true},
        url: {type: DataTypes.STRING, allowNull: false, unique: true},
        level: {type: DataTypes.INTEGER, allowNull: false},
        parent_id: {type: DataTypes.INTEGER, allowNull: false},
        source: {type: DataTypes.STRING, allowNull: false}
    }
)

Categoria.belongsTo(Categoria, {foreignKey: "parent_id"});

export default Categoria;





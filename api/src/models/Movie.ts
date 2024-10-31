import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Movie extends Model {
  public id!: number;
  public title!: string;
  public release_date!: Date;
  public overview!: string;
  public syncPage!: number;
  public popularity!: number;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
    },
    popularity: {
      type: DataTypes.FLOAT,
    },
    syncPage: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Movie",
  }
);

export default Movie;

import sequelize from "./config/database";
import app from "./app";

const PORT = process.env.PORT || 3000;

// Your routes and other middleware go here

app.listen(PORT, async () => {
  await sequelize.authenticate(); // Ensure the database connection is established
  console.log(`Server is running on port ${PORT}`);
});

import mongoose, { Schema } from "mongoose";

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

export const ROLES = ["user", "admin", "moderator"];

export default Role
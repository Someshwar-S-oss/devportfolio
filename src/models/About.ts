import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    skills: [
      {
        category: String,
        items: [String],
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        duration: String,
      },
    ],
    contact: {
      email: String,
      github: String,
      linkedin: String,
      twitter: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);

const mongoose = require('mongoose');

// Department ids: the tabs on the Team page, in order (teamDepartments in frontend/src/data/site.ts),
// plus 'advisors' for the Advisors section above them
const DEPARTMENTS = ['leads', 'software', 'hardware', 'business', 'finance', 'branding', 'advisors'];

const url = [/^https?:\/\//, '{PATH} must start with http:// or https://'];

// One document per person per department per academic year, the same shape as TeamMember in the frontend.
// Department heads get one document in 'leads' and one in their own department.
const teamMemberSchema = new mongoose.Schema(
  {
    year: { type: String, required: true, trim: true, match: [/^AY\d{2}\/\d{2}$/, 'year must look like AY26/27'] },
    department: { type: String, required: true, enum: DEPARTMENTS },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    photo: { type: String, trim: true }, // Cloudinary link, set by uploading a file; empty = the default avatar
    photoPublicId: { type: String }, // Cloudinary's id for the photo, used to delete it when replaced or the member is removed
    github: { type: String, trim: true, match: url }, // empty = no GitHub icon on the card
    linkedin: { type: String, trim: true, match: url }, // empty = no LinkedIn icon on the card
    website: { type: String, trim: true, match: url }, // personal website, optional
  },
  { timestamps: true },
);

// The Team page shows one card per name, so a name appears at most once per department per year
teamMemberSchema.index({ year: 1, department: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);

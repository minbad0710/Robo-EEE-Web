const TeamMember = require('../models/teamMember.model');
const { uploadToCloudinary, deleteFromCloudinary } = require('../helper/upload.helper');
const sortForDisplay = require('../utils/memberOrder.util');

const PHOTO_FOLDER = 'robo-eee/team';

// `photo` and `photoPublicId` only ever come from an uploaded file, so the request body can't point them anywhere else
const withoutPhotoFields = ({ photo, photoPublicId, ...data }) => data;

// Someone in two departments has a document in each, sharing one photo, so a photo is only deleted
// from Cloudinary once no document uses it any more
const deletePhotoIfUnused = async (publicId) => {
  if (publicId && !(await TeamMember.exists({ photoPublicId: publicId }))) await deleteFromCloudinary(publicId);
};

// Uploads the new photo (if any), saves the member, then deletes whichever Cloudinary image is no longer used
const saveWithPhoto = async (member, file) => {
  const oldPublicId = member.photoPublicId;
  let uploaded;
  if (file) {
    await member.validate(); // check the other fields first, so a bad request doesn't upload anything
    uploaded = await uploadToCloudinary(file.buffer, PHOTO_FOLDER);
    member.photo = uploaded.secure_url;
    member.photoPublicId = uploaded.public_id;
  }
  try {
    await member.save();
  } catch (error) {
    // e.g. a duplicate member: don't leave the new photo behind on Cloudinary
    if (uploaded) await deleteFromCloudinary(uploaded.public_id);
    throw error;
  }
  if (uploaded) await deletePhotoIfUnused(oldPublicId);
  return member;
};

// Department ids in Team page tab order, from the model's enum
const DEPARTMENT_ORDER = TeamMember.schema.path('department').enumValues;

// Optional filters from the query string, e.g. ?year=AY26/27&department=software
const list = async ({ year, department } = {}) => {
  const filter = {};
  if (typeof year === 'string') filter.year = year;
  // In the order members were added (_id breaks ties between members added in the same batch, e.g. by the seed
  // script), then put in display order (see memberOrder.util.js). The department filter is applied after sorting,
  // because the Leads tab's order depends on the other departments.
  const members = sortForDisplay(await TeamMember.find(filter).sort({ createdAt: 1, _id: 1 }), DEPARTMENT_ORDER);
  return typeof department === 'string' ? members.filter((member) => member.department === department) : members;
};

const getById = (id) => TeamMember.findById(id);

const create = (data, file) => saveWithPhoto(new TeamMember(withoutPhotoFields(data)), file);

const update = async (id, data, file) => {
  const member = await TeamMember.findById(id);
  if (!member) return null;
  member.set(withoutPhotoFields(data));
  return saveWithPhoto(member, file);
};

// Back to the default avatar
const removePhoto = async (id) => {
  const member = await TeamMember.findById(id);
  if (!member) return null;
  const oldPublicId = member.photoPublicId;
  member.photo = undefined;
  member.photoPublicId = undefined;
  await member.save();
  await deletePhotoIfUnused(oldPublicId);
  return member;
};

const remove = async (id) => {
  const member = await TeamMember.findByIdAndDelete(id);
  if (member) await deletePhotoIfUnused(member.photoPublicId);
  return member;
};

module.exports = { list, getById, create, update, removePhoto, remove, deletePhotoIfUnused };

// Loads the roster in teamMembers.data.js into MongoDB and uploads each person's photo to Cloudinary.
//   yarn seed           adds the roster; stops if that year already has members
//   yarn seed --reset   first deletes that year's members (and their photos), then adds the roster again
// --reset also wipes any changes made to that year through the API since the last seed.

const fs = require('fs');
const path = require('path');
require('dotenv').config({ quiet: true, path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const connectDB = require('../config/database.config');
const TeamMember = require('../models/teamMember.model');
const { deletePhotoIfUnused } = require('../services/teamMember.service');
const { uploadToCloudinary, deleteFromCloudinary } = require('../helper/upload.helper');
const { YEAR, people, departments } = require('./teamMembers.data');

const PHOTO_DIR = path.join(__dirname, '../../Photo');
const PHOTO_FOLDER = 'robo-eee/team';

// Catch typos before anything is written: every listed name needs an entry in `people`, every photo a file
const checkData = () => {
  const problems = [];
  for (const [department, rows] of Object.entries(departments)) {
    for (const [name] of rows) if (!people[name]) problems.push(`${department}: "${name}" is not in people`);
  }
  for (const [name, { photo }] of Object.entries(people)) {
    if (photo && !fs.existsSync(path.join(PHOTO_DIR, photo))) problems.push(`${name}: photo not found: ${photo}`);
  }
  if (problems.length > 0) throw new Error(`Fix teamMembers.data.js first:\n  ${problems.join('\n  ')}`);
};

const deleteYear = async () => {
  const existing = await TeamMember.find({ year: YEAR });
  await TeamMember.deleteMany({ year: YEAR });
  for (const publicId of new Set(existing.map((member) => member.photoPublicId))) await deletePhotoIfUnused(publicId);
  console.log(`Deleted ${existing.length} existing ${YEAR} members`);
};

// One upload per person, shared by all of their department documents
const uploadPhotos = async () => {
  const photos = {};
  for (const [name, { photo }] of Object.entries(people)) {
    if (!photo) continue;
    const uploaded = await uploadToCloudinary(fs.readFileSync(path.join(PHOTO_DIR, photo)), PHOTO_FOLDER);
    photos[name] = { photo: uploaded.secure_url, photoPublicId: uploaded.public_id };
    console.log(`  uploaded ${photo}`);
  }
  return photos;
};

const seed = async () => {
  checkData();
  await connectDB();

  const existingCount = await TeamMember.countDocuments({ year: YEAR });
  if (existingCount > 0 && !process.argv.includes('--reset')) {
    throw new Error(`${YEAR} already has ${existingCount} members. Run "yarn seed --reset" to replace them.`);
  }
  if (existingCount > 0) await deleteYear();

  console.log('Uploading photos to Cloudinary...');
  const photos = await uploadPhotos();

  const docs = Object.entries(departments).flatMap(([department, rows]) =>
    rows.map(([name, role]) => {
      const { github, linkedin, website } = people[name];
      return { year: YEAR, department, name, role, github: github && `https://github.com/${github}`, linkedin, website, ...photos[name] };
    }),
  );

  try {
    // Inserted in array order, which is the order the cards appear in
    await TeamMember.insertMany(docs);
  } catch (error) {
    for (const { photoPublicId } of Object.values(photos)) await deleteFromCloudinary(photoPublicId);
    throw error;
  }

  const withoutPhoto = Object.keys(people).filter((name) => !photos[name]);
  const usedFiles = new Set(Object.values(people).map((person) => person.photo));
  const unusedFiles = fs.readdirSync(PHOTO_DIR).filter((file) => !usedFiles.has(file));
  console.log(`Added ${docs.length} documents for ${Object.keys(people).length} people (${YEAR})`);
  console.log(`No photo (default avatar): ${withoutPhoto.length}`);
  if (unusedFiles.length > 0) console.log(`Photos in the folder that belong to nobody in the roster: ${unusedFiles.join(', ')}`);
};

seed()
  .catch((error) => {
    console.error(error.message ?? error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());

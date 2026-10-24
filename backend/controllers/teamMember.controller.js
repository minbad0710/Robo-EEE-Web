const teamMemberService = require('../services/teamMember.service');
const HttpError = require('../utils/httpError.util');

// Express 5 passes errors thrown in async handlers to the error middleware, so no try/catch is needed here

const list = async (req, res) => {
  res.json(await teamMemberService.list(req.query));
};

const getById = async (req, res) => {
  const member = await teamMemberService.getById(req.params.id);
  if (!member) throw new HttpError(404, 'Team member not found');
  res.json(member);
};

// req.file is the optional photo read by the upload middleware
const create = async (req, res) => {
  res.status(201).json(await teamMemberService.create(req.body ?? {}, req.file));
};

const update = async (req, res) => {
  const member = await teamMemberService.update(req.params.id, req.body ?? {}, req.file);
  if (!member) throw new HttpError(404, 'Team member not found');
  res.json(member);
};

const removePhoto = async (req, res) => {
  const member = await teamMemberService.removePhoto(req.params.id);
  if (!member) throw new HttpError(404, 'Team member not found');
  res.json(member);
};

const remove = async (req, res) => {
  const member = await teamMemberService.remove(req.params.id);
  if (!member) throw new HttpError(404, 'Team member not found');
  res.status(204).end();
};

module.exports = { list, getById, create, update, removePhoto, remove };

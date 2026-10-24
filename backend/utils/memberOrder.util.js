// The order members are shown in, within each department and year:
//   1. Team Lead, then Deputy Lead
//   2. then the leaders (leads and co-leads), then everyone else (members, advisors, …)
//   3. in the Leads tab, the leaders follow the order of the department tabs (Software, Hardware, Business, …)
//   4. within each of those, grouped by division, with a division's lead before its co-lead ("Hardware Lead",
//      "Hardware Co-Lead"), and members in the same division order as their leaders.
//      A division is the role without its last part: "Software Perception Co-Lead" and "Software Perception Member"
//      are both in "Software Perception". Divisions with a lead come first, then those with a co-lead, then the rest.
// Anything still tied keeps the order it was added in.
// A role can list several, comma-separated ("Team Lead, Software Lead"); the first one decides the order.

const TOP_ROLES = ['team lead', 'deputy lead'];
const LEVELS = ['lead', 'co-lead']; // anything else (member, advisor, …) comes after these
const isLeader = (row) => row.level < LEVELS.length;

// 'Software Perception Co-Lead' → { top: 2, division: 'software perception', level: 1 }
const parseRole = (roles) => {
  const role = roles.split(',')[0].trim();
  const top = TOP_ROLES.indexOf(role.toLowerCase());
  const [, division = role, title = ''] = role.match(/^(.*?)\s*\b(co-lead|lead|member)$/i) ?? [];
  const level = LEVELS.indexOf(title.toLowerCase());
  return {
    top: top === -1 ? TOP_ROLES.length : top,
    division: division.toLowerCase(),
    level: level === -1 ? LEVELS.length : level,
  };
};

// `members` must be in the order they were added, and include every department of a year, since the Leads cards
// are ordered by the other departments (see below). `departmentOrder` is the department ids in tab order.
// Returns them newest year first, each department in display order.
const sortForDisplay = (members, departmentOrder = []) => {
  // A Leads card belongs to the department where the same person has the same role (Koh Jing Yang's
  // "Hardware Co-Lead" card → hardware, even though he is also a software member). In the Leads tab, leaders
  // follow the order of the department tabs: Software, then Hardware, then Business Development, …
  const homeDepartment = new Map();
  for (const m of members) if (m.department !== 'leads') homeDepartment.set(`${m.year}|${m.name}|${m.role}`, m.department);
  const departmentRank = (member) => {
    const home = member.department === 'leads' ? homeDepartment.get(`${member.year}|${member.name}|${member.role}`) : member.department;
    const rank = departmentOrder.indexOf(home);
    return rank === -1 ? departmentOrder.length : rank;
  };

  const rows = members.map((member, index) => ({
    member,
    index,
    group: `${member.year}|${member.department}`,
    departmentRank: departmentRank(member),
    ...parseRole(member.role),
  }));

  // Per department and year: where each division first appears and the highest level in it
  const divisions = new Map();
  const groupFirst = new Map();
  for (const row of rows) {
    const id = `${row.group}|${row.division}`;
    const division = divisions.get(id);
    if (division) division.best = Math.min(division.best, row.level);
    else divisions.set(id, { first: row.index, best: row.level });
    if (!groupFirst.has(row.group)) groupFirst.set(row.group, row.index);
  }
  const divisionOf = (row) => divisions.get(`${row.group}|${row.division}`);

  return rows
    .sort(
      (a, b) =>
        b.member.year.localeCompare(a.member.year) ||
        groupFirst.get(a.group) - groupFirst.get(b.group) ||
        a.top - b.top ||
        Number(isLeader(b)) - Number(isLeader(a)) ||
        a.departmentRank - b.departmentRank ||
        divisionOf(a).best - divisionOf(b).best ||
        divisionOf(a).first - divisionOf(b).first ||
        a.level - b.level ||
        a.index - b.index,
    )
    .map((row) => row.member);
};

module.exports = sortForDisplay;

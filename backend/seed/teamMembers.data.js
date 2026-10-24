// AY26/27 roster, from "Members Information.pdf"

const YEAR = 'AY26/27';

// Everyone once, with their links. `github` is a GitHub username; `photo` is a file in the Photo folder next to
// backend/ (no photo = the default avatar). LinkedIn links missing https:// in the PDF have it added here.
const people = {
  'Ong Dun Yan': { github: 'dunyanong', linkedin: 'https://www.linkedin.com/in/dunyan', photo: 'OngDunYan.png' },
  'Hu Ming Jie': { github: 'humjie', linkedin: 'https://www.linkedin.com/in/humingjie', photo: 'Hu Ming Jie.jpeg' },
  'Aqid Rafiuddin Bin Zainuddin': { github: 'Aqid2108' },
  'Koh Jing Yang': { github: 'KOHJINGYANG', linkedin: 'https://www.linkedin.com/in/koh-jing-yang-96888834a' },
  'Ting-Ju Chen': { github: 'cynthia-ccluna' },
  'Nguyen Hong Son': { github: 'HongSon28', linkedin: 'https://www.linkedin.com/in/son-nguyenhong', photo: 'Nguyen Hong Son.jpg' },
  // The PDF's LinkedIn link for Tan Jin Hern is the LinkedIn home feed (/feed/foryou/), not a profile, so it's left out
  'Tan Jin Hern': { github: 'jinhern424', photo: 'Tan Jin Hern.jpg' },
  'Jeana Wong Wen Xiu': { linkedin: 'https://www.linkedin.com/in/jeanawong/', photo: 'Jeana Wong.png' },
  'Jahnvi Santhosh Kumar': { linkedin: 'https://www.linkedin.com/in/jahnvi-santhosh-kumar', photo: 'Jahnvi Santhosh Kumar.jpeg' },
  'Tan Wei Zhi Ignatius': { github: 'ignatiustan1313', linkedin: 'https://www.linkedin.com/in/ignatius-tan-6796a637b/' },
  'Bridget Wu Min Qi': { github: 'brriguette' },
  'Nguyen Thanh Duy': { github: 'minbad0710', linkedin: 'https://www.linkedin.com/in/duy-nguyen-thanh-248359388/', photo: 'Nguyen Thanh Duy.jpg' },
  'Pham Hoang Quan': { github: 'davidphamthecat', linkedin: 'https://www.linkedin.com/in/davidphamvn' },
  'Lin Xin Ying (Sherry)': { github: 'linxinying-sherry' },
  'Muhammad Hasnaat Islam': { github: 'HasnaatIslam' },
  'Singh Nevan': { github: 'DevFalkon' },
  'Aaron Ong Wei Ren': {},
  'Sean Loh Juin En': { github: 'seanloh0114', linkedin: 'https://www.linkedin.com/in/sean-loh-juin-en-7885743a1/', photo: 'Sean Loh Juin En.jpeg' },
  'Mak Wei Sheng': { github: 'Notlord69', linkedin: 'https://www.linkedin.com/in/ws-mak-b74a8a320', photo: 'Mak Wei Sheng.jpeg' },
  'Ricky Darmawan': {},
  'Ambrose Chan Wye Yang': { github: 'Ambrose3112', linkedin: 'https://www.linkedin.com/in/ambrose-chan-999834326/', photo: 'Ambrose Chan Wye Yang.jpeg' },
  'Tan Wei Hang': { github: 'Alan061023' },
  'Khiem Nguyen': { github: 'KhiemGOM', linkedin: 'https://www.linkedin.com/in/khiemgom/' },
  'Rasyidan Naja Asardi': { github: 'syidanasardi' },
  'Zhou Zihan': { github: 'zzhwww0303' },
  'Yu Cheng Yee': { github: 'ChengYeeYu' },
  'Wang Yuyuan': { github: 'imwwhywhy' },
  'Yinuo Qu': { github: 'quyinuo40-glitch' },
  'Tang Pei Wen': { github: 'peiwen10', linkedin: 'https://www.linkedin.com/in/tangpeiwen' },
  'Wei Yinghua': { github: '2407158068-pixel' },
  'Wong Jing En': { github: 'JingEn1016', linkedin: 'https://www.linkedin.com/in/wong-jing-en-73079b379', photo: 'Wong JIng En.jpeg' },
  'Pham Quang Minh': { github: 'barriertrustee' },
  'Asst. Prof. Yoonchang Sung': {
    linkedin: 'https://www.linkedin.com/in/yoonchangsung',
    website: 'https://yoonchangsung.com/',
    photo: 'Asst Prof Yoonchang Sung.jpeg',
  },
  'Asst. Prof. Ziwei Wang': {
    linkedin: 'https://www.linkedin.com/in/ziwei-wang-752a43325',
    website: 'https://ziweiwangthu.github.io/',
    photo: 'Asst Prof Ziwei Wang.jpeg',
  },
  'Frentzen Ziheng Seow': {
    linkedin: 'https://www.linkedin.com/in/frentzen-seow-ziheng-856886210',
    website: 'https://frentzenseow.com/',
    photo: 'Frentzen Seow Ziheng.jpeg',
  },
  'Dhanoosh Pooranakumaran': { linkedin: 'https://www.linkedin.com/in/dhanoosh-pooranakumaran', photo: 'Dhanoosh Pooranakumaran.jpeg' },
};

// [name, role] per department. The API shows each department's leaders (leads and co-leads) first, then members,
// grouped by division (utils/memberOrder.util.js); otherwise the cards keep the order given here.
// Leads = the team lead, deputy and every lead and co-lead, who also appear in their own department.
const departments = {
  leads: [
    ['Ong Dun Yan', 'Team Lead, Software Lead'],
    ['Hu Ming Jie', 'Deputy Lead'],
    ['Aqid Rafiuddin Bin Zainuddin', 'Hardware Lead'],
    ['Koh Jing Yang', 'Hardware Co-Lead'],
    ['Jeana Wong Wen Xiu', 'Business Development Lead'],
    ['Ting-Ju Chen', 'Software Perception Co-Lead'],
    ['Nguyen Hong Son', 'Software SLAM & Navigation Co-Lead'],
    ['Tan Jin Hern', 'Software Manipulation Co-Lead'],
  ],
  software: [
    ['Ong Dun Yan', 'Software Lead'],
    ['Ting-Ju Chen', 'Software Perception Co-Lead'],
    ['Nguyen Hong Son', 'Software SLAM & Navigation Co-Lead'],
    ['Tan Jin Hern', 'Software Manipulation Co-Lead'],
    ['Khiem Nguyen', 'Software Perception Member'],
    ['Rasyidan Naja Asardi', 'Software Perception Member'],
    ['Zhou Zihan', 'Software Perception Member'],
    ['Koh Jing Yang', 'Software SLAM & Navigation Member'],
    ['Yu Cheng Yee', 'Software SLAM & Navigation Member'],
    ['Wang Yuyuan', 'Software SLAM & Navigation Member'],
    ['Yinuo Qu', 'Software Manipulation Member'],
    ['Tang Pei Wen', 'Software Manipulation Member'],
    ['Wei Yinghua', 'Software Manipulation Member'],
    ['Wong Jing En', 'Software Manipulation Member'],
    ['Pham Quang Minh', 'Software Manipulation Member'],
  ],
  hardware: [
    ['Aqid Rafiuddin Bin Zainuddin', 'Hardware Lead'],
    ['Koh Jing Yang', 'Hardware Co-Lead'],
    ['Pham Hoang Quan', 'Hardware Electrical Member'],
    ['Lin Xin Ying (Sherry)', 'Hardware Electrical Member'],
    ['Muhammad Hasnaat Islam', 'Hardware Electrical Member'],
    ['Singh Nevan', 'Hardware Electrical Member'],
    ['Aaron Ong Wei Ren', 'Hardware Electrical Member'],
    ['Sean Loh Juin En', 'Hardware Mechanical Member'],
    ['Mak Wei Sheng', 'Hardware Mechanical Member'],
    ['Ricky Darmawan', 'Hardware Mechanical Member'],
    ['Ambrose Chan Wye Yang', 'Hardware Mechanical Member'],
    ['Tan Wei Hang', 'Hardware Mechanical Member'],
  ],
  business: [
    ['Jeana Wong Wen Xiu', 'Business Development Lead'],
    ['Tan Wei Zhi Ignatius', 'Business Development Member'],
    ['Bridget Wu Min Qi', 'Business Development Member'],
  ],
  finance: [['Jahnvi Santhosh Kumar', 'Financial Controller Member']],
  branding: [['Nguyen Thanh Duy', 'Branding, Marketing & Web Development Member']],
  advisors: [
    ['Asst. Prof. Yoonchang Sung', 'Faculty Advisor'],
    ['Asst. Prof. Ziwei Wang', 'Faculty Advisor'],
    ['Frentzen Ziheng Seow', 'Student Advisor'],
    ['Dhanoosh Pooranakumaran', 'Student Advisor'],
  ],
};

module.exports = { YEAR, people, departments };

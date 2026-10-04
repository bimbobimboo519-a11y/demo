/* Achievers University – Client-side data & auth (no server needed) */
const DB_KEY = 'achievers_uni_db_v2';
const SESSION_KEY = 'achievers_uni_session';

const DEFAULT_DB = {
  users: [
    { id:1, email:'taiwo.boluwatife@student.achievers.edu.ng', password:'password123', role:'student', first_name:'Taiwo', last_name:'Bolu watife', phone:'08012345678', is_first_login:false },
    { id:2, email:'demo.student@student.achievers.edu.ng', password:null, role:'student', first_name:'Adebayo', last_name:'Okoro', phone:'08098765432', is_first_login:true },
    { id:3, email:'staff@achievers.edu.ng', password:'password123', role:'staff', first_name:'Dr. Funke', last_name:'Adebayo', phone:'08055556666', is_first_login:false }
  ],
  students: [
    { id:1, user_id:1, matric:'AU/ENG/2025/001', level:'100L', programme:'Electrical And Electronics Engineering', department:'Electrical And Electronics Engineering', faculty:'Faculty of Engineering and Technology', entry_session:'2025/2026', academic_status:'Open', cgpa:0, enrollment_status:'Incomplete', blood_group:null, genotype:null, projected_graduation:'Est. 5 years' },
    { id:2, user_id:2, matric:'AU/CSC/2025/045', level:'100L', programme:'Computer Science', department:'Computer Science', faculty:'Faculty of Natural and Applied Sciences', entry_session:'2025/2026', academic_status:'Open', cgpa:0, enrollment_status:'Incomplete', blood_group:'O+', genotype:'AA', projected_graduation:'Est. 4 years' }
  ],
  staff: [
    { id:1, user_id:3, staff_id:'AU/STF/2019/012', designation:'Senior Lecturer', department:'Computer Science', faculty:'Faculty of Natural and Applied Sciences', employment_date:'2019-09-01' }
  ],
  courses: [
    { id:1, code:'MTH101', title:'Elementary Mathematics I', units:3, semester:'First', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:2, code:'PHY101', title:'General Physics I', units:3, semester:'First', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:3, code:'CHM101', title:'General Chemistry I', units:3, semester:'First', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:4, code:'GST101', title:'Use of English I', units:2, semester:'First', level:'100L', department:'General Studies' },
    { id:5, code:'GST103', title:'Nigerian Peoples and Culture', units:2, semester:'First', level:'100L', department:'General Studies' },
    { id:6, code:'CSC101', title:'Introduction to Computer Science', units:3, semester:'First', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:7, code:'EEE101', title:'Introduction to Electrical Engineering', units:2, semester:'First', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:8, code:'MTH102', title:'Elementary Mathematics II', units:3, semester:'Second', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:9, code:'PHY102', title:'General Physics II', units:3, semester:'Second', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:10, code:'CHM102', title:'General Chemistry II', units:3, semester:'Second', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:11, code:'GST102', title:'Use of English II', units:2, semester:'Second', level:'100L', department:'General Studies' },
    { id:12, code:'CSC102', title:'Introduction to Programming', units:3, semester:'Second', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:13, code:'EEE102', title:'Electrical Circuits', units:2, semester:'Second', level:'100L', department:'Electrical And Electronics Engineering' },
    { id:14, code:'CSC103', title:'Discrete Mathematics', units:3, semester:'First', level:'100L', department:'Computer Science' },
    { id:15, code:'CSC104', title:'Computer Hardware', units:2, semester:'Second', level:'100L', department:'Computer Science' }
  ],
  registrations: [],
  payments: [
    { id:1, student_id:1, type:'Acceptance Fee', amount:50000, status:'Paid', reference:'AU-ACC-2025-001', paid_at:'2025-09-15' },
    { id:2, student_id:1, type:'School Fees', amount:450000, status:'Pending', reference:'AU-SF-2025-001', paid_at:null }
  ],
  email_requests: [],
  news: [
    { id:1, title:'19th Matriculation Ceremony', slug:'matriculation', excerpt:'Achievers University hosts its 19th Matriculation on 30 January 2026.', content:'Achievers University, Owo, proudly hosts its 19th Matriculation Ceremony on 30 January 2026 at the University Auditorium.', category:'Events', date:'2026-01-15' },
    { id:2, title:'Warning Against Admission Fraudsters', slug:'fraud-warning', excerpt:'Verify all admission information before making payments.', content:'Management warns parents and applicants against fraudsters. Only use official portals: apply.achievers.edu.ng and www.achievers.edu.ng.', category:'Announcement', date:'2026-09-02' },
    { id:3, title:'Post UTME Screening for MBBS', slug:'mbbs-screening', excerpt:'Screening holds Friday 18th September 2026.', content:'Candidates for Medicine and Surgery are invited for Post-UTME screening on Friday 18th September 2026 at the University Campus, Owo.', category:'Admissions', date:'2026-09-03' },
    { id:4, title:'Full NUC Accreditation for Seven Programmes', slug:'nuc-accreditation', excerpt:'Seven programmes receive full NUC accreditation.', content:'Medical Laboratory Science, Civil Engineering, Computer Engineering, Mechanical Engineering, Microbiology, Criminology and Sociology now have full NUC accreditation for five years.', category:'Academics', date:'2026-04-29' },
    { id:5, title:'Admissions Open 2026/2027', slug:'admissions-open', excerpt:'Undergraduate and postgraduate applications now open.', content:'JAMB cut-off is 150 for most programmes (higher for Medicine). Apply at apply.achievers.edu.ng.', category:'Admissions', date:'2026-05-10' }
  ]
};

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(DEFAULT_DB));
    return JSON.parse(JSON.stringify(DEFAULT_DB));
  }
  return JSON.parse(raw);
}
function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
function setSession(user) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, role: user.role, first_name: user.first_name, last_name: user.last_name }));
}
function clearSession() { sessionStorage.removeItem(SESSION_KEY); }

function login(email, password) {
  const db = getDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) return { error: 'Invalid email or password' };
  if (user.is_first_login || !user.password) {
    return { firstLogin: true, email: user.email };
  }
  if (user.password !== password) return { error: 'Invalid email or password' };
  setSession(user);
  return { success: true, user };
}

function setPassword(email, password) {
  const db = getDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) return { error: 'User not found' };
  if (password.length < 6) return { error: 'Password must be at least 6 characters' };
  user.password = password;
  user.is_first_login = false;
  saveDB(db);
  setSession(user);
  return { success: true, user };
}

function requireAuth(role) {
  const s = getSession();
  if (!s) { location.href = '../login.html'; return null; }
  if (role && s.role !== role && !(role === 'staff' && s.role === 'admin')) {
    location.href = '../login.html'; return null;
  }
  return s;
}

function getStudentProfile() {
  const s = getSession();
  if (!s) return null;
  const db = getDB();
  const student = db.students.find(st => st.user_id === s.id);
  const user = db.users.find(u => u.id === s.id);
  return { user, student, db };
}

function getStaffProfile() {
  const s = getSession();
  if (!s) return null;
  const db = getDB();
  const staff = db.staff.find(st => st.user_id === s.id);
  const user = db.users.find(u => u.id === s.id);
  return { user, staff, db };
}

/* Public nav toggle */
function initPublicNav() {
  const btn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }
}
document.addEventListener('DOMContentLoaded', initPublicNav);

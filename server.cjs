var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  aiPredictionsStore: () => aiPredictionsStore
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_vite = require("vite");

// src/ai/service/student_score_service.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_child_process = require("child_process");
var StudentScoreService = class {
  constructor() {
    this.metadataPath = import_path.default.resolve(process.cwd(), "ml/models/model_metadata.json");
  }
  getModelInfo() {
    if (!import_fs.default.existsSync(this.metadataPath)) {
      throw new Error(`Model metadata file not found at ${this.metadataPath}`);
    }
    const raw = import_fs.default.readFileSync(this.metadataPath, "utf-8");
    const meta = JSON.parse(raw);
    return {
      ...meta,
      status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng"
    };
  }
  validateInput(input) {
    if (!input || typeof input !== "object") {
      throw new Error("D\u1EEF li\u1EC7u \u0111\u1EA7u v\xE0o ph\u1EA3i l\xE0 m\u1ED9t \u0111\u1ED1i t\u01B0\u1EE3ng JSON h\u1EE3p l\u1EC7.");
    }
    const requiredKeys = [
      "studytime",
      "failures",
      "absences",
      "G1",
      "school",
      "sex",
      "age",
      "internet",
      "higher",
      "goout",
      "health"
    ];
    for (const key of requiredKeys) {
      if (input[key] === void 0 || input[key] === null) {
        throw new Error(`Thi\u1EBFu thu\u1ED9c t\xEDnh b\u1EAFt bu\u1ED9c '${key}' trong d\u1EEF li\u1EC7u \u0111\u1EA7u v\xE0o.`);
      }
    }
    const studytime = Number(input.studytime);
    const failures = Number(input.failures);
    const absences = Number(input.absences);
    const G1 = Number(input.G1);
    const school = String(input.school).trim();
    const sex = String(input.sex).trim();
    const age = Number(input.age);
    const internet = String(input.internet).trim();
    const higher = String(input.higher).trim();
    const goout = Number(input.goout);
    const health = Number(input.health);
    if (isNaN(studytime) || studytime < 1 || studytime > 4) {
      throw new Error("M\u1EE9c th\u1EDDi gian t\u1EF1 h\u1ECDc 'studytime' ph\u1EA3i l\xE0 s\u1ED1 nguy\xEAn t\u1EEB 1 \u0111\u1EBFn 4.");
    }
    if (isNaN(failures) || failures < 0 || failures > 4) {
      throw new Error("S\u1ED1 l\u1EA7n kh\xF4ng \u0111\u1EA1t 'failures' ph\u1EA3i l\xE0 s\u1ED1 t\u1EEB 0 \u0111\u1EBFn 4.");
    }
    if (isNaN(absences) || absences < 0 || absences > 100) {
      throw new Error("S\u1ED1 bu\u1ED5i v\u1EAFng 'absences' ph\u1EA3i l\xE0 s\u1ED1 t\u1EEB 0 \u0111\u1EBFn 100.");
    }
    if (isNaN(G1) || G1 < 0 || G1 > 20) {
      throw new Error("\u0110i\u1EC3m G1 'G1' ph\u1EA3i l\xE0 s\u1ED1 trong thang \u0111i\u1EC3m t\u1EEB 0 \u0111\u1EBFn 20.");
    }
    if (school !== "GP" && school !== "MS") {
      throw new Error("M\xE3 tr\u01B0\u1EDDng h\u1ECDc 'school' ch\u1EC9 nh\u1EADn gi\xE1 tr\u1ECB 'GP' ho\u1EB7c 'MS'.");
    }
    if (sex !== "F" && sex !== "M") {
      throw new Error("Gi\u1EDBi t\xEDnh 'sex' ch\u1EC9 nh\u1EADn gi\xE1 tr\u1ECB 'F' ho\u1EB7c 'M'.");
    }
    if (isNaN(age) || age < 10 || age > 30) {
      throw new Error("Tu\u1ED5i h\u1ECDc sinh 'age' ph\u1EA3i l\xE0 s\u1ED1 t\u1EEB 10 \u0111\u1EBFn 30.");
    }
    if (internet !== "yes" && internet !== "no") {
      throw new Error("Ch\u1EC9 s\u1ED1 'internet' ch\u1EC9 nh\u1EADn gi\xE1 tr\u1ECB 'yes' ho\u1EB7c 'no'.");
    }
    if (higher !== "yes" && higher !== "no") {
      throw new Error("Ch\u1EC9 s\u1ED1 'higher' ch\u1EC9 nh\u1EADn gi\xE1 tr\u1ECB 'yes' ho\u1EB7c 'no'.");
    }
    if (isNaN(goout) || goout < 1 || goout > 5) {
      throw new Error("M\u1EE9c \u0111\u1ED9 \u0111i ch\u01A1i 'goout' ph\u1EA3i l\xE0 s\u1ED1 t\u1EEB 1 \u0111\u1EBFn 5.");
    }
    if (isNaN(health) || health < 1 || health > 5) {
      throw new Error("Ch\u1EC9 s\u1ED1 s\u1EE9c kh\u1ECFe 'health' ph\u1EA3i l\xE0 s\u1ED1 t\u1EEB 1 \u0111\u1EBFn 5.");
    }
    return {
      studytime,
      failures,
      absences,
      G1,
      school,
      sex,
      age,
      internet,
      higher,
      goout,
      health
    };
  }
  predict(input) {
    const validatedInput = this.validateInput(input);
    const scriptPath = import_path.default.resolve(process.cwd(), "ml/src/predict.py");
    const jsonArg = JSON.stringify(validatedInput);
    try {
      const pythonCommand = process.platform === "win32" ? "py" : "python3";
      const pythonArgs = process.platform === "win32" ? ["-3", scriptPath, jsonArg] : [scriptPath, jsonArg];
      const stdout = (0, import_child_process.execFileSync)(pythonCommand, pythonArgs, {
        encoding: "utf-8",
        timeout: 1e4
      });
      const parsed = JSON.parse(stdout.trim());
      if (parsed.success) {
        return {
          predictedScore: parsed.predictedScore,
          modelVersion: parsed.modelVersion || "1.0.0",
          modelName: parsed.modelName || "Random Forest Regressor",
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          inputSummary: validatedInput
        };
      }
    } catch (error) {
      console.warn("[StudentScoreService] Python execution warning, using linear heuristic fallback:", error.message);
      const g1 = validatedInput.G1;
      const study = validatedInput.studytime;
      const fail = validatedInput.failures;
      const abs = validatedInput.absences;
      const score = Math.max(0, Math.min(20, Number((g1 * 0.8 + study * 0.5 - fail * 1.2 - abs * 0.1).toFixed(2))));
      return {
        predictedScore: score,
        modelVersion: "1.0.0",
        modelName: "Random Forest Regressor (Fallback)",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        inputSummary: validatedInput
      };
    }
  }
};
var studentScoreService = new StudentScoreService();

// src/lib/seedData.ts
var import_firestore2 = require("firebase/firestore");

// src/lib/firebase.ts
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
var import_firestore = require("firebase/firestore");

// firebase-applet-config.json
var firebase_applet_config_default = {
  projectId: "argon-port-4zp2g",
  appId: "1:450020438503:web:67ed738c817c5d53c88d42",
  apiKey: "AIzaSyCSR1h40yOFlleFoH5K7964CoMaAdJXgi0",
  authDomain: "argon-port-4zp2g.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-smarteducationce-a439c0a7-c61e-4e8a-a7f4-62fb0acc2353",
  storageBucket: "argon-port-4zp2g.firebasestorage.app",
  messagingSenderId: "450020438503",
  measurementId: "",
  oAuthClientId: "450020438503-q9grlpkfl00qi0r1up3qeho0deo78f11.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

// src/lib/firebase.ts
var firebaseConfig = {
  apiKey: firebase_applet_config_default.apiKey,
  authDomain: firebase_applet_config_default.authDomain,
  projectId: firebase_applet_config_default.projectId,
  storageBucket: firebase_applet_config_default.storageBucket,
  messagingSenderId: firebase_applet_config_default.messagingSenderId,
  appId: firebase_applet_config_default.appId
};
var app = (0, import_app.initializeApp)(firebaseConfig);
var auth = (0, import_auth.getAuth)(app);
var googleProvider = new import_auth.GoogleAuthProvider();
var db = firebase_applet_config_default.firestoreDatabaseId ? (0, import_firestore.getFirestore)(app, firebase_applet_config_default.firestoreDatabaseId) : (0, import_firestore.getFirestore)(app);

// src/lib/seedData.ts
var SUBJECTS = [
  { id: "toan", name: "To\xE1n h\u1ECDc", code: "TOAN" },
  { id: "van", name: "Ng\u1EEF v\u0103n", code: "NGU_VAN" },
  { id: "anh", name: "Ti\u1EBFng Anh", code: "TIENG_ANH" },
  { id: "ly", name: "V\u1EADt l\xFD", code: "VAT_LY" },
  { id: "hoa", name: "H\xF3a h\u1ECDc", code: "HOA_HOC" }
];
var TEACHERS = [
  // Toán học
  { id: "teacher_toan_1", teacherId: "TCH-2026-001", employeeCode: "TCH-2026-001", name: "Tr\u1EA7n Qu\u1ED1c Vi\u1EC7t", fullName: "Tr\u1EA7n Qu\u1ED1c Vi\u1EC7t", email: "gv.viettoan@smartedu.vn", phone: "0913000101", subjectId: "toan", subjectCode: "TOAN", subjectName: "To\xE1n h\u1ECDc", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  { id: "teacher_toan_2", teacherId: "TCH-2026-002", employeeCode: "TCH-2026-002", name: "Nguy\u1EC5n Ch\xED Thanh", fullName: "Nguy\u1EC5n Ch\xED Thanh", email: "gv.thanhtoan@smartedu.vn", phone: "0913000102", subjectId: "toan", subjectCode: "TOAN", subjectName: "To\xE1n h\u1ECDc", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  { id: "teacher_toan_3", teacherId: "TCH-2026-003", employeeCode: "TCH-2026-003", name: "V\u0169 \u0110\xECnh Long", fullName: "V\u0169 \u0110\xECnh Long", email: "gv.longtoan@smartedu.vn", phone: "0913000103", subjectId: "toan", subjectCode: "TOAN", subjectName: "To\xE1n h\u1ECDc", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  // Ngữ văn
  { id: "teacher_van_1", teacherId: "TCH-2026-004", employeeCode: "TCH-2026-004", name: "Nguy\u1EC5n Thu H\xE0", fullName: "Nguy\u1EC5n Thu H\xE0", email: "gv.havan@smartedu.vn", phone: "0913000104", subjectId: "van", subjectCode: "NGU_VAN", subjectName: "Ng\u1EEF v\u0103n", department: "T\u1ED5 X\xE3 H\u1ED9i", status: "ACTIVE" },
  { id: "teacher_van_2", teacherId: "TCH-2026-005", employeeCode: "TCH-2026-005", name: "Ph\u1EA1m Ng\u1ECDc Lan", fullName: "Ph\u1EA1m Ng\u1ECDc Lan", email: "gv.lanvan@smartedu.vn", phone: "0913000105", subjectId: "van", subjectCode: "NGU_VAN", subjectName: "Ng\u1EEF v\u0103n", department: "T\u1ED5 X\xE3 H\u1ED9i", status: "ACTIVE" },
  { id: "teacher_van_3", teacherId: "TCH-2026-006", employeeCode: "TCH-2026-006", name: "L\xEA Kh\xE1nh Huy\u1EC1n", fullName: "L\xEA Kh\xE1nh Huy\u1EC1n", email: "gv.huyenvan@smartedu.vn", phone: "0913000106", subjectId: "van", subjectCode: "NGU_VAN", subjectName: "Ng\u1EEF v\u0103n", department: "T\u1ED5 X\xE3 H\u1ED9i", status: "ACTIVE" },
  // Tiếng Anh
  { id: "teacher_anh_1", teacherId: "TCH-2026-007", employeeCode: "TCH-2026-007", name: "L\xEA Ho\xE0ng Anh", fullName: "L\xEA Ho\xE0ng Anh", email: "gv.anhenglish@smartedu.vn", phone: "0913000107", subjectId: "anh", subjectCode: "TIENG_ANH", subjectName: "Ti\u1EBFng Anh", department: "T\u1ED5 Ngo\u1EA1i Ng\u1EEF", status: "ACTIVE" },
  { id: "teacher_anh_2", teacherId: "TCH-2026-008", employeeCode: "TCH-2026-008", name: "\u0110\u1ED7 Qu\u1EF3nh Chi", fullName: "\u0110\u1ED7 Qu\u1EF3nh Chi", email: "gv.chienglish@smartedu.vn", phone: "0913000108", subjectId: "anh", subjectCode: "TIENG_ANH", subjectName: "Ti\u1EBFng Anh", department: "T\u1ED5 Ngo\u1EA1i Ng\u1EEF", status: "ACTIVE" },
  { id: "teacher_anh_3", teacherId: "TCH-2026-009", employeeCode: "TCH-2026-009", name: "Tr\u1ECBnh Minh Tr\xED", fullName: "Tr\u1ECBnh Minh Tr\xED", email: "gv.trienglish@smartedu.vn", phone: "0913000109", subjectId: "anh", subjectCode: "TIENG_ANH", subjectName: "Ti\u1EBFng Anh", department: "T\u1ED5 Ngo\u1EA1i Ng\u1EEF", status: "ACTIVE" },
  // Vật lý
  { id: "teacher_ly_1", teacherId: "TCH-2026-010", employeeCode: "TCH-2026-010", name: "Ph\u1EA1m Minh \u0110\u1EE9c", fullName: "Ph\u1EA1m Minh \u0110\u1EE9c", email: "gv.ducly@smartedu.vn", phone: "0913000110", subjectId: "ly", subjectCode: "VAT_LY", subjectName: "V\u1EADt l\xFD", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  { id: "teacher_ly_2", teacherId: "TCH-2026-011", employeeCode: "TCH-2026-011", name: "Ho\xE0ng Th\u1EBF Anh", fullName: "Ho\xE0ng Th\u1EBF Anh", email: "gv.anhly@smartedu.vn", phone: "0913000111", subjectId: "ly", subjectCode: "VAT_LY", subjectName: "V\u1EADt l\xFD", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  { id: "teacher_ly_3", teacherId: "TCH-2026-012", employeeCode: "TCH-2026-012", name: "V\u0169 Vi\u1EC7t Ho\xE0ng", fullName: "V\u0169 Vi\u1EC7t Ho\xE0ng", email: "gv.hoangly@smartedu.vn", phone: "0913000112", subjectId: "ly", subjectCode: "VAT_LY", subjectName: "V\u1EADt l\xFD", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  // Hóa học
  { id: "teacher_hoa_1", teacherId: "TCH-2026-013", employeeCode: "TCH-2026-013", name: "Ng\xF4 Qu\u1ED1c B\u1EA3o", fullName: "Ng\xF4 Qu\u1ED1c B\u1EA3o", email: "gv.baohoa@smartedu.vn", phone: "0913000113", subjectId: "hoa", subjectCode: "HOA_HOC", subjectName: "H\xF3a h\u1ECDc", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  { id: "teacher_hoa_2", teacherId: "TCH-2026-014", employeeCode: "TCH-2026-014", name: "Nguy\u1EC5n Mai Anh", fullName: "Nguy\u1EC5n Mai Anh", email: "gv.maianhhoa@smartedu.vn", phone: "0913000114", subjectId: "hoa", subjectCode: "HOA_HOC", subjectName: "H\xF3a h\u1ECDc", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" },
  { id: "teacher_hoa_3", teacherId: "TCH-2026-015", employeeCode: "TCH-2026-015", name: "D\u01B0\u01A1ng \u0110\u1EE9c Duy", fullName: "D\u01B0\u01A1ng \u0110\u1EE9c Duy", email: "gv.duyhoa@smartedu.vn", phone: "0913000115", subjectId: "hoa", subjectCode: "HOA_HOC", subjectName: "H\xF3a h\u1ECDc", department: "T\u1ED5 T\u1EF1 Nhi\xEAn", status: "ACTIVE" }
];
var CLASSES = [
  { id: "class_6A1", classId: "class_6A1", classCode: "6A1", className: "L\u1EDBp 6A1", name: "L\u1EDBp 6A1", grade: 6, room: "Ph\xF2ng 101", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 2 - Th\u1EE9 4 - Th\u1EE9 6 \xB7 08:00" },
  { id: "class_6A2", classId: "class_6A2", classCode: "6A2", className: "L\u1EDBp 6A2", name: "L\u1EDBp 6A2", grade: 6, room: "Ph\xF2ng 102", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 3 - Th\u1EE9 5 - Th\u1EE9 7 \xB7 08:00" },
  { id: "class_6A3", classId: "class_6A3", classCode: "6A3", className: "L\u1EDBp 6A3", name: "L\u1EDBp 6A3", grade: 6, room: "Ph\xF2ng 103", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 2 - Th\u1EE9 4 - Th\u1EE9 6 \xB7 14:00" },
  { id: "class_7A1", classId: "class_7A1", classCode: "7A1", className: "L\u1EDBp 7A1", name: "L\u1EDBp 7A1", grade: 7, room: "Ph\xF2ng 201", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 3 - Th\u1EE9 5 - Th\u1EE9 7 \xB7 14:00" },
  { id: "class_7A2", classId: "class_7A2", classCode: "7A2", className: "L\u1EDBp 7A2", name: "L\u1EDBp 7A2", grade: 7, room: "Ph\xF2ng 202", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 2 - Th\u1EE9 4 - Th\u1EE9 6 \xB7 10:00" },
  { id: "class_7A3", classId: "class_7A3", classCode: "7A3", className: "L\u1EDBp 7A3", name: "L\u1EDBp 7A3", grade: 7, room: "Ph\xF2ng 203", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 3 - Th\u1EE9 5 - Th\u1EE9 7 \xB7 10:00" },
  { id: "class_8A1", classId: "class_8A1", classCode: "8A1", className: "L\u1EDBp 8A1", name: "L\u1EDBp 8A1", grade: 8, room: "Ph\xF2ng 301", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 2 - Th\u1EE9 4 - Th\u1EE9 6 \xB7 15:30" },
  { id: "class_8A2", classId: "class_8A2", classCode: "8A2", className: "L\u1EDBp 8A2", name: "L\u1EDBp 8A2", grade: 8, room: "Ph\xF2ng 302", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 3 - Th\u1EE9 5 - Th\u1EE9 7 \xB7 15:30" },
  { id: "class_8A3", classId: "class_8A3", classCode: "8A3", className: "L\u1EDBp 8A3", name: "L\u1EDBp 8A3", grade: 8, room: "Ph\xF2ng 303", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 2 - Th\u1EE9 4 - Th\u1EE9 6 \xB7 19:30" },
  { id: "class_9A1", classId: "class_9A1", classCode: "9A1", className: "L\u1EDBp 9A1", name: "L\u1EDBp 9A1", grade: 9, room: "Ph\xF2ng 401", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 3 - Th\u1EE9 5 - Th\u1EE9 7 \xB7 19:30" },
  { id: "class_9A2", classId: "class_9A2", classCode: "9A2", className: "L\u1EDBp 9A2", name: "L\u1EDBp 9A2", grade: 9, room: "Ph\xF2ng 402", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 2 - Th\u1EE9 4 - Th\u1EE9 6 \xB7 17:30" },
  { id: "class_9A3", classId: "class_9A3", classCode: "9A3", className: "L\u1EDBp 9A3", name: "L\u1EDBp 9A3", grade: 9, room: "Ph\xF2ng 403", capacity: 18, academicYear: "2026-2027", schedule: "Th\u1EE9 3 - Th\u1EE9 5 - Th\u1EE9 7 \xB7 17:30" }
];
var ROOMS = [
  { id: "room_101", roomId: "room_101", roomCode: "101", roomName: "Ph\xF2ng 101", capacity: 25, status: "ACTIVE", building: "T\xF2a A", floor: 1, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 6" },
  { id: "room_102", roomId: "room_102", roomCode: "102", roomName: "Ph\xF2ng 102", capacity: 25, status: "ACTIVE", building: "T\xF2a A", floor: 1, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 6" },
  { id: "room_103", roomId: "room_103", roomCode: "103", roomName: "Ph\xF2ng 103", capacity: 25, status: "ACTIVE", building: "T\xF2a A", floor: 1, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 6" },
  { id: "room_201", roomId: "room_201", roomCode: "201", roomName: "Ph\xF2ng 201", capacity: 25, status: "ACTIVE", building: "T\xF2a A", floor: 2, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 7" },
  { id: "room_202", roomId: "room_202", roomCode: "202", roomName: "Ph\xF2ng 202", capacity: 25, status: "ACTIVE", building: "T\xF2a A", floor: 2, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 7" },
  { id: "room_203", roomId: "room_203", roomCode: "203", roomName: "Ph\xF2ng 203", capacity: 25, status: "ACTIVE", building: "T\xF2a A", floor: 2, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 7" },
  { id: "room_301", roomId: "room_301", roomCode: "301", roomName: "Ph\xF2ng 301", capacity: 25, status: "ACTIVE", building: "T\xF2a B", floor: 3, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 8" },
  { id: "room_302", roomId: "room_302", roomCode: "302", roomName: "Ph\xF2ng 302", capacity: 25, status: "ACTIVE", building: "T\xF2a B", floor: 3, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 8" },
  { id: "room_303", roomId: "room_303", roomCode: "303", roomName: "Ph\xF2ng 303", capacity: 25, status: "ACTIVE", building: "T\xF2a B", floor: 3, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 8" },
  { id: "room_401", roomId: "room_401", roomCode: "401", roomName: "Ph\xF2ng 401", capacity: 25, status: "ACTIVE", building: "T\xF2a B", floor: 4, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 9" },
  { id: "room_402", roomId: "room_402", roomCode: "402", roomName: "Ph\xF2ng 402", capacity: 25, status: "ACTIVE", building: "T\xF2a B", floor: 4, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 9" },
  { id: "room_403", roomId: "room_403", roomCode: "403", roomName: "Ph\xF2ng 403", capacity: 25, status: "ACTIVE", building: "T\xF2a B", floor: 4, description: "Ph\xF2ng h\u1ECDc ti\xEAu chu\u1EA9n Kh\u1ED1i 9" },
  { id: "room_lab1", roomId: "room_lab1", roomCode: "LAB1", roomName: "Ph\xF2ng Th\xED Nghi\u1EC7m Khoa H\u1ECDc", capacity: 30, status: "ACTIVE", building: "T\xF2a B", floor: 1, description: "Ph\xF2ng th\u1EF1c h\xE0nh L\xFD - H\xF3a" },
  { id: "room_501", roomId: "room_501", roomCode: "501", roomName: "Ph\xF2ng 501 (B\u1EA3o tr\xEC)", capacity: 20, status: "MAINTENANCE", building: "T\xF2a B", floor: 5, description: "\u0110ang b\u1EA3o d\u01B0\u1EE1ng" }
];
var firstNames = ["Nguy\u1EC5n", "Tr\u1EA7n", "L\xEA", "Ph\u1EA1m", "Ho\xE0ng", "Hu\u1EF3nh", "Phan", "V\u0169", "V\xF5", "\u0110\u1EB7ng", "B\xF9i", "\u0110\u1ED7", "H\u1ED3", "Ng\xF4", "D\u01B0\u01A1ng", "L\xFD"];
var middleNames = ["V\u0103n", "Th\u1ECB", "Minh", "Thanh", "H\u1EEFu", "\u0110\u1EE9c", "Ho\xE0ng", "Kh\xE1nh", "Ng\u1ECDc", "Thu", "Th\xF9y", "H\u1EA3i", "Xu\xE2n", "Kim", "Qu\u1ED1c"];
var lastNames = ["Anh", "B\xECnh", "Ch\u01B0\u01A1ng", "D\u0169ng", "Em", "Giang", "H\u1EA3i", "H\xF9ng", "H\xF2a", "H\xE0", "Kh\xE1nh", "Linh", "Long", "Lan", "Mai", "Nam", "Nh\xE2n", "Ph\xFAc", "Ph\u01B0\u01A1ng", "Qu\xE2n", "S\u01A1n", "T\xFA", "Th\u1EA3o", "Trang", "Vinh", "Y\u1EBFn"];
var parentJobs = ["K\u1EF9 s\u01B0", "Gi\xE1o vi\xEAn", "Kinh doanh t\u1EF1 do", "B\xE1c s\u0129", "Nh\xE2n vi\xEAn v\u0103n ph\xF2ng", "K\u1EBF to\xE1n", "Bu\xF4n b\xE1n", "D\u01B0\u1EE3c s\u0129"];
function generateSeedData() {
  const students = [];
  const parents = [];
  const users = [];
  users.push({
    id: "user_owner",
    email: "admin@smartedu.vn",
    displayName: "Nguy\u1EC5n Th\u1EBF D\u0169ng (Ch\u1EE7 trung t\xE2m)",
    role: "OWNER",
    phone: "0901112222",
    status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng",
    department: "Ban \u0110i\u1EC1u H\xE0nh"
  });
  users.push({
    id: "user_giaovu",
    email: "giaovu@smartedu.vn",
    displayName: "Tr\u1EA7n Th\u1ECB Mai (Gi\xE1o v\u1EE5)",
    role: "ACADEMIC_STAFF",
    phone: "0903334444",
    status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng",
    department: "Ph\xF2ng H\u1ECDc V\u1EE5"
  });
  users.push({
    id: "user_accountant",
    email: "ketoan@smartedu.vn",
    displayName: "L\xEA Ho\xE0ng Phong (K\u1EBF to\xE1n)",
    role: "ACCOUNTANT",
    phone: "0905556666",
    status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng",
    department: "Ph\xF2ng T\xE0i Ch\xEDnh"
  });
  TEACHERS.forEach((teacher, idx) => {
    users.push({
      id: `user_${teacher.id}`,
      email: teacher.email,
      displayName: teacher.name,
      role: "TEACHER",
      phone: `0913000${(100 + idx).toString().slice(-3)}`,
      status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng",
      department: teacher.department
    });
  });
  let studentCounter = 1;
  const grades = [6, 7, 8, 9];
  grades.forEach((grade) => {
    const gradeClasses = CLASSES.filter((c) => c.grade === grade);
    for (let i = 1; i <= 54; i++) {
      const studentId = `STU-2026-${studentCounter.toString().padStart(3, "0")}`;
      const parentId = `PAR-2026-${studentCounter.toString().padStart(3, "0")}`;
      const sFirst = firstNames[studentCounter % firstNames.length];
      const sMid = middleNames[(studentCounter + 3) % middleNames.length];
      const sLast = lastNames[(studentCounter + 7) % lastNames.length];
      const studentName = `${sFirst} ${sMid} ${sLast}`;
      const pFirst = sFirst;
      const pMid = middleNames[(studentCounter + 8) % middleNames.length];
      const pLast = lastNames[(studentCounter + 12) % lastNames.length];
      const parentName = `${pFirst} ${pMid} ${pLast}`;
      const parentEmail = `ph.${studentCounter}@smartedu.vn`;
      const studentEmail = `hs.${studentCounter}@smartedu.vn`;
      const assignedClass = gradeClasses[(i - 1) % gradeClasses.length];
      const seedValue = studentCounter * 17 % 100;
      let attendanceRate = 85 + seedValue % 16;
      let homeworkCompletion = 80 + seedValue % 21;
      let gpa = parseFloat((6 + seedValue % 40 / 10).toFixed(1));
      if (studentCounter === 6) {
        attendanceRate = 72;
        homeworkCompletion = 52;
        gpa = 4.8;
      } else if (studentCounter === 14) {
        attendanceRate = 65;
        homeworkCompletion = 45;
        gpa = 3.9;
      } else if (studentCounter === 23) {
        attendanceRate = 79;
        homeworkCompletion = 68;
        gpa = 5.5;
      }
      users.push({
        id: `user_${parentId}`,
        email: parentEmail,
        displayName: parentName,
        role: "PARENT",
        phone: `0937000${studentCounter.toString().padStart(3, "0")}`,
        status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng",
        department: "Ph\u1EE5 huynh"
      });
      users.push({
        id: `user_${studentId}`,
        email: studentEmail,
        displayName: studentName,
        role: "STUDENT",
        phone: `0985000${studentCounter.toString().padStart(3, "0")}`,
        status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng",
        department: "H\u1ECDc sinh"
      });
      const baseFee = 45e5;
      let discount = 0;
      if (seedValue % 10 === 0) discount = 5e5;
      else if (seedValue % 15 === 0) discount = 1e6;
      const finalAmount = baseFee - discount;
      let paidAmount = finalAmount;
      let status = "PAID";
      if (studentCounter % 7 === 1) {
        paidAmount = 0;
        status = "UNPAID";
      } else if (studentCounter % 7 === 3) {
        paidAmount = 2e6;
        status = "PARTIAL";
      } else if (studentCounter % 11 === 0) {
        paidAmount = 0;
        status = "OVERDUE";
      }
      const tuitionOwed = finalAmount - paidAmount;
      parents.push({
        id: parentId,
        parentId,
        name: parentName,
        fullName: parentName,
        relationship: studentCounter % 2 === 0 ? "Cha" : "M\u1EB9",
        email: parentEmail,
        phone: `0937000${studentCounter.toString().padStart(3, "0")}`,
        address: "H\xE0 N\u1ED9i",
        job: parentJobs[studentCounter % parentJobs.length],
        studentIds: [studentId],
        childIds: [studentId],
        status: "ACTIVE",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      students.push({
        id: studentId,
        studentId,
        name: studentName,
        fullName: studentName,
        dateOfBirth: `2012-05-${(studentCounter % 28 + 1).toString().padStart(2, "0")}`,
        gender: studentCounter % 2 === 0 ? "Nam" : "N\u1EEF",
        classId: assignedClass.id,
        className: `${assignedClass.grade}${assignedClass.name.slice(-2)}`,
        course: `Kh\u1ED1i ${grade} To\xE0n di\u1EC7n`,
        grade,
        status: "ACTIVE",
        email: studentEmail,
        phone: `0985000${studentCounter.toString().padStart(3, "0")}`,
        parentId,
        parentIds: [parentId],
        parentName,
        gpa,
        attendanceRate,
        homeworkCompletion,
        riskScore: Math.round(100 - (gpa * 6 + attendanceRate * 0.2 + homeworkCompletion * 0.2)),
        riskLevel: gpa < 5 || attendanceRate < 70 ? "High" : gpa < 6.5 ? "Medium" : "Low",
        tuitionPaid: paidAmount,
        tuitionOwed,
        financials: {
          baseFee,
          discount,
          finalAmount,
          paidAmount,
          tuitionOwed,
          status
        },
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      studentCounter++;
    }
  });
  return { users, students, parents, CLASSES, TEACHERS, SUBJECTS };
}
async function seedDatabase() {
  console.log("[SEED] Starting seed process...");
  const { users, students, parents, CLASSES: classesList, TEACHERS: teachersList, SUBJECTS: subjectsList } = generateSeedData();
  const batch1 = (0, import_firestore2.writeBatch)(db);
  subjectsList.forEach((sub) => {
    const docRef = (0, import_firestore2.doc)(db, "subjects", sub.id);
    batch1.set(docRef, sub);
  });
  await batch1.commit();
  console.log("[SEED] Subjects seeded.");
  const batch2 = (0, import_firestore2.writeBatch)(db);
  teachersList.forEach((teacher) => {
    const docRef = (0, import_firestore2.doc)(db, "teachers", teacher.id);
    batch2.set(docRef, teacher);
  });
  await batch2.commit();
  console.log("[SEED] Teachers seeded.");
  const batch3 = (0, import_firestore2.writeBatch)(db);
  classesList.forEach((cls) => {
    const docRef = (0, import_firestore2.doc)(db, "classes", cls.id);
    batch3.set(docRef, {
      ...cls,
      status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng",
      // Store list of main teachers for different subjects
      teachers: {
        toan: "teacher_toan_" + ((parseInt(cls.id.slice(-1)) || 1) % 3 + 1),
        van: "teacher_van_" + ((parseInt(cls.id.slice(-1)) || 2) % 3 + 1),
        anh: "teacher_anh_" + ((parseInt(cls.id.slice(-1)) || 3) % 3 + 1),
        ly: "teacher_ly_" + ((parseInt(cls.id.slice(-1)) || 1) % 3 + 1),
        hoa: "teacher_hoa_" + ((parseInt(cls.id.slice(-1)) || 2) % 3 + 1)
      }
    });
  });
  ROOMS.forEach((room) => {
    const docRef = (0, import_firestore2.doc)(db, "rooms", room.id);
    batch3.set(docRef, {
      ...room,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  await batch3.commit();
  console.log("[SEED] Classes & Rooms seeded.");
  const batch4 = (0, import_firestore2.writeBatch)(db);
  users.forEach((user) => {
    const docRef = (0, import_firestore2.doc)(db, "users", user.id);
    batch4.set(docRef, {
      ...user,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  await batch4.commit();
  console.log("[SEED] Users seeded.");
  const batch5 = (0, import_firestore2.writeBatch)(db);
  parents.forEach((parent) => {
    const docRef = (0, import_firestore2.doc)(db, "parents", parent.id);
    batch5.set(docRef, parent);
  });
  await batch5.commit();
  console.log("[SEED] Parents seeded.");
  const batch6 = (0, import_firestore2.writeBatch)(db);
  students.forEach((stu, idx) => {
    const studentDocRef = (0, import_firestore2.doc)(db, "students", stu.id);
    batch6.set(studentDocRef, stu);
    const enrollmentRef = (0, import_firestore2.doc)(db, "classEnrollments", `enroll_${stu.id}`);
    batch6.set(enrollmentRef, {
      id: `enroll_${stu.id}`,
      studentId: stu.id,
      classId: stu.classId,
      academicYear: "2026-2027",
      startDate: (/* @__PURE__ */ new Date()).toISOString(),
      status: "\u0110ang h\u1ECDc"
    });
    const invoiceId = `INV-2026-${(idx + 1).toString().padStart(3, "0")}`;
    const invoiceRef = (0, import_firestore2.doc)(db, "invoices", invoiceId);
    const invoiceAmount = stu.financials.baseFee;
    const finalAmount = stu.financials.finalAmount;
    const paidAmount = stu.financials.paidAmount;
    batch6.set(invoiceRef, {
      id: invoiceId,
      studentId: stu.id,
      studentName: stu.name,
      className: stu.className,
      dateIssued: new Date(Date.now() - 36e5 * 24 * 10).toISOString().split("T")[0],
      // 10 days ago
      dueDate: new Date(Date.now() + 36e5 * 24 * 20).toISOString().split("T")[0],
      // 20 days later
      amount: invoiceAmount,
      discount: stu.financials.discount,
      finalAmount,
      paidAmount,
      status: stu.financials.status === "PAID" ? "Paid" : stu.financials.status === "PARTIAL" ? "Partially Paid" : stu.financials.status === "OVERDUE" ? "Overdue" : "Issued"
    });
    if (paidAmount > 0) {
      const paymentId = `PAY-2026-${(idx + 1).toString().padStart(3, "0")}`;
      const paymentRef = (0, import_firestore2.doc)(db, "payments", paymentId);
      batch6.set(paymentRef, {
        id: paymentId,
        invoiceId,
        studentName: stu.name,
        amount: paidAmount,
        method: idx % 2 === 0 ? "Chuy\u1EC3n kho\u1EA3n" : "Ti\u1EC1n m\u1EB7t",
        date: new Date(Date.now() - 36e5 * 24 * 5).toISOString().split("T")[0],
        // 5 days ago
        processor: "L\xEA Ho\xE0ng Phong",
        status: "Th\xE0nh c\xF4ng"
      });
    }
  });
  await batch6.commit();
  console.log("[SEED] Students, Enrollments, Invoices & Payments seeded.");
  const batch7 = (0, import_firestore2.writeBatch)(db);
  classesList.forEach((cls) => {
    SUBJECTS.forEach((sub) => {
      const teacherNum = ((parseInt(cls.id.slice(-1)) || 1) + SUBJECTS.indexOf(sub)) % 3 + 1;
      const teacherId = `teacher_${sub.id}_${teacherNum}`;
      const assignmentId = `assign_${cls.id}_${sub.id}`;
      const assignmentRef = (0, import_firestore2.doc)(db, "teacherAssignments", assignmentId);
      batch7.set(assignmentRef, {
        id: assignmentId,
        teacherId,
        subjectId: sub.id,
        classId: cls.id,
        academicYear: "2026-2027",
        status: "\u0110ang d\u1EA1y"
      });
    });
  });
  await batch7.commit();
  console.log("[SEED] Teacher Assignments seeded.");
  const batch8 = (0, import_firestore2.writeBatch)(db);
  const weekdays = ["Th\u1EE9 2", "Th\u1EE9 3", "Th\u1EE9 4", "Th\u1EE9 5", "Th\u1EE9 6", "Th\u1EE9 7"];
  let scheduleCount = 1;
  classesList.forEach((cls, classIdx) => {
    SUBJECTS.forEach((sub, subIdx) => {
      const teacherNum = ((parseInt(cls.id.slice(-1)) || 1) + subIdx) % 3 + 1;
      const teacherId = `teacher_${sub.id}_${teacherNum}`;
      const scheduleId = `SCH-${scheduleCount.toString().padStart(3, "0")}`;
      const dayOfWeek = weekdays[(classIdx + subIdx) % weekdays.length];
      const startHour = 8 + scheduleCount % 4 * 2.5;
      const startTime = `${startHour.toString().padStart(2, "0")}:00`;
      const endTime = `${(startHour + 2).toString().padStart(2, "0")}:00`;
      const scheduleRef = (0, import_firestore2.doc)(db, "schedules", scheduleId);
      batch8.set(scheduleRef, {
        id: scheduleId,
        classId: cls.id,
        subjectId: sub.id,
        teacherId,
        dayOfWeek,
        startTime,
        endTime,
        room: cls.room,
        status: "\u0110ang ho\u1EA1t \u0111\u1ED9ng"
      });
      scheduleCount++;
    });
  });
  await batch8.commit();
  console.log("[SEED] Schedules seeded.");
  const batch9 = (0, import_firestore2.writeBatch)(db);
  students.slice(0, 15).forEach((stu) => {
    SUBJECTS.forEach((sub) => {
      const scoreId = `score_${stu.id}_${sub.id}`;
      const scoreRef = (0, import_firestore2.doc)(db, "scores", scoreId);
      const baseVal = (parseInt(stu.id.slice(-3)) + SUBJECTS.indexOf(sub) * 3) % 5;
      const scoreRegular = 7 + baseVal * 0.6;
      const scoreMid = 6.5 + baseVal * 0.7;
      const scoreFinal = stu.gpa;
      const average = parseFloat(((scoreRegular + scoreMid * 2 + scoreFinal * 3) / 6).toFixed(1));
      const grade = average >= 9 ? "A" : average >= 8 ? "B" : average >= 6.5 ? "C" : average >= 5 ? "D" : "F";
      batch9.set(scoreRef, {
        id: scoreId,
        studentId: stu.id,
        studentName: stu.name,
        classId: stu.classId,
        className: stu.className,
        subjectId: sub.id,
        scoreRegular: parseFloat(scoreRegular.toFixed(1)),
        scoreMid: parseFloat(scoreMid.toFixed(1)),
        scoreFinal: parseFloat(scoreFinal.toFixed(1)),
        average,
        grade,
        status: average >= 5 ? "\u0110\xE3 \u0111\u1EA1t" : "Ch\u01B0a \u0111\u1EA1t"
      });
    });
  });
  const expenses = [
    { id: "exp_01", category: "L\u01B0\u01A1ng gi\xE1o vi\xEAn", description: "Chi l\u01B0\u01A1ng th\xE1ng 7 cho 18 gi\xE1o vi\xEAn", amount: 324e6, expenseDate: "2026-07-31", createdBy: "L\xEA Ho\xE0ng Phong", status: "\u0110\xE3 chi" },
    { id: "exp_02", category: "Ti\u1EC1n thu\xEA m\u1EB7t b\u1EB1ng", description: "Ti\u1EC1n thu\xEA m\u1EB7t b\u1EB1ng chi nh\xE1nh qu\u1EADn 1", amount: 12e7, expenseDate: "2026-08-01", createdBy: "L\xEA Ho\xE0ng Phong", status: "\u0110\xE3 chi" },
    { id: "exp_03", category: "\u0110i\u1EC7n n\u01B0\u1EDBc", description: "Thanh to\xE1n h\xF3a \u0111\u01A1n \u0111i\u1EC7n n\u01B0\u1EDBc v\xE0 internet", amount: 154e5, expenseDate: "2026-08-03", createdBy: "L\xEA Ho\xE0ng Phong", status: "\u0110\xE3 chi" },
    { id: "exp_04", category: "Thi\u1EBFt b\u1ECB", description: "Mua s\u1EAFm 3 m\xE1y chi\u1EBFu m\u1EDBi ph\xF2ng h\u1ECDc", amount: 45e6, expenseDate: "2026-08-04", createdBy: "L\xEA Ho\xE0ng Phong", status: "\u0110\xE3 chi" },
    { id: "exp_05", category: "Marketing", description: "Chi ph\xED qu\u1EA3ng c\xE1o Facebook & tuy\u1EC3n sinh", amount: 35e6, expenseDate: "2026-08-05", createdBy: "L\xEA Ho\xE0ng Phong", status: "\u0110\xE3 chi" }
  ];
  expenses.forEach((exp) => {
    const expRef = (0, import_firestore2.doc)(db, "expenses", exp.id);
    batch9.set(expRef, exp);
  });
  await batch9.commit();
  console.log("[SEED] Scores and Expenses seeded.");
  console.log("[SEED] Seeding completed successfully!");
}

// server.ts
var app2 = (0, import_express.default)();
var PORT = 3e3;
app2.use(import_express.default.json());
var aiPredictionsStore = [
  {
    id: "PRED-2026-001",
    studentId: "STU-2026-001",
    studentName: "Nguy\u1EC5n Minh Anh",
    studytime: 3,
    failures: 0,
    absences: 2,
    G1: 15,
    school: "GP",
    sex: "F",
    age: 15,
    internet: "yes",
    higher: "yes",
    goout: 2,
    health: 4,
    predictedScore: 15.2,
    actualScore: 16,
    absoluteError: 0.8,
    evaluatedAt: new Date(Date.now() - 36e5 * 12).toISOString(),
    evaluatedBy: "TEA-101",
    modelVersion: "1.0.0",
    modelName: "Random Forest Regressor",
    createdAt: new Date(Date.now() - 36e5 * 48).toISOString()
  },
  {
    id: "PRED-2026-002",
    studentId: "STU-2026-002",
    studentName: "Tr\u1EA7n Ho\xE0ng Nam",
    studytime: 1,
    failures: 2,
    absences: 12,
    G1: 8,
    school: "MS",
    sex: "M",
    age: 16,
    internet: "no",
    higher: "no",
    goout: 4,
    health: 3,
    predictedScore: 7.4,
    actualScore: 8,
    absoluteError: 0.6,
    evaluatedAt: new Date(Date.now() - 36e5 * 6).toISOString(),
    evaluatedBy: "TEA-102",
    modelVersion: "1.0.0",
    modelName: "Random Forest Regressor",
    createdAt: new Date(Date.now() - 36e5 * 24).toISOString()
  },
  {
    id: "PRED-2026-003",
    studentId: "STU-2026-003",
    studentName: "L\xEA Thu Trang",
    studytime: 4,
    failures: 0,
    absences: 1,
    G1: 17,
    school: "GP",
    sex: "F",
    age: 15,
    internet: "yes",
    higher: "yes",
    goout: 2,
    health: 5,
    predictedScore: 17.8,
    modelVersion: "1.0.0",
    modelName: "Random Forest Regressor",
    createdAt: new Date(Date.now() - 36e5 * 2).toISOString()
  }
];
var getAuthUser = (req) => {
  const roleHeader = req.headers["x-user-role"] || "ADMIN";
  const idHeader = req.headers["x-user-id"] || "USER-ADMIN";
  return { role: roleHeader.toUpperCase(), id: idHeader };
};
app2.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Smart Education Center ML Backend" });
});
app2.post("/api/seed", async (req, res) => {
  try {
    await seedDatabase();
    res.json({ success: true, message: "C\u01A1 s\u1EDF d\u1EEF li\u1EC7u THCS \u0111\xE3 \u0111\u01B0\u1EE3c seed th\xE0nh c\xF4ng v\xE0o Firebase Firestore!" });
  } catch (error) {
    console.error("[SEED ERROR]", error);
    res.status(500).json({ error: "L\u1ED7i th\u1EF1c hi\u1EC7n seeding d\u1EEF li\u1EC7u: " + error.message });
  }
});
app2.get("/api/ai/model-info", (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user.role === "ACCOUNTANT") {
      return res.status(403).json({ error: "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i: Vai tr\xF2 K\u1EBF to\xE1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp t\xEDnh n\u0103ng AI." });
    }
    const modelInfo = studentScoreService.getModelInfo();
    res.json(modelInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app2.get("/api/ai/model-registry", (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user.role === "ACCOUNTANT") {
      return res.status(403).json({ error: "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i: Vai tr\xF2 K\u1EBF to\xE1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp." });
    }
    const modelInfo = studentScoreService.getModelInfo();
    const registry = [
      {
        id: "student-score-v1.0.0",
        modelName: modelInfo.model_name,
        version: modelInfo.version,
        artifactPath: "ml/models/student_score_model.joblib",
        dataset: modelInfo.dataset,
        features: modelInfo.features,
        metrics: modelInfo.metrics,
        trainedAt: modelInfo.trained_at_utc,
        status: "\u0110ang s\u1EED d\u1EE5ng",
        rollbackSupported: true,
        rollbackTargetVersion: null
      }
    ];
    res.json(registry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app2.post("/api/ai/predict-score", (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user.role === "ACCOUNTANT") {
      return res.status(403).json({ error: "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i: Vai tr\xF2 K\u1EBF to\xE1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp t\xEDnh n\u0103ng d\u1EF1 \u0111o\xE1n AI." });
    }
    const targetStudentId = req.body.student_id || req.body.studentId || "STU-2026-001";
    if (user.role === "STUDENT" && user.id !== targetStudentId && targetStudentId !== "STU-2026-001") {
      return res.status(403).json({ error: "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i: H\u1ECDc sinh ch\u1EC9 c\xF3 th\u1EC3 xem/d\u1EF1 \u0111o\xE1n \u0111i\u1EC3m cho ch\xEDnh m\xECnh." });
    }
    let validatedInput;
    try {
      validatedInput = studentScoreService.validateInput(req.body);
    } catch (valErr) {
      return res.status(400).json({ error: valErr.message });
    }
    const prediction = studentScoreService.predict(validatedInput);
    const recordId = `PRED-2026-${(aiPredictionsStore.length + 1).toString().padStart(3, "0")}`;
    const logEntry = {
      id: recordId,
      studentId: targetStudentId,
      studentName: req.body.student_name || req.body.studentName || "H\u1ECDc vi\xEAn THCS",
      ...validatedInput,
      predictedScore: prediction.predictedScore,
      modelVersion: prediction.modelVersion,
      modelName: prediction.modelName,
      createdAt: prediction.createdAt
    };
    aiPredictionsStore.unshift(logEntry);
    res.json({
      id: recordId,
      studentId: logEntry.studentId,
      studentName: logEntry.studentName,
      predictedScore: prediction.predictedScore,
      modelVersion: prediction.modelVersion,
      modelName: prediction.modelName,
      createdAt: prediction.createdAt,
      inputSummary: prediction.inputSummary
    });
  } catch (error) {
    console.error("[API Predict Error]", error);
    res.status(500).json({ error: "\u0110\xE3 x\u1EA3y ra l\u1ED7i khi th\u1EF1c hi\u1EC7n d\u1EF1 \u0111o\xE1n t\u1EEB m\xF4 h\xECnh Machine Learning: " + error.message });
  }
});
app2.post("/api/ai/predictions/:id/evaluate", (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user.role === "STUDENT" || user.role === "PARENT" || user.role === "ACCOUNTANT") {
      return res.status(403).json({ error: "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i: B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n nh\u1EADp/\u0111\xE1nh gi\xE1 \u0111i\u1EC3m th\u1EF1c t\u1EBF." });
    }
    const { id } = req.params;
    const { actualScore } = req.body;
    if (actualScore === void 0 || actualScore === null || isNaN(Number(actualScore))) {
      return res.status(400).json({ error: "\u0110i\u1EC3m th\u1EF1c t\u1EBF (actualScore) kh\xF4ng h\u1EE3p l\u1EC7." });
    }
    const numActual = Number(actualScore);
    if (numActual < 0 || numActual > 20) {
      return res.status(400).json({ error: "\u0110i\u1EC3m th\u1EF1c t\u1EBF (actualScore) ph\u1EA3i n\u1EB1m trong thang \u0111i\u1EC3m 0 - 20." });
    }
    const recordIndex = aiPredictionsStore.findIndex((r) => r.id === id);
    if (recordIndex === -1) {
      return res.status(404).json({ error: `Kh\xF4ng t\xECm th\u1EA5y b\u1EA3n ghi d\u1EF1 \u0111o\xE1n v\u1EDBi ID ${id}.` });
    }
    const record = aiPredictionsStore[recordIndex];
    const absoluteError = Math.round(Math.abs(record.predictedScore - numActual) * 100) / 100;
    record.actualScore = numActual;
    record.absoluteError = absoluteError;
    record.evaluatedAt = (/* @__PURE__ */ new Date()).toISOString();
    record.evaluatedBy = user.id;
    res.json({
      success: true,
      message: "\u0110\xE3 c\u1EADp nh\u1EADt \u0111i\u1EC3m th\u1EF1c t\u1EBF v\xE0 t\xEDnh to\xE1n sai s\u1ED1 tuy\u1EC7t \u0111\u1ED1i.",
      prediction: record
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app2.get("/api/ai/predictions-history", (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user.role === "ACCOUNTANT") {
      return res.status(403).json({ error: "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i: Vai tr\xF2 K\u1EBF to\xE1n kh\xF4ng c\xF3 quy\u1EC1n xem l\u1ECBch s\u1EED AI." });
    }
    let results = aiPredictionsStore;
    if (user.role === "STUDENT") {
      results = aiPredictionsStore.filter((r) => r.studentId === user.id);
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app2.get("/api/ai/monitoring", (req, res) => {
  try {
    const user = getAuthUser(req);
    if (user.role === "ACCOUNTANT") {
      return res.status(403).json({ error: "Truy c\u1EADp b\u1ECB t\u1EEB ch\u1ED1i: Vai tr\xF2 K\u1EBF to\xE1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp." });
    }
    const totalPredictions = aiPredictionsStore.length;
    const evaluatedRecords = aiPredictionsStore.filter((r) => r.actualScore !== void 0 && r.absoluteError !== void 0);
    const evaluatedPredictions = evaluatedRecords.length;
    let realMAE = null;
    let medianError = null;
    let avgPredictedScore = null;
    let avgActualScore = null;
    if (totalPredictions > 0) {
      const sumPredicted = aiPredictionsStore.reduce((acc, r) => acc + r.predictedScore, 0);
      avgPredictedScore = Math.round(sumPredicted / totalPredictions * 10) / 10;
    }
    if (evaluatedPredictions > 0) {
      const sumError = evaluatedRecords.reduce((acc, r) => acc + (r.absoluteError || 0), 0);
      realMAE = Math.round(sumError / evaluatedPredictions * 100) / 100;
      const sumActual = evaluatedRecords.reduce((acc, r) => acc + (r.actualScore || 0), 0);
      avgActualScore = Math.round(sumActual / evaluatedPredictions * 10) / 10;
      const sortedErrors = evaluatedRecords.map((r) => r.absoluteError || 0).sort((a, b) => a - b);
      const mid = Math.floor(sortedErrors.length / 2);
      medianError = sortedErrors.length % 2 !== 0 ? sortedErrors[mid] : Math.round((sortedErrors[mid - 1] + sortedErrors[mid]) / 2 * 100) / 100;
    }
    const modelInfo = studentScoreService.getModelInfo();
    res.json({
      totalPredictions,
      evaluatedPredictions,
      realMAE,
      medianError,
      avgPredictedScore,
      avgActualScore,
      modelVersion: modelInfo.version,
      modelName: modelInfo.model_name,
      trainingMetrics: modelInfo.metrics,
      evaluatedRecords
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app2.use(vite.middlewares);
  } else {
    const distPath = import_path2.default.join(process.cwd(), "dist");
    app2.use(import_express.default.static(distPath));
    app2.get("*", (req, res) => {
      res.sendFile(import_path2.default.join(distPath, "index.html"));
    });
  }
  app2.listen(PORT, "0.0.0.0", () => {
    console.log(`[Smart Education Server] Running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aiPredictionsStore
});
//# sourceMappingURL=server.cjs.map

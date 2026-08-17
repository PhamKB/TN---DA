# QUY TẮC NGHIỆP VỤ TRUNG TÂM & TIÊU CHÍ AI PHÂN TÍCH RỦI RO (CHECKPOINT 1.5)

TÀI LIỆU NÀY TỔNG HỢP TOÀN BỘ CÁC QUY TẮC VẬN HÀNH (BUSINESS RULES) VÀ TIÊU CHÍ THUẬT TOÁN PHÂN TÍCH HỌC VIÊN RỦI RO TRONG PHÂN HỆ **THCS (TRUNG HỌC CƠ SỞ)** CỦA HỆ THỐNG **SMARTEDU**.

---

## 1. PHẠM VI CHƯƠNG TRÌNH ĐÀO TẠO KHỐI THCS

SmartEdu tập trung toàn bộ nguồn lực và cấu trúc dữ liệu cho khối lớp Trung học cơ sở:
* **Khối lớp:** Lớp 6, Lớp 7, Lớp 8, Lớp 9 (4 khối lớp, 12 lớp học: 6A1-9A3).
* **Quy mô học sinh:** 216 học sinh (18 học sinh / lớp).
* **Danh mục 5 môn học cốt lõi:**
  1. **Toán học** (Mã: `TOAN`)
  2. **Ngữ văn** (Mã: `NGU_VAN`)
  3. **Tiếng Anh** (Mã: `TIENG_ANH`)
  4. **Vật lý** (Mã: `VAT_LY`)
  5. **Hóa học** (Mã: `HOA_HOC` - Giảng dạy từ lớp 8, 9)

---

## 2. QUY TẮC PHÂN BỔ GIÁO VIÊN VÀ TRÁNH XUNG ĐỘT LỊCH DẠY (SCHEDULING RULES)

1. **Giáo viên Chuyên Trách:** Hệ thống có **15 giáo viên cơ hữu** (3 giáo viên chuyên trách cho mỗi môn học trong số 5 môn học cốt lõi). Mỗi giáo viên chỉ giảng dạy đúng chuyên môn của mình, được chia về các tổ chuyên môn:
   * **Tổ Tự Nhiên:** Toán học, Vật lý, Hóa học.
   * **Tổ Xã Hội:** Ngữ văn.
   * **Tổ Ngoại Ngữ:** Tiếng Anh.
2. **Xếp Lớp & Tránh Trùng Lịch:** Mỗi lớp học (6A1-9A3) có một Thời khóa biểu cố định. Hệ thống kiểm tra trùng lặp lịch dạy của giáo viên và phòng học thời gian thực:
   * Một giáo viên không thể đứng lớp ở 2 phòng học khác nhau trong cùng một khung giờ.
   * Một phòng học không thể xếp 2 lớp cùng học một lúc.

---

## 3. QUY TRÌNH HẠCH TOÁN TÀI CHÍNH & THU HỌC PHÍ

1. **Mức học phí cơ bản:** Áp dụng mức phí đồng giá tiêu chuẩn **4,500,000 ₫ / tháng** cho chương trình toàn diện khối THCS.
2. **Cơ chế miễn giảm (Discounts):** 
   * Học bổng xuất sắc hoặc ưu đãi đăng ký sớm: Áp dụng mức giảm cố định **500,000 ₫** hoặc **1,000,000 ₫**.
   * Số tiền thực tế học viên phải nộp (Final Amount):
     $$\text{finalAmount} = \text{baseFee (4,500,000)} - \text{discount}$$
3. **Thanh toán một phần (Partial Payments):** Hệ thống cho phép phụ huynh đóng học phí làm nhiều đợt. Trạng thái hóa đơn sẽ tự động chuyển đổi:
   * `Paid`: Đã đóng đủ ($\text{paidAmount} == \text{finalAmount}$).
   * `Partially Paid`: Đã đóng một phần ($0 < \text{paidAmount} < \text{finalAmount}$).
   * `Unpaid` hoặc `Overdue`: Chưa đóng đồng nào ($\text{paidAmount} == 0$).
4. **Nghiệp vụ hoàn phí (Refunds):** Khi học viên xin rút học bạ hoặc trút học phí vì lý do khách quan, giáo vụ lập yêu cầu hoàn phí. Kế toán phê duyệt hoàn phí sẽ hạch toán ghi nhận số tiền hoàn vào hệ thống chi phí trung tâm.

---

## 4. TIÊU CHÍ AI PHÂN TÍCH RỦI RO HỌC TẬP (AI RISK & RECOMMENDATION MATRIX)

Hệ thống tích hợp công cụ đánh giá mức độ rủi ro học tập của học viên dựa trên 3 thông số đầu vào thu thập từ Firestore:
1. **Điểm trung bình (GPA):** Thang điểm 10.
2. **Tỷ lệ chuyên cần (Attendance Rate):** Tỷ lệ buổi học có mặt %.
3. **Tỷ lệ bài tập về nhà hoàn thành (Homework Completion):** Tỷ lệ nộp bài tập về nhà %.

### A. Công thức tính toán Điểm Rủi Ro (Risk Score)
Điểm rủi ro nằm trong khoảng $[0, 100]$ được tính theo công thức trọng số nghịch đảo:
$$\text{Risk Score} = 100 - \left( \text{GPA} \times 6 + \text{Attendance Rate} \times 0.2 + \text{Homework Completion} \times 0.2 \right)$$

### B. Phân loại Cấp độ Rủi Ro (Risk Level)
Hệ thống phân chia học sinh làm 3 nhóm hành động cụ thể:

* **RỦI RO CAO (High Risk):** 
  * *Điều kiện:* $\text{GPA} < 5.0$ hoặc $\text{Attendance Rate} < 70\%$.
  * *Hành động đề xuất:* AI tự động phát tín hiệu cảnh báo tới Giáo vụ và Giáo viên chủ nhiệm để lên phương án dạy phụ đạo, liên hệ trực tiếp với phụ huynh họp khẩn cấp.
* **RỦI RO TRUNG BÌNH (Medium Risk):** 
  * *Điều kiện:* $5.0 \le \text{GPA} < 6.5$ hoặc $70\% \le \text{Attendance Rate} < 85\%$.
  * *Hành động đề xuất:* Gửi thông báo nhắc nhở làm bài tập, giáo viên theo sát trên lớp.
* **RỦI RO THẤP (Low Risk):**
  * *Điều kiện:* $\text{GPA} \ge 6.5$ và $\text{Attendance Rate} \ge 85\%$.
  * *Hành động đề xuất:* Tiếp tục duy trì phong độ và tuyên dương thành tích xuất sắc định kỳ.

---

## 5. QUY TẮC QUẢN LÝ HỌC SINH VÀ PHỤ HUYNH (CHECKPOINT 4.1)

1. **Giới hạn Khối Lớp THCS (Grade Bounds):**
   * Học sinh chỉ thuộc các khối **6, 7, 8, 9** (Chương trình THCS). Không có Tiểu học hoặc THPT.
2. **Quy tắc Mã Định Danh Nghiệp Vụ (Business IDs):**
   * Mã học sinh: `STU-2026-XXX` (ví dụ `STU-2026-001`).
   * Mã phụ huynh: `PAR-2026-XXX` (ví dụ `PAR-2026-001`).
3. **Mối Quan Hệ Liên Kết Hai Chiều (Bidirectional Student ↔ Parent Relationship):**
   * Khi tạo/sửa liên kết Học sinh - Phụ huynh, hệ thống tự động cập nhật danh sách hai chiều qua Firestore `writeBatch`:
     - `students.parentId` & `students.parentIds` chứa ID của Phụ huynh.
     - `parents.studentIds` & `parents.childIds` chứa ID của Học sinh.
4. **Nguyên Tắc Soft Delete (Xóa Mềm):**
   * Tuyệt đối không xóa vật lý (Hard Delete) hồ sơ Học sinh/Phụ huynh đã có lịch sử học tập/tài chính.
   * Chuyển trạng thái `status: 'INACTIVE'` khi ngừng học/ngừng theo dõi. Các danh sách mặc định chỉ hiển thị học sinh/phụ huynh `ACTIVE`, ngoại trừ khi bật bộ lọc "Tất cả".
5. **Cấp Tài Khoản Hệ Thống (Account Granting):**
   * Bất kỳ hồ sơ Học sinh hoặc Phụ huynh nào chưa có tài khoản đều có thể được cấp tài khoản hệ thống với vai trò `STUDENT` hoặc `PARENT` để đăng nhập ERP.

---

## 6. QUY TẮC QUẢN LÝ LỚP HỌC & ENROLLMENT (CHECKPOINT 4.2)

1. **Khối Lớp & Quy Mô Lớp Học (Grade & Capacity Boundaries):**
   * **Khối lớp:** Bắt buộc thuộc tập $\{6, 7, 8, 9\}$ (THCS). Tuyệt đối không tạo khối ngoài phạm vi.
   * **Sĩ số chuẩn:** 18 học sinh / lớp. Sức chứa tối đa được cấu hình theo từng lớp nhưng không vượt quá 50 học sinh.
   * **Sĩ số thực tế:** Tính toán động từ collection `classEnrollments` với điều kiện `academicYear == year` và `status == ACTIVE`.

2. **Quy Tắc 1 Active Enrollment (Single Active Enrollment Invariant):**
   * Trong cùng một năm học (`academicYear`), mỗi học sinh chỉ có tối đa **1 bản ghi enrollment ở trạng thái ACTIVE**.
   * Khi học sinh muốn đổi lớp, bắt buộc phải sử dụng quy trình **Chuyển Lớp (Class Transfer)** thay vì ghi danh thêm.

3. **Tính Nguyên Tử Khi Chuyển Lớp (Atomic Class Transfer):**
   * Khi thực hiện chuyển lớp từ Lớp A sang Lớp B:
     1. Bản ghi enrollment hiện tại tại Lớp A được cập nhật `status: 'TRANSFERRED'`, `endDate: now`, `reason: lý_do`, `toClassId: class_B_id`.
     2. Bản ghi enrollment mới tại Lớp B được khởi tạo với `status: 'ACTIVE'`, `startDate: now`, `fromClassId: class_A_id`, `reason: lý_do`.
     3. Document học sinh (`students`) được cập nhật cache `classId: class_B_id`, `className: class_B_name`.
     4. Ghi nhận `auditLogs` hành động `TRANSFER_STUDENT` kèm đầy đủ metadata.
   * Tất cả các bước trên được thực thi trong một Firestore `writeBatch` duy nhất để đảm bảo tính nhất quán (ACID).

4. **Bảo Toàn Lịch Sử (No Hard Deletes in History):**
   * Tuyệt đối không xóa vật lý các bản ghi `classEnrollments`. Lịch sử chuyển lớp và quá trình học tập được lưu vết trọn đời làm Source of Truth.
   * Các lớp học ngừng hoạt động được chuyển sang `status: 'Tạm ngừng'` hoặc `'Đã kết thúc'`. Sức chứa của lớp không được hạ thấp hơn số lượng học sinh đang theo học thực tế.

5. **Phân Quyền Vận Hành (RBAC Matrix):**
   * `ADMIN`, `OWNER`, `ACADEMIC_STAFF`: Toàn quyền tạo/sửa lớp, ghi danh, chuyển lớp, tra cứu toàn bộ lịch sử.
   * `TEACHER`: Xem danh sách học sinh thuộc lớp phụ trách.
   * `STUDENT`, `PARENT`: Chỉ xem thông tin lớp và lịch sử enrollment của chính bản thân hoặc con cái.

---

## 7. QUY TẮC QUẢN LÝ GIÁO VIÊN VÀ PHÂN CÔNG GIẢNG DẠY (CHECKPOINT 4.3)

1. **Quy Tắc 1 Giáo Viên → 1 Môn Học (Single Subject Invariant):**
   * Mỗi giáo viên bắt buộc và chỉ được phép phụ trách duy nhất **1 môn học** trong số 5 môn học chuẩn:
     * `toan` (Toán học)
     * `van` (Ngữ văn)
     * `anh` (Tiếng Anh)
     * `ly` (Vật lý)
     * `hoa` (Hóa học)
   * Tuyệt đối không cho phép gán đa môn (`subjectId = ['toan', 'ly']`) hoặc các môn học ngoài danh mục THCS.

2. **Quy Tắc 1 Giáo Viên → Nhiều Lớp Học (One-to-Many Class Assignments):**
   * Một giáo viên có thể được phân công giảng dạy môn học chuyên trách của mình tại nhiều lớp học khác nhau trong cùng một năm học (hoặc qua nhiều năm học).
   * Ví dụ: Giáo viên Toán `TCH-2026-001` có thể được phân công dạy Toán tại `6A1`, `6A2`, `7A1`, `8A1`.

3. **Khóa Logic Duy Nhất & Chống Trùng Lặp (Logical Unique Key):**
   * Khóa logic cho mỗi phân công hoạt động: `teacherId` + `classId` + `subjectId` + `academicYear`.
   * Hệ thống nghiêm cấm tạo 2 bản ghi phân công `ACTIVE` cho cùng một giáo viên, cùng một môn học tại một lớp trong cùng một năm học.
   * Môn học được phân công (`assignment.subjectId`) bắt buộc phải trùng khớp tuyệt đối với môn học chuyên trách của giáo viên (`teacher.subjectId`).

4. **Bảo Toàn Lịch Sử & Xóa Mềm Phân Công (Soft Unassignment & Audit Trail):**
   * Khi gỡ phân công giáo viên khỏi một lớp, hệ thống không thực hiện xóa vật lý (Hard Delete).
   * Bản ghi phân công được chuyển trạng thái sang `status: 'INACTIVE'` kèm `endDate: timestamp` và ghi nhận `auditLogs` để phục vụ tra cứu lịch sử giảng dạy và kiểm toán.
   * Giáo viên nghỉ việc/tạm ngừng được đánh dấu `status: 'INACTIVE'` và hệ thống chặn việc tạo phân công mới cho giáo viên này.

5. **Phân Quyền Vận Hành & Bảo Mật (RBAC & Security):**
   * `ADMIN`, `OWNER`, `ACADEMIC_STAFF`: Toàn quyền tạo/sửa giáo viên, gán môn, phân công lớp, gỡ phân công, tra cứu lịch sử.
   * `TEACHER`: Xem hồ sơ cá nhân và danh sách các lớp mình đang được phân công giảng dạy.
   * `STUDENT`, `PARENT`, `ACCOUNTANT`: Chỉ đọc thông tin giáo viên phụ trách lớp theo phạm vi được cấp phép.

---

## 8. QUY TẮC QUẢN LÝ ĐIỂM DANH & SỔ ĐIỂM DANH HÀNG NGÀY (CHECKPOINT 4.5)

1. **Khóa Logic Duy Nhất & Tính Toàn Vẹn (Single Attendance Record Invariant):**
   * Mỗi bộ ba: `scheduleId` + `studentId` + `attendanceDate` (YYYY-MM-DD theo múi giờ `Asia/Ho_Chi_Minh`) chỉ có **tối đa 1 bản ghi điểm danh hiệu lực**.
   * Document ID được chuẩn hóa dạng: `att_{scheduleId}_{studentId}_{attendanceDate}`.
   * `attendance` không tự sinh ra dữ liệu độc lập; bắt buộc phải tham chiếu chính xác:
     - `scheduleId` (thời khóa biểu)
     - `classId` & `className` (lớp học)
     - `studentId` & `studentName` (học sinh)
     - `teacherId` & `teacherName` (giáo viên)
     - `subjectId` & `subjectName` (môn học)
     - `roomId` (phòng học)
     - `academicYear` (năm học)

2. **Quy Tắc Quyền Hạn Giáo Viên Điểm Danh (Teacher Ownership & Permission):**
   * Giáo viên chỉ được phép thực hiện điểm danh và chỉnh sửa trạng thái điểm danh cho buổi học khi thỏa mãn đồng thời:
     1. Buổi học có `schedule.teacherId == currentTeacherId`.
     2. Thời khóa biểu có trạng thái `schedule.status == ACTIVE`.
     3. Giáo viên có phân công giảng dạy hợp lệ: `teacherAssignment.teacherId == currentTeacherId`, `teacherAssignment.classId == schedule.classId`, `teacherAssignment.subjectId == schedule.subjectId`, và `teacherAssignment.status == ACTIVE`.
   * Giáo viên KHÔNG được điểm danh hộ buổi học của giáo viên khác.

3. **Danh Sách Học Sinh Đúng Lớp (Active Enrollment Integrity):**
   * Danh sách học sinh cần điểm danh trong một buổi học bắt buộc phải lấy từ các học sinh có `classEnrollment` ở trạng thái `ACTIVE` (hoặc `Đang học`) tại lớp học đó trong cùng năm học (`academicYear`).
   * Không hiển thị hoặc điểm danh các học sinh đã chuyển lớp (`TRANSFERRED`) hoặc thôi học (`INACTIVE`).

4. **Vòng Đời Trạng Thái Sổ Điểm Danh (Attendance Session Lifecycle):**
   * `DRAFT` (Bản nháp): Khi bắt đầu chọn trạng thái điểm danh cho học sinh trên giao diện.
   * `SUBMITTED` (Đã lưu & gửi): Khi giáo viên bấm "Lưu điểm danh".
   * `LOCKED` (Đã khóa sổ): Khi giáo vụ (`ACADEMIC_STAFF`), `ADMIN`, hoặc `OWNER` thực hiện khóa sổ điểm danh để chốt số liệu chuyên cần.
   * **Quy tắc khóa sổ:** Khi một buổi học chuyển sang trạng thái `LOCKED`, Giáo viên (`TEACHER`) bị chặn quyền sửa hoặc xóa bản ghi điểm danh. Chỉ có Giáo vụ, Admin, hoặc Owner mới có quyền mở khóa (`Unlock`) hoặc cập nhật.

5. **Phân Quyền RBAC Đối Với Module Điểm Danh:**
   * `OWNER`, `ADMIN`, `ACADEMIC_STAFF`: Toàn quyền xem, điểm danh tất cả các lớp, lưu sổ, khóa/mở khóa sổ điểm danh (`LOCKED`/`SUBMITTED`).
   * `TEACHER`: Xem và điểm danh các buổi học do chính mình phụ trách (`teacherId`). Bị chặn sửa khi buổi học đã `LOCKED`.
   * `STUDENT`, `PARENT`: Chỉ xem dữ liệu chuyên cần và lịch sử điểm danh của bản thân hoặc con cái.
   * `ACCOUNTANT`: **DENY tuyệt đối** đối với việc tạo, sửa, hoặc xóa bản ghi điểm danh.

6. **Múi Giờ Quy Chuẩn (Vietnam Standard Time):**
   * Tất cả ngày điểm danh (`attendanceDate`), ngày trong tuần (`dayOfWeek`), và mốc thời gian (`markedAt`, `lockedAt`) đều được chuẩn hóa và tính toán theo múi giờ `Asia/Ho_Chi_Minh` (UTC+7), ngăn ngừa lệch ngày do múi giờ trình duyệt của người dùng.

---

## 7. QUY TẮC NGHIỆP VỤ PHÂN HỆ ĐIỂM SỐ & SỔ ĐIỂM (SCORES & GRADEBOOK RULES - CHECKPOINT 4.6)

1. **Khóa Logic Định Danh Duy Nhất (Deterministic Key Invariant):**
   * Mỗi đầu điểm trong hệ thống được định danh duy nhất bởi 5 thuộc tính kinh doanh (Business Keys): `classId`, `subjectId`, `studentId`, `term` (`T1` | `T2`), và `scoreType` (`CONTINUOUS` | `MIDTERM` | `FINAL`).
   * Document ID trên Firestore có định dạng: `score_{classId}_{subjectId}_{studentId}_{term}_{scoreType}`.
   * Ngăn chặn hoàn toàn việc tạo trùng lặp hoặc mâu thuẫn dữ liệu điểm của cùng một học sinh trong một kỳ học.

2. **Thang Điểm và Độ Chính Xác (Score Precision):**
   * Thang điểm áp dụng: Số thực trong đoạn $[0.0, 10.0]$.
   * Độ chính xác: Làm tròn đến 1 chữ số thập phân (bước nhảy $0.1$).
   * Nghiêm cấm lưu các giá trị không hợp lệ: số âm, số lớn hơn 10.0, `NaN`, chuỗi rỗng.

3. **Toàn Vẹn Phân Công Giảng Dạy (Teacher Ownership Invariant):**
   * Giáo viên chỉ có quyền nhập/sửa điểm cho lớp và môn học mà mình được phân công công tác (`teacherAssignments.status == 'ACTIVE'`) trong năm học tương ứng.
   * Giáo viên không thể nhập điểm cho lớp/môn của giáo viên khác.

4. **Toàn Vẹn Hồ Sơ Học Sinh (Active Enrollment Invariant):**
   * Chỉ những học sinh có hồ sơ nhập học đang hoạt động (`classEnrollments.status == 'ACTIVE'`) trong lớp và năm học đó mới được xuất hiện trên sổ điểm và nhận đầu điểm.

5. **Quy Chuẩn Danh Mục Môn Học (THCS Standards):**
   * Hệ thống chỉ quản lý điểm số cho 5 môn học chính quy THCS: Toán (`toan`), Ngữ văn (`van`), Tiếng Anh (`anh`), Vật lý (`ly`), Hóa học (`hoa`).

6. **Vòng Đời Sổ Điểm & Khóa Học Vụ (Scorebook Lifecycle & Locking):**
   * Trạng thái gồm 3 giai đoạn: `DRAFT` (Bản nháp) $\longrightarrow$ `SUBMITTED` (Đã gửi) $\longrightarrow$ `LOCKED` (Đã khóa sổ).
   * Khi sổ điểm chuyển sang `LOCKED`, giáo viên bộ môn bị chặn quyền chỉnh sửa (Read-Only).
   * Chỉ `ADMIN`, `OWNER`, và `ACADEMIC_STAFF` mới có thẩm quyền mở khóa sổ điểm (`UNLOCK`). Mọi hành động mở khóa đều được ghi nhận vào nhật ký kiểm toán (`auditLogs`).

7. **Phân Quyền Bảo Mật (RBAC Invariants):**
   * `ACCOUNTANT`: **DENY tuyệt đối** đối với hành động tạo/sửa điểm (chỉ có quyền xem phục vụ xét duyệt học phí/học bổng).
   * `STUDENT` & `PARENT`: Chỉ có quyền xem điểm số của chính bản thân hoặc của con em mình (Read-Only).

---

## 8. QUY TẮC PHÂN QUYỀN VÀ TRUY CẬP THỜI KHÓA BIỂU & PHÒNG HỌC (CHECKPOINT 4.4.2)

1. **Quyền Tạo / Sửa / Xóa Lịch học & Phòng học:**
   * Chỉ `ADMIN`, `OWNER`, và `ACADEMIC_STAFF` có quyền quản lý, thêm mới, sửa và xóa phòng học hoặc lịch học.
   * `TEACHER`, `STUDENT`, `PARENT`, `ACCOUNTANT` hoàn toàn không có quyền sửa đổi.

2. **Quyền Đọc Phân Cấp (Hierarchical Read Scoping):**
   * **ADMIN / ACADEMIC_STAFF**: Toàn quyền đọc toàn bộ lịch học và phòng học.
   * **TEACHER**: Chỉ truy vấn và xem lịch dạy của chính mình (`teacherId == currentTeacherId`).
   * **STUDENT**: Chỉ truy vấn và xem lịch học của lớp mình đang tham gia (`classId == currentClassId`).
   * **PARENT**: Chỉ truy vấn và xem lịch học của các con (`classId in childClassIds`).
   * **ACCOUNTANT**: Bị từ chối truy cập (DENY) và không đính kèm listener vào `schedules` hay `rooms`.

3. **Nguyên Tắc Bất Biến Về Khởi Tạo Listener (Bootstrap Invariant):**
   * Không thực hiện truy vấn Firestore khi thông tin phiên làm việc (`currentUser`, `userProfile`, `currentRole`) chưa sẵn sàng.
   * Không sử dụng dữ liệu tĩnh giả lập để che đậy lỗi quyền truy cập Firestore.






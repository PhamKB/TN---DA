# TÀI LIỆU KIẾN TRÚC BẢO MẬT HỆ THỐNG & ĐỊNH HƯỚNG RBAC (CHECKPOINT 1.5)

Tài liệu này chi tiết hóa thiết kế bảo mật của hệ thống **Smart Education Center Management System (SmartEdu)** ở Checkpoint 1.5 và định hướng hoàn thiện cơ chế Authentication & Role-Based Access Control (RBAC) ở Checkpoint 2.

---

## 1. NGUYÊN TẮC BẢO MẬT KHÔNG TIN CẬY (ZERO TRUST PRINCIPLES)

1. **Không bảo mật bằng giao diện (No UI-only Authorization):** Việc ẩn/hiện sidebar, menu hoặc các button chỉ tăng trải nghiệm người dùng (UX), hoàn toàn **không** có giá trị bảo mật. Mọi API endpoint, truy vấn Firestore, và các thao tác ghi dữ liệu đều phải được chứng thực và phân quyền nghiêm ngặt ở lớp Backend / Security Rules.
2. **Xác thực trước, Truy vấn sau (Auth-First Execution):** Mọi thao tác truy cập dữ liệu phải kiểm tra tính hợp lệ của token trước khi tốn tài nguyên tìm kiếm hay so khớp dữ liệu.
3. **Phân quyền tối thiểu (Principle of Least Privilege):** Mỗi chủ thể (Actor) chỉ được phép xem và thao tác trên đúng tập hợp dữ liệu được phân công.

---

## 2. MA TRẬN PHÂN QUYỀN HỆ THỐNG (RBAC PRIVILEGE MATRIX)

| Phân hệ / Vai trò | OWNER (Chủ trung tâm) | ACADEMIC_STAFF (Giáo vụ) | TEACHER (Giáo viên) | STUDENT (Học sinh) | PARENT (Phụ huynh) | ACCOUNTANT (Kế toán) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Xem toàn bộ hệ thống** | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| **Xem Tài chính & Doanh thu** | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |
| **Xem Chi phí vận hành** | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |
| **Quản lý Học sinh & Lớp học**| ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Quản lý Lịch học & Giáo viên**| ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| **Nhập điểm số học sinh** | ✗ | ✗ | ✓ (môn đảm nhận) | ✗ | ✗ | ✗ |
| **Điểm danh học sinh** | ✗ | ✓ | ✓ (lớp phụ trách) | ✗ | ✗ | ✗ |
| **Giao bài tập về nhà** | ✗ | ✗ | ✓ (lớp phụ trách) | ✗ | ✗ | ✗ |
| **Xem điểm & Chuyên cần** | ✓ | ✓ | ✓ | ✓ (bản thân) | ✓ (con mình) | ✗ |
| **Xem Hóa đơn & Học phí** | ✓ | ✓ | ✗ | ✓ (bản thân) | ✓ (con mình) | ✓ |
| **Ghi nhận phiếu thu/hoàn tiền**| ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |

---

## 3. FIRESTORE SECURITY RULES - TRẠNG THÁI HIỆN TẠI (SANDBOX)

Trong Checkpoint 1 (Database & Seed), để hệ thống có thể khởi tạo tự động toàn diện từ backend mà không bị chặn bởi các quy trình chưa có Auth (bởi vì Auth chưa được cài đặt - sẽ được thực hiện ở Checkpoint 2), các rules hiện tại đang ở chế độ **Temporary Development Sandbox Rules**:

* **Mã nguồn:** `/firestore.rules`
* **Cơ chế:** Cho phép đọc/ghi tạm thời (`allow read, write: if true;`) kèm theo cảnh báo bảo mật và chú thích chi tiết kiến trúc khóa ở đầu file.
* **Mục đích:** Hỗ trợ quy trình Seed dữ liệu từ Server, khởi tạo 216 học sinh, 15 giáo viên, 12 lớp học, hóa đơn, và điểm số.

---

## 5. XÁC MINH KIẾN TRÚC BẢO MẬT KHÔNG TIN CẬY (CHECKPOINT 2.6 VERIFICATION)

Đã hoàn thành nâng cấp và chẩn đoán bảo mật toàn diện cho phân hệ Đăng Nhập & Phân Quyền Workspace ở Checkpoint 2.6:

1. **Strict Firestore Profile Verification (`users/{uid}`):**
   - Không còn logic tự động đăng ký hoặc cấp vai trò tạm thời ở phía Client.
   - Vai trò (`role`) và quyền hạn được lấy trực tiếp và duy nhất từ document `/users/{uid}`.
2. **Xử lý tài khoản Thiếu Hồ sơ (`AUTH_PROFILE_NOT_FOUND`):**
   - Khi tài khoản đăng nhập thành công qua Firebase Auth nhưng không tìm thấy document `users/{uid}`, hệ thống từ chối truy cập ngay lập tức, đăng xuất tài khoản và ghi nhận nhật ký kiểm toán.
3. **Xử lý tài khoản Không Hoạt động (`AUTH_PROFILE_INACTIVE`):**
   - Khi `status !== 'Đang hoạt động'` và `status !== 'ACTIVE'`, hệ thống chặn truy cập hoàn toàn.
4. **Mô hình Phân quyền Không Tin Cận Phía Client:**
   - URL hoặc state cục bộ không thể vượt qua RBAC. Nếu `activeTab` không nằm trong danh sách được phép của `profile.role`, hệ thống tự động điều hướng về `dashboard`.

Khi triển khai Authentication và phân quyền thực tế ở Checkpoint 2, các rules sẽ được siết chặt như sau:

### A. Định danh người dùng bảo mật thông qua Firestore Lookup
Chúng ta không tin tưởng vào claims gửi từ Client. Thay vào đó, mỗi khi có yêu cầu ghi/đọc, Security Rules sẽ thực hiện một truy vấn nội bộ (get) vào collection `/users/` để xác định vai trò thực tế của người dùng:
```javascript
function getUserData() {
  return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
}
function hasRole(role) {
  return request.auth != null && getUserData().role == role;
}
```

### B. Siết chặt bảo mật theo từng Collection cụ thể

1. **Collection `expenses` (Chi phí vận hành):**
   ```javascript
   match /expenses/{id} {
     allow read, write: if hasRole('OWNER') || hasRole('ACCOUNTANT');
   }
   ```
2. **Collection `scores` (Sổ điểm học bạ):**
   ```javascript
   match /scores/{id} {
     allow read: if hasRole('OWNER') || hasRole('ACADEMIC_STAFF') || 
                  (hasRole('TEACHER') && isTeacherOfClass(resource.data.classId)) || 
                  (hasRole('STUDENT') && resource.data.studentId == request.auth.uid) || 
                  (hasRole('PARENT') && isParentOf(resource.data.studentId));
     allow write: if hasRole('TEACHER') && isTeacherOfClass(incoming().classId) && isSubjectTeacher(incoming().subjectId);
   }
   ```
3. **Collection `students` (Thông tin học sinh & PII):**
   ```javascript
   match /students/{id} {
     allow read: if hasRole('OWNER') || hasRole('ACADEMIC_STAFF') || 
                  (hasRole('STUDENT') && id == request.auth.uid) || 
                  (hasRole('PARENT') && resource.data.parentId == request.auth.uid);
     allow write: if hasRole('ACADEMIC_STAFF') || hasRole('OWNER');
   }
   ```

Tất cả các collection khác (`homeworks`, `auditLogs`, `invoices`, `payments`) cũng sẽ áp dụng mô hình phân quyền chặt chẽ tương tự để chặn đứng mọi khả năng rò rỉ dữ liệu (Data Leak) hoặc can thiệp dữ liệu trái phép (Unauthorized Tampering).

---

## 6. XÁC MINH PHÂN QUYỀN VÀ BẢO MẬT CỦA PHÂN HỆ HỌC SINH & PHỤ HUYNH (CHECKPOINT 4.1)

1. **Rule Đọc/Ghi Hai Collection `students` & `parents`:**
   - **Quyền Tạo/Sửa/Thao tác (Write):** Chỉ cho phép người dùng có vai trò `ADMIN`, `OWNER`, hoặc `ACADEMIC_STAFF`.
   - **Quyền Xem (Read):**
     - `ADMIN`, `OWNER`, `ACADEMIC_STAFF`, `ACCOUNTANT`, `TEACHER`: Có quyền xem danh sách học sinh & phụ huynh.
     - `STUDENT`: Chỉ xem được thông tin cá nhân của chính mình.
     - `PARENT`: Chỉ xem được thông tin của con cái thuộc danh sách `childIds`/`studentIds` được liên kết.
2. **Khóa liên kết dữ liệu nhạy cảm:**
   - Liên kết tài khoản `userId` cho Học sinh/Phụ huynh được bảo mật tuyệt đối qua Security Rules và Audit Logging.
3. **Toàn vẹn thao tác ghi hàng loạt (Atomic Batch Updates):**
   - Mọi thao tác cập nhật liên kết Phụ huynh ↔ Học sinh đều phải dùng `writeBatch` hoặc `runTransaction` để đảm bảo không bị xung đột hay mất tính nhất quán giữa hai collection.

---

## 7. BẢO MẬT & PHÂN QUYỀN SỔ ĐIỂM DANH HÀNG NGÀY (CHECKPOINT 4.5)

1. **Kiểm Soát Quyền Điểm Danh Tại Lớp Security Rules (`attendance`):**
   ```javascript
   match /attendance/{id} {
     allow read: if isSignedIn() && (
       isManager() ||
       isTeacher() ||
       (isStudent() && resource.data.studentId == getUserData().studentId) ||
       (isParent() && resource.data.studentId in getParentStudentIds())
     );
     // Accountant: STRICT DENY on write/update/delete
     allow create: if isSignedIn() && (
       isManager() ||
       (isTeacher() && (request.resource.data.teacherId == request.auth.uid || request.resource.data.teacherId == getUserData().id))
     );
     allow update: if isSignedIn() && (
       isManager() ||
       (isTeacher() && 
        (resource.data.teacherId == request.auth.uid || resource.data.teacherId == getUserData().id) &&
        resource.data.sessionStatus != 'LOCKED' &&
        request.resource.data.sessionStatus != 'LOCKED')
     );
     allow delete: if isSignedIn() && isManager();
   }
   ```

2. **Cơ Chế Khóa Sổ Điểm Danh Chống Can Thiệp (Session Lock Integrity):**
   - Khi một buổi học được giáo vụ hoặc quản lý chuyển trạng thái thành `LOCKED`, Security Rules ở Firestore từ chối mọi yêu cầu `update` từ vai trò `TEACHER`.
   - Giáo viên không thể tự ý chuyển từ `LOCKED` về `SUBMITTED` hoặc `DRAFT`.

3. **Từ Chối Tuyệt Đối Kế Toán Viên (Accountant Denial):**
   - Role `ACCOUNTANT` hoàn toàn không có quyền tạo, cập nhật hay xóa bản ghi trong collection `attendance`.

4. **Bảo Mật Quyền Riêng Tư Của Học Sinh & Phụ Huynh:**
   - Học sinh chỉ có quyền đọc các bản ghi điểm danh có `studentId == user.studentId`.
   - Phụ huynh chỉ đọc các bản ghi có `studentId` nằm trong danh sách con cái (`childIds`/`studentIds`).

---

## 8. BẢO MẬT & PHÂN QUYỀN ĐIỂM SỐ VÀ SỔ ĐIỂM HỌC VỤ (CHECKPOINT 4.6)

1. **Security Rules cho Collection `scores`:**
   ```javascript
   match /scores/{id} {
     allow read: if isSignedIn();
     allow create: if isSignedIn() && (isAdmin() || isAcademicStaff() || isTeacher()) && !isAccountant();
     allow update: if isSignedIn() && (
       isAdmin() || 
       isAcademicStaff() || 
       (isTeacher() && resource.data.status != 'LOCKED')
     ) && !isAccountant();
     allow delete: if isAdmin() || isAcademicStaff();
   }
   ```

2. **Quy Tắc Khóa Sổ Điểm Học Vụ (Scorebook Locking Protection):**
   - Khi kỳ học được Ban Giám Hiệu hoặc Giáo Vụ phê duyệt và chuyển sang `LOCKED`, Security Rules chặn mọi hành vi chỉnh sửa điểm từ tài khoản `TEACHER`.
   - Chỉ có `ADMIN`, `OWNER`, hoặc `ACADEMIC_STAFF` mới có thẩm quyền mở khóa để điều chỉnh khi có đơn xin phúc khảo hợp lệ.
   - Thao tác mở khóa bắt buộc ghi nhận lý do và actor vào collection `auditLogs`.

3. **Từ Chối Tuyệt Đối Kế Toán Viên (Accountant Denial):**
   - Tài khoản vai trò `ACCOUNTANT` bị từ chối quyền `create`, `update`, `delete` trên toàn bộ collection `scores`. Chỉ có quyền `read` để phục vụ xác minh học bổng và thanh quyết toán.

4. **Ma Trận Phân Quyền Điểm Số (Score Matrix):**

| Vai trò | Xem Sổ Điểm | Nhập Điểm (Draft) | Gửi Phê Duyệt | Khóa Sổ Điểm | Mở Khóa Sổ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **OWNER / ADMIN** | Toàn bộ | Có | Có | Có | Có |
| **ACADEMIC_STAFF** | Toàn bộ | Có | Có | Có | Có |
| **TEACHER** | Lớp/Môn phụ trách | Có (khi chưa khóa) | Có | Không | Không |
| **ACCOUNTANT** | Xem chỉ đọc | Không (DENY) | Không (DENY) | Không (DENY) | Không (DENY) |
| **STUDENT** | Chỉ điểm của mình | Không | Không | Không | Không |
| **PARENT** | Chỉ điểm của con | Không | Không | Không | Không |

---

## 9. BẢO MẬT & PHÂN QUYỀN TRUY CẬP THỜI KHÓA BIỂU & PHÒNG HỌC (CHECKPOINT 4.4.2)

1. **Security Rules cho Collection `schedules` và `rooms`:**
   ```javascript
   match /rooms/{id} {
     allow read: if isSignedIn() && (
       isAdmin() || 
       isAcademicStaff() || 
       isTeacher() || 
       isStudent() || 
       isParent()
     ) && !isAccountant();
     allow write: if isAdmin() || isAcademicStaff();
   }

   match /schedules/{id} {
     allow read: if isSignedIn() && (
       isAdmin() || 
       isAcademicStaff() || 
       isTeacher() || 
       isStudent() || 
       isParent()
     ) && !isAccountant();
     allow write: if isAdmin() || isAcademicStaff();
   }
   ```

2. **Nguyên Tắc Truy Vấn Đồng Bộ Theo Phạm Vi Phân Quyền (Scoped Querying):**
   - **ADMIN / ACADEMIC_STAFF**: Truy vấn collection-level `collection('schedules')` và `collection('rooms')` để bao quát toàn bộ lịch dạy và phòng học toàn trung tâm.
   - **TEACHER**: Truy vấn có điều kiện `query(collection('schedules'), where('teacherId', '==', teacherId))` để lấy chính xác các tiết học được phân công.
   - **STUDENT**: Truy vấn có điều kiện `query(collection('schedules'), where('classId', '==', classId))` để nhận lịch học của lớp mình đang theo học.
   - **PARENT**: Truy vấn có điều kiện `query(collection('schedules'), where('classId', 'in', childClassIds))` để theo dõi lịch học của các con.
   - **ACCOUNTANT**: Hoàn toàn **KHÔNG** đính kèm Firestore listener cho `schedules` và `rooms`, loại bỏ triệt để cảnh báo `Missing or insufficient permissions`.

3. **Cơ Chế Khởi Động An Toàn (Auth-Profile-Role Ready Bootstrap):**
   - Ứng dụng chỉ đính kèm listener sau khi `currentUser`, `userProfile`, và `currentRole` đã được nạp đầy đủ từ `/users/{uid}`.
   - Khi có lỗi mạng hoặc phân quyền, ứng dụng ghi nhận log rõ ràng, không sử dụng dữ liệu tĩnh giả mạo để che giấu lỗi.





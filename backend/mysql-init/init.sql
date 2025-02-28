USE pos_db;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    due_date DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, due_date) VALUES
('สั่งของเข้า Stock', 'ตรวจสอบสินค้าในคลังและสั่งเพิ่ม', 'Pending', '2025-03-10 12:00:00'),
('ตรวจสอบยอดขาย', 'สรุปรายงานยอดขายประจำวัน', 'In Progress', '2025-03-15 18:00:00'),
('อัปเดตเมนู', 'เพิ่มเมนูใหม่ในระบบ POS', 'Pending', NULL);

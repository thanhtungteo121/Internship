function getFullWeekDates(referenceDate = new Date()) {
    const today = new Date(referenceDate);
    const dayOfWeek = today.getDay(); // Chủ Nhật = 0, Thứ Hai = 1, ...
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Chênh lệch để về Thứ Hai

    const monday = new Date(today.setDate(today.getDate() + diffToMonday)); // Thứ Hai
    const fullWeek = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i); // Cộng từng ngày từ Thứ Hai đến Chủ Nhật
        fullWeek.push(date.toISOString().slice(0, 10)); // Lưu ở định dạng yyyy-mm-dd
    }

    return fullWeek;
}
module.exports = { getFullWeekDates};
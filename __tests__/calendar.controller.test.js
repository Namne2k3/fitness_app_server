// calendar.controller.test.js
import { jest } from '@jest/globals';

// Sử dụng unstable_mockModule để mock ES module
jest.unstable_mockModule('../models/calendar.model.js', () => ({
    default: {
        create: jest.fn(),
        find: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteMany: jest.fn(),
    }
}));

// Import module sau khi đã mock rõ ràng
const Calendar = (await import('../models/calendar.model.js')).default;

const {
    createCalendarNotify,
    getCalendarNotifications,
    deleteCalendarNotifyById,
    deleteNotificationsPassed
} = await import('../controllers/calendar.controller.js');

const mockReq = (body = {}, params = {}, user = {}) => ({ body, params, user });
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('Calendar Controller Tests', () => {
    test('createCalendarNotify - success', async () => {
        const req = mockReq({ title: 'Event' });
        const res = mockRes();

        Calendar.create.mockResolvedValue(req.body);

        await createCalendarNotify(req, res);

        expect(Calendar.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Tạo mới thông báo thành công',
            data: req.body,
        });
    });

    test('createCalendarNotify - error', async () => {
        const req = mockReq({});
        const res = mockRes();

        Calendar.create.mockRejectedValue(new Error('Error'));

        await createCalendarNotify(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error' });
    });

    test('getCalendarNotifications - success', async () => {
        const req = mockReq({}, {}, { _id: 'user123' });
        const res = mockRes();
        const calendars = [{ event: 'test' }];

        Calendar.exec.mockResolvedValue(calendars);

        await getCalendarNotifications(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Tạo mới thông báo thành công',
            data: calendars,
        });
    });

    test('deleteCalendarNotifyById - success', async () => {
        const req = mockReq({}, { id: 'notif123' });
        const res = mockRes();

        Calendar.findByIdAndDelete.mockResolvedValue({});

        await deleteCalendarNotifyById(req, res);

        expect(Calendar.findByIdAndDelete).toHaveBeenCalledWith('notif123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Đã xóa hẹn thông báo!' });
    });

    test('deleteNotificationsPassed - success', async () => {
        const req = mockReq({}, {}, { _id: 'user123' });
        const res = mockRes();

        Calendar.deleteMany.mockResolvedValue({});

        await deleteNotificationsPassed(req, res);

        expect(Calendar.deleteMany).toHaveBeenCalledWith({ user: 'user123', calendarDate: { $lt: expect.any(Number) } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Đã xóa tất cả thông báo đã qua!' });
    });
});

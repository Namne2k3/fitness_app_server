import 'dotenv/config';
import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Mock bcryptjs đầy đủ
jest.unstable_mockModule('bcryptjs', () => ({
    default: {
        hash: jest.fn().mockResolvedValue('hashedpassword'),
        compare: jest.fn().mockResolvedValue(true),
        genSalt: jest.fn().mockResolvedValue('fakesalt'), // sửa lỗi tại đây
    },
}));

// Mock jsonwebtoken đầy đủ
jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        sign: jest.fn().mockReturnValue('fake-jwt-token'),
    },
}));

// Import modules sau khi mock đầy đủ
const bcrypt = (await import('bcryptjs')).default;
const jwt = (await import('jsonwebtoken')).default;
const app = (await import('../index.js')).default;
const { User } = await import('../models/index.js');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();  // Xóa hoàn toàn DB test (rất triệt để)
    await mongoose.connection.close(true);     // Đóng connection ngay lập tức
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await User.deleteMany({});
});

describe('Auth Controller', () => {
    test('Đăng ký thành công', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser',
                clerkId: '12345',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('Đăng ký tài khoản thành công!');
    });

    test('Đăng nhập thành công', async () => {
        await User.create({
            email: 'test@example.com',
            password: 'hashedpassword',
            username: 'testuser',
            clerkId: '12345',
        });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBe('fake-jwt-token');
    });
});

import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../index.js';  // Import server chính
import User from '../models/user.model.js';

// Mock JWT & Bcrypt
jest.mock('bcrypt', () => ({
    ...jest.requireActual('bcrypt'),
    compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));



let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Kiểm tra nếu Mongoose đã kết nối thì đóng trước
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});


describe('Auth Controller', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('Đăng ký thành công', async () => {
        const newUser = {
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser',
            clerkId: '12345'
        };

        const res = await request(app).post('/api/auth/signup').send(newUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Đăng ký tài khoản thành công!");
        expect(res.body.user).toHaveProperty("_id");
    });

    test('Đăng ký thất bại - Email đã tồn tại', async () => {
        await User.create({ email: 'test@example.com', password: 'password123', username: 'testuser', clerkId: '12345' });

        const res = await request(app).post('/api/auth/signup').send({
            email: 'test@example.com',
            password: 'password123',
            username: 'testuser2',
            clerkId: '67890'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Tài khoản đã tồn tại!");
    });

    test('Đăng nhập thành công', async () => {
        const passwordHash = await bcrypt.hash('password123', 10);
        const user = await User.create({
            email: 'test@example.com',
            password: passwordHash,
            username: 'testuser',
            clerkId: '12345'
        });

        bcrypt.compare.mockResolvedValueOnce(true); // Mô phỏng mật khẩu đúng
        jwt.sign.mockResolvedValue('fake-jwt-token'); // Mô phỏng JWT token

        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBe('fake-jwt-token');
        expect(res.body.data.email).toBe(user.email);
    });


    // test('Đăng nhập thất bại - Sai mật khẩu', async () => {
    //     const passwordHash = await bcrypt.hash('password123', 10);
    //     await User.create({
    //         email: 'test@example.com',
    //         password: passwordHash,
    //         username: 'testuser',
    //         clerkId: '12345'
    //     });

    //     bcrypt.compare.mockResolvedValueOnce(false);

    //     const res = await request(app).post('/api/auth/login').send({
    //         email: 'test@example.com',
    //         password: 'wrongpassword'
    //     });

    //     expect(res.statusCode).toBe(400);
    //     expect(res.body.message).toBe('Sai mật khẩu!');
    // });

    // test('Đăng nhập thất bại - Email chưa đăng ký', async () => {
    //     const res = await request(app).post('/api/auth/login').send({
    //         email: 'notexist@example.com',
    //         password: 'password123'
    //     });

    //     expect(res.statusCode).toBe(400);
    //     expect(res.body.message).toBe('Email chưa được đăng ký');
    // });

    // test('Đăng xuất thành công', async () => {
    //     const user = await User.create({
    //         email: 'test@example.com',
    //         password: 'password123',
    //         username: 'testuser',
    //         clerkId: '12345'
    //     });

    //     const token = jwt.sign({ _id: user._id, role: 'user' }, 'secret-key', { expiresIn: '7d' });

    //     const res = await request(app)
    //         .post('/api/auth/logout')
    //         .set('Authorization', `Bearer ${token}`);

    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.message).toBe('Đăng xuất thành công!');
    // });
});

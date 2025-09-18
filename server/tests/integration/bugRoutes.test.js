const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Bug = require('../../src/models/Bug');

describe('Bug Routes Integration Tests', () => {
    beforeAll(async() => {
        // Connect to test database
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async() => {
        await mongoose.connection.close();
    });

    beforeEach(async() => {
        await Bug.deleteMany({});
    });

    describe('GET /api/bugs', () => {
        it('should return empty array when no bugs exist', async() => {
            const response = await request(app)
                .get('/api/bugs')
                .expect(200);

            expect(response.body).toEqual([]);
        });

        it('should return all bugs', async() => {
            const bugs = [
                { title: 'Bug 1', description: 'First bug description', status: 'open' },
                { title: 'Bug 2', description: 'Second bug description', status: 'resolved' }
            ];

            await Bug.insertMany(bugs);

            const response = await request(app)
                .get('/api/bugs')
                .expect(200);

            expect(response.body).toHaveLength(2);
            expect(response.body[0].title).toBe('Bug 2'); // Should be sorted by createdAt desc
        });
    });

    describe('POST /api/bugs', () => {
        it('should create a new bug', async() => {
            const newBug = {
                title: 'New Bug',
                description: 'This is a new bug description',
                priority: 'high',
                status: 'open'
            };

            const response = await request(app)
                .post('/api/bugs')
                .send(newBug)
                .expect(201);

            expect(response.body.title).toBe(newBug.title);
            expect(response.body.description).toBe(newBug.description);
            expect(response.body.priority).toBe(newBug.priority);
            expect(response.body._id).toBeDefined();
        });

        it('should return 400 for invalid bug data', async() => {
            const invalidBug = {
                title: 'AB', // Too short
                description: 'Short' // Too short
            };

            const response = await request(app)
                .post('/api/bugs')
                .send(invalidBug)
                .expect(400);

            expect(response.body.errors).toBeDefined();
            expect(response.body.errors).toContain('Title must be at least 3 characters long');
            expect(response.body.errors).toContain('Description must be at least 10 characters long');
        });
    });

    describe('PUT /api/bugs/:id', () => {
        it('should update an existing bug', async() => {
            const bug = await Bug.create({
                title: 'Original Bug',
                description: 'Original description here',
                status: 'open'
            });

            const updates = {
                status: 'in-progress',
                assignee: 'John Doe'
            };

            const response = await request(app)
                .put(`/api/bugs/${bug._id}`)
                .send(updates)
                .expect(200);

            expect(response.body.status).toBe('in-progress');
            expect(response.body.assignee).toBe('John Doe');
            expect(response.body.title).toBe('Original Bug'); // Unchanged
        });

        it('should return 404 for non-existent bug', async() => {
            const fakeId = new mongoose.Types.ObjectId();

            await request(app)
                .put(`/api/bugs/${fakeId}`)
                .send({ status: 'resolved' })
                .expect(404);
        });

        it('should return 400 for invalid bug ID', async() => {
            await request(app)
                .put('/api/bugs/invalid-id')
                .send({ status: 'resolved' })
                .expect(400);
        });
    });

    describe('DELETE /api/bugs/:id', () => {
        it('should delete an existing bug', async() => {
            const bug = await Bug.create({
                title: 'Bug to Delete',
                description: 'This bug will be deleted',
                status: 'open'
            });

            await request(app)
                .delete(`/api/bugs/${bug._id}`)
                .expect(200);

            const deletedBug = await Bug.findById(bug._id);
            expect(deletedBug).toBeNull();
        });

        it('should return 404 for non-existent bug', async() => {
            const fakeId = new mongoose.Types.ObjectId();

            await request(app)
                .delete(`/api/bugs/${fakeId}`)
                .expect(404);
        });
    });
});
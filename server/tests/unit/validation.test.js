const { validateBug, validateBugUpdate } = require('../../src/utils/validation');

describe('Validation Utils', () => {
    describe('validateBug', () => {
        it('should validate a valid bug', () => {
            const validBug = {
                title: 'Test Bug',
                description: 'This is a test bug description',
                status: 'open',
                priority: 'high'
            };

            const result = validateBug(validBug);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should reject missing title', () => {
            const bug = {
                description: 'This is a test bug description'
            };

            const result = validateBug(bug);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Title is required');
        });

        it('should reject short title', () => {
            const bug = {
                title: 'AB',
                description: 'This is a test bug description'
            };

            const result = validateBug(bug);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Title must be at least 3 characters long');
        });

        it('should reject missing description', () => {
            const bug = {
                title: 'Test Bug'
            };

            const result = validateBug(bug);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Description is required');
        });

        it('should reject short description', () => {
            const bug = {
                title: 'Test Bug',
                description: 'Too short'
            };

            const result = validateBug(bug);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Description must be at least 10 characters long');
        });

        it('should reject invalid status', () => {
            const bug = {
                title: 'Test Bug',
                description: 'This is a test bug description',
                status: 'invalid-status'
            };

            const result = validateBug(bug);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Invalid status. Must be open, in-progress, or resolved');
        });

        it('should reject invalid priority', () => {
            const bug = {
                title: 'Test Bug',
                description: 'This is a test bug description',
                priority: 'critical'
            };

            const result = validateBug(bug);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Invalid priority. Must be low, medium, or high');
        });
    });

    describe('validateBugUpdate', () => {
        it('should validate partial update', () => {
            const update = {
                status: 'resolved'
            };

            const result = validateBugUpdate(update);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should reject invalid status in update', () => {
            const update = {
                status: 'completed'
            };

            const result = validateBugUpdate(update);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Invalid status. Must be open, in-progress, or resolved');
        });

        it('should validate title length in update', () => {
            const update = {
                title: 'AB'
            };

            const result = validateBugUpdate(update);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Title must be at least 3 characters long');
        });
    });
});
const express = require('express');
const authenticate = require('../middleware/authenticate');

const app = express();
app.use(express.json());

const blogPostRouter = require('./blogPostRoute');
app.use('/api/blogPosts', blogPostRouter);

describe('Blog Post Routes', () => {
    it('Should return all blog posts when authenticated', async () => {
        const mockPosts = [
          { _id: '1', title: 'Post 1', content: 'Content 1' },
          { _id: '2', title: 'Post 2', content: 'Content 2' }
        ];
      
        jest.spyOn(BlogPost, 'find').mockResolvedValue(mockPosts);
      
        const mockReq = {};
        const mockRes = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis()
        };
      
        await router.get('/', authenticate, (req, res) => {
          expect(BlogPost.find).toHaveBeenCalled();
          expect(res.json).toHaveBeenCalledWith(mockPosts);
        });
      
        expect(mockRes.status).not.toHaveBeenCalled();
      });
});

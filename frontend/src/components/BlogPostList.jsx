import { Grid, Typography } from "@mui/material";
import BlogPostCard from "./BlogPostCard";
import PropTypes from 'prop-types';

const BlogPostList = ({ posts }) => {
  if (!posts.length) {
    return <Typography>No blog posts available.</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post._id}>
          <BlogPostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};
BlogPostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BlogPostList;

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
	const mostLikedBlog = blogs.reduce((max, blog) => {
	  return blog.likes > max.likes ? blog : max;
	}, { likes: 0 });
  
	return {
	  title: mostLikedBlog.title,
	  author: mostLikedBlog.author,
	  likes: mostLikedBlog.likes
	};
};
  
  
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};
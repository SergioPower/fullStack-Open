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

const mostBlogs = (blogs) => {
	const authorCount = blogs.reduce((count, blog) => {
	  count[blog.author] = (count[blog.author] || 0) + 1;
	  return count;
	}, {});
  
	const author = Object.entries(authorCount).reduce((max, current) => {
	  return current[1] > max[1] ? current : max;
	});
  
	return {
	  author: author[0],
	  blogs: author[1]
	};
};

const moreLikes = (blogs) => { 
	const likesCount = blogs.reduce((count, blog) => {
		count[blog.author] = (count[blog.author] || 0) + blog.likes;
		return count;
	  }, {});

	const author = Object.entries(likesCount).reduce((max, current) => {
		return current[1] > max[1] ? current : max;
	});

	return {
		author: author[0],
		likes: author[1],
	};
	
};
  
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	moreLikes,
};
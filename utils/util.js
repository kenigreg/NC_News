const getCurrentDate = articlesData => {
  if (articlesData.length === 0) return [];
  const newArticle = articlesData.map(article => {
    const { created_at, ...restOfStuff } = article;

    return { created_at: new Date(article.created_at), ...restOfStuff };
  });

  return newArticle;
};

const formatComments = (commentsData, commentsRefObj) => {
  const newArray = commentsData.map(comment => {
    const newComment = { ...comment };
    newComment.author = comment.created_by;
    newComment.article_id = commentsRefObj[comment.belongs_to];
    delete newComment.belongs_to;
    delete newComment.created_by;
    return newComment;
    // const { belongs_to, created_by, ...restOfStuff } = comment;
    // return { , ...restOfStuff };
  });

  const newComments = getCurrentDate(newArray);

  return newComments;
};

const createRef = articles => {
  const refObject = {};
  articles.forEach(article => {
    refObject[article.title] = article.article_id;
  });

  return refObject;
};

module.exports = { getCurrentDate, formatComments, createRef };

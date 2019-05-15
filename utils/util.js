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
  //console.log(newArray);
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

const formatArray = (objRef, array) => {
  const formatedResult = array.map(comment => {
    return {
      body: comment.body,
      votes: comment.votes,
      author: comment.author,
      created_at: comment.created_at,
      article_id: objRef[comment.article_id]
    };
  });

  return formatedResult;
};

module.exports = { getCurrentDate, formatComments, createRef, formatArray };

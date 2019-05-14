const getCurrentDate = articlesData => {
  if (articlesData.length === 0) return [];
  const newArticle = articlesData.map(article => {
    const { created_at, ...restOfStuff } = article;

    return { created_at: new Date(article.created_at), ...restOfStuff };
  });

  return newArticle;
};
//2019-05-13T19:11:55.266Z

const renameKeys = (
  commentsData,
  keyToChange,
  newKey,
  keyToChange1,
  newKey1
) => {
  if (commentsData.length === 0) return [];

  const newArray = commentsData.map(comment => {
    const {
      [keyToChange]: oldKey,
      [keyToChange1]: oldKey1,
      ...restOfStuff
    } = comment;
    return { [newKey]: oldKey, [newKey1]: oldKey1, ...restOfStuff };
  });
  // console.log(newArray, '<---');
  const newComments = getCurrentDate(newArray);
  console.log(newComments, '<---');
  return newComments;
};

const createRef = () => {};

module.exports = { getCurrentDate, renameKeys, createRef };

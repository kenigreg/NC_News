const { expect } = require('chai');
const {
  getCurrentDate,
  formatComments,
  createRef,
  formatArray
} = require('../utils/util');

describe('getCurrentDate', () => {
  it('returns a new empty array, when passed an empty array', () => {
    const albums = [];
    const actual = getCurrentDate(albums);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it('returns a new array, when passed an array of 1 item', () => {
    const albums = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1557774715266,
        votes: 100
      }
    ];
    const actual = getCurrentDate(albums);
    const now = new Date(1557774715266);
    const expected = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: now,
        votes: 100
      }
    ];

    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it('returns a new array, when passed an array of more than 1 item', () => {
    const albums = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1557774715266,
        votes: 100
      },
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: 1416140514171
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 1289996514171
      }
    ];
    const actual = getCurrentDate(albums);
    const now = new Date(1557774715266);
    const expected = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: now,
        votes: 100
      },
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: new Date(1416140514171)
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: new Date(1289996514171)
      }
    ];

    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
});

describe('formatComments', () => {
  it('returns a new empty array, when passed an empty array', () => {
    const albums = [];
    const actual = formatComments(albums);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it('can reformat an array of one comment', () => {
    const comment = [
      {
        body: 'test_body',
        belongs_to: 'test_title',
        created_by: 'test_user',
        votes: 0,
        created_at: 1416746163389
      }
    ];

    const expected = [
      {
        body: 'test_body',
        article_id: 1,
        author: 'test_user',
        votes: 0,
        created_at: new Date(1416746163389)
      }
    ];

    const refObj = { test_title: 1 };

    expect(formatComments(comment, refObj)).to.eql(expected);
  });
  it('returns a new array, when passed an array of 1 element', () => {
    const albums = [
      {
        body: ' I carry a log — yes. Is it funny to you? It is not to me.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: -100,
        created_at: 1416746163389
      }
    ];

    const actual = formatComments(albums);
    const expected = [
      {
        body: ' I carry a log — yes. Is it funny to you? It is not to me.',
        article_id: 'Living in the shadow of a great man',
        author: 'icellusedkars',
        votes: -100,
        created_at: new Date(1416746163389)
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
  it('returns a new array, when passed an array of more than 1 element', () => {
    const albums = [
      {
        body: ' I carry a log — yes. Is it funny to you? It is not to me.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: -100,
        created_at: 1416746163389
      },
      {
        body: 'I hate streaming noses',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1385210163389
      }
    ];
    const keyToChange = 'belongs_to';
    const newKey = 'article_id';
    const keyToChange1 = 'created_by';
    const newKey1 = 'author';

    const actual = formatComments(
      albums,
      keyToChange,
      newKey,
      keyToChange1,
      newKey1
    );
    const expected = [
      {
        body: ' I carry a log — yes. Is it funny to you? It is not to me.',
        article_id: 'Living in the shadow of a great man',
        author: 'icellusedkars',
        votes: -100,
        created_at: new Date(1416746163389)
      },
      {
        body: 'I hate streaming noses',
        article_id: 'Living in the shadow of a great man',
        author: 'icellusedkars',
        votes: 0,
        created_at: new Date(1385210163389)
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(albums);
  });
});

describe('createRef', () => {
  it('returns a new empty object, when passed an empty array', () => {
    const input = [];

    //const key = 'article_id';
    const actual = createRef(input);
    const expected = {};
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it('returns a new object of formated article_id, when passed an array of 1 item', () => {
    const input = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];

    const actual = createRef(input);
    const expected = {
      'Living in the shadow of a great man': 1
    };
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it('returns a new object of formated article_id, when passed an array of more than 1 item', () => {
    const input = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      },
      {
        article_id: 2,
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 1289996514171
      }
    ];

    const actual = createRef(input);
    const expected = {
      'Living in the shadow of a great man': 1,
      'Eight pug gifs that remind me of mitch': 2
    };
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
});

describe('formatArray', () => {
  it('returns a new empty array, when passed an empty array', () => {
    const input = [];
    const objRef = {};
    const actual = formatArray(objRef, input);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it('returns a new array, when passed an array of 1 item', () => {
    const input = [
      {
        body: 'I hate streaming noses',
        article_id: 'Living in the shadow of a great man',
        author: 'icellusedkars',
        votes: 0,
        created_at: new Date(1385210163389)
      }
    ];
    const objRef = { 'Living in the shadow of a great man': 1 };
    const actual = formatArray(objRef, input);
    const expected = [
      {
        body: 'I hate streaming noses',
        article_id: 1,
        author: 'icellusedkars',
        votes: 0,
        created_at: new Date(1385210163389)
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it('returns a new array, when passed an array of more than 1 item', () => {
    const input = [
      {
        body: 'I hate streaming noses',
        article_id: 'Living in the shadow of a great man',
        author: 'icellusedkars',
        votes: 0,
        created_at: new Date(1385210163389)
      },
      {
        body: 'Fruit pastilles',
        article_id: 'Eight pug gifs that remind me of mitch',
        author: 'icellusedkars',
        votes: 0,
        created_at: new Date(1132922163389)
      }
    ];
    const objRef = {
      'Living in the shadow of a great man': 1,
      'Eight pug gifs that remind me of mitch': 2
    };
    const actual = formatArray(objRef, input);
    const expected = [
      {
        body: 'I hate streaming noses',
        article_id: 1,
        author: 'icellusedkars',
        votes: 0,
        created_at: new Date(1385210163389)
      },
      {
        body: 'Fruit pastilles',
        article_id: 2,
        author: 'icellusedkars',
        votes: 0,
        created_at: new Date(1132922163389)
      }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
});

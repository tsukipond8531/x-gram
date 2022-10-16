import { generateRandomIntegerInRange } from '@/Utils'
import { Gender } from './Enum'

export const mockComments = [
  {
    comment_id: '1',
    commented_by: {
      user_id: 'username01',
      full_name: 'John Doe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment: '@username This is a comment by John Doe',
  },
  {
    comment_id: '2',
    commented_by: {
      user_id: 'username02',
      full_name: 'Jane Doe',
      username: 'janedoe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment:
      'This is a comment by Jane Doe. This is a comment by Jane Doe .This is a comment by Jane Doe This is a comment by Jane Doe ',
  },
  {
    comment_id: '3',
    commented_by: {
      user_id: 'username02',
      full_name: 'Jane Doe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment:
      '@username03 This is a comment by Jane Doe. This is a comment by Jane Doe .This is a comment by Jane Doe This is a comment by Jane Doe ',
  },
  {
    comment_id: '4',
    commented_by: {
      user_id: 'username02',
      full_name: 'Jane Doe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment:
      'This is a comment by Jane Doe. This is a comment by Jane Doe .This is a comment by Jane Doe This is a comment by Jane Doe ',
  },
  {
    comment_id: '5',
    commented_by: {
      user_id: 'username02',
      full_name: 'Jane Doe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment:
      'This is a comment by Jane Doe. This is a comment by Jane Doe .This is a comment by Jane Doe This is a comment by Jane Doe ',
  },
  {
    comment_id: '6',
    commented_by: {
      user_id: 'username02',
      full_name: 'Jane Doe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment:
      '@username04 This is a comment by Jane Doe. This is a comment by Jane Doe .This is a comment by Jane Doe This is a comment by Jane Doe ',
  },
  {
    comment_id: '7',
    commented_by: {
      user_id: 'username02',
      full_name: 'Jane Doe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment:
      'This is a comment by Jane Doe. This is a comment by Jane Doe .This is a comment by Jane Doe This is a comment by Jane Doe ',
  },
  {
    comment_id: '8',
    commented_by: {
      user_id: 'username02',
      full_name: 'Jane Doe',
      avatar_url: 'https://picsum.photos/200/300',
    },
    comment:
      '@username04 This is a comment by Jane Doe. This is a comment by Jane Doe .This is a comment by Jane Doe This is a comment by Jane Doe ',
  },
]
export const mockUsers = [
  {
    user_id: 'username01',
    full_name: 'John Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Male,
  },
  {
    user_id: 'username02',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username03',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username04',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username05',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username06',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username07',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username08',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username09',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
  {
    user_id: 'username10',
    full_name: 'Jane Doe',
    avatar_url: 'https://picsum.photos/200/300',
    bio: 'This is a bio',
    followers: [],
    following: [],
    gender: Gender.Female,
  },
]
export const mockPosts = [
  {
    post_id: '1',
    posted_by: mockUsers[0],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    message: 'This is a post by John Doe',
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
    ],
    reactions: [
      {
        reaction_id: '1',
        reacted_by: mockUsers[0],
      },
      {
        reaction_id: '2',
        reacted_by: mockUsers[1],
      },
    ],
    comments: mockComments,
  },
  {
    post_id: '2',
    posted_by: mockUsers[0],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    message: 'This is a post by John Doe',
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
    ],
    reactions: [
      {
        reaction_id: '1',
        reacted_by: mockUsers[0],
      },
      {
        reaction_id: '2',
        reacted_by: mockUsers[1],
      },
    ],
    comments: mockComments,
  },
  {
    post_id: '3',
    posted_by: mockUsers[0],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    message: 'This is a post by John Doe',
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
    ],
    reactions: [
      {
        reaction_id: '1',
        reacted_by: mockUsers[0],
      },
      {
        reaction_id: '2',
        reacted_by: mockUsers[1],
      },
    ],
    comments: mockComments,
  },
  {
    post_id: '4',
    posted_by: mockUsers[0],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    message: 'This is a post by John Doe',
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
    ],
    reactions: [
      {
        reaction_id: '1',
        reacted_by: mockUsers[0],
      },
      {
        reaction_id: '2',
        reacted_by: mockUsers[1],
      },
    ],
    comments: mockComments,
  },
  {
    post_id: '5',
    posted_by: mockUsers[0],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    message: 'This is a post by John Doe',
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
    ],
    reactions: [
      {
        reaction_id: '1',
        reacted_by: mockUsers[0],
      },
      {
        reaction_id: '2',
        reacted_by: mockUsers[1],
      },
    ],
    comments: mockComments,
  },
  {
    post_id: '6',
    posted_by: mockUsers[0],
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    message: 'This is a post by John Doe',
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
      },
    ],
    reactions: [
      {
        reaction_id: '1',
        reacted_by: mockUsers[0],
      },
      {
        reaction_id: '2',
        reacted_by: mockUsers[1],
      },
    ],
    comments: mockComments,
  },
]

export const mockStories = [
  {
    story_id: '1',
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
    ],
    posted_by: mockUsers[0],
  },
  {
    story_id: '2',
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
    ],
    posted_by: mockUsers[1],
  },
  {
    story_id: '3',
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
    ],
    posted_by: mockUsers[2],
  },
  {
    story_id: '4',
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    medias: [
      {
        media_id: '1',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
      {
        media_id: '2',
        url:
          'https://picsum.photos/' +
          generateRandomIntegerInRange(800, 2000) +
          '/' +
          generateRandomIntegerInRange(800, 2000) +
          '',
        is_video: false,
        created_at: new Date().getTime(),
        rotation: 0,
        scale: 1,
        caption: 'This is a caption',
      },
    ],
    posted_by: mockUsers[3],
  },
]

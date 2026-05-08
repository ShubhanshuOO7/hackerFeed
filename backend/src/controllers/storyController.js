import Story from "../models/Story.js";
import User from "../models/User.js";

export const getStories = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const stories = await Story.find()
    .sort({ points: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(stories);
};

export const getStory = async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return res.status(404).json({
      message: "Story not found",
    });
  }

  res.json(story);
};

export const toggleBookmark = async (req, res) => {
  const user = await User.findById(req.user._id);

  const storyId = req.params.id;

  const exists = user.bookmarks.includes(storyId);

  if (exists) {
    user.bookmarks.pull(storyId);
  } else {
    user.bookmarks.push(storyId);
  }

  await user.save();

  res.json(user.bookmarks);
};
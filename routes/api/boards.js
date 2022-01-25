const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const Middleware = require('../../middleware/index');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');



const User = require('../../models/User');
const Board = require('../../models/Board');

// Add a board
router.post(
  '/',
  [check('title', 'Title is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, backgroundURL } = req.body;

      // Create and save the board
      const newBoard = new Board({ title, backgroundURL });
      const board = await newBoard.save();

      // Add board to user's boards
      // const user = await User.findById(req.user.id);
      const user = await User.findOne({ 'email': `${req.user.email}` });
      // console.log(user);
      user.boards.unshift(board.id);
      await user.save();

      // Add user to board's members as admin
      board.members.push({ user: user.id, name: user.name, email: user.email  });

      // Log activity
      board.activity.unshift({
        text: `${user.name} created this board`,
      });
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get user's boards
router.get('/', async (req, res) => {
  // const user1 = await User.findOne({ 'email': `${req.user.email}` });
  // console.log(req.user.email, user1 );
  try {
    const user = await User.findOne({ 'email': `${req.user.email}` });
    // console.log(user);
    const boards = [];
    for (const boardId of user.boards) {
      // boards.push(await Board.findById(boardId));
      let tempboard = await Board.findById(boardId)
      if(tempboard){
        boards.push(tempboard)
      }
      else{
        boards=[]
      }
    }

    res.json(boards);
  } catch (err) {
    console.error(err.message,err);
    res.status(500).send('Server Error');
  }
});

// Get a board by id
router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a board's activity
router.get('/activity/:boardId', async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ msg: 'Board not found' });
    }

    res.json(board.activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Change a board's title
router.patch(
  '/rename/:id',
  [member, [check('title', 'Title is required').not().isEmpty()]],
  async (req, res) => {
    console.log(req.params);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ msg: 'Board not found' });
      }

      // Log activity
      if (req.body.title !== board.title) {
        const user = await User.findOne({ 'email': `${req.user.email}` });
        board.activity.unshift({
          text: `${user.name} renamed this board (from '${board.title}')`,
        });
      }

      board.title = req.body.title;
      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err,err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Add a board member
router.put('/addMember/:email', member, async (req, res) => {
  try {
    
    const board = await Board.findById(req.header('boardId'));
    const user = await User.findOne({ 'email': `${req.params.email}` });
   
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // See if already member of board
    if (board.members.map((member) => member.email).includes(req.params.email)) {
      return res.status(400).json({ msg: 'Already member of board' });
    }

    user.boards.unshift(board.id);
    await user.save();
   
    // Add user to board's members with 'normal' role
    board.members.push({ user: user.id, name: user.name, email:user.email, role: 'normal' });
   
    // Log activity
    board.activity.unshift({
      text: `${user.name} joined this board`,
    });
    // console.log(board);
    await board.save();

    res.json(board.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
const Board = require('../models/Board');

module.exports = async function (req, res, next) {
  const board = await Board.findById(req.header('boardId'));
  
  // const board = await Board.findById('61ec318ace6c7df54ea0bf1b');
  if (!board) {
    // console.log(board,req);
    return res.status(404).json({ msg: 'Board not found' });
  }
  const members = board.members.map((member) => member.email);
  // console.log('fsdfs',members, req.user);
  if (members.includes(req.user.email)) {
    next();
  } else {
    res.status(401).json({ msg: 'You must be a member of this board to make changes' });
  }
};
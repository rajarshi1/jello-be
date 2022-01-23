const admin = require('../config/firebase-config');
const response = require('../helpers/response.helpers');
class Middleware {
	async decodeToken(req, res, next) {
        const token = req.headers.authorization
		// console.log(req._parsedUrl.path);
		if(req._parsedUrl.path=='/api/auth/signup'){
			return next();
		}
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
            console.log(e);
            return response.responseHelper(res, false, 'bad token');
		}
	}
}

module.exports = new Middleware();
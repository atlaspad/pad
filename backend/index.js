/*  backend/index.js
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev>
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const Session = require('express-session');
const { generateNonce, SiweMessage } = require('siwe');

const projectRoute = require('./routes/project.route');

const app = express();
app.disable('x-powered-by');

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors());
app.use(helmet());
app.use(
	morgan(
		'[ :method :url ] ~:status | :date[web] | :total-time[digits] ms | IP :remote-addr | :user-agent'
	)
);

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb conn. error:'));
db.once('open', () => {
	console.info('connected to mongodb');
});

app.get('/hello', (req, res) => {
	res.status(200).json({ message: 'Close the world, .txen eht nepO' });
});

app.use('/projects', projectRoute);

app.use((err, req, res, next) => {
	if (err instanceof mongoose.Error.ValidationError) {
		const errors = Object.keys(err.errors).map((key) => err.errors[key].message);
		return res.status(400).json({ errors });
	}
	res.status(500).json({ message: 'An unexpected error occurred' });
});

app.use(Session({
    name: 'siwe-quickstart',
    secret: "siwe-quickstart-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true }
}));

app.get('/nonce', async function (req, res) {
    req.session.nonce = generateNonce();
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(req.session.nonce);
});

app.post('/verify', async function (req, res) {
    try {
        if (!req.body.message) {
            res.status(422).json({ message: 'Expected prepareMessage object as body.' });
            return;
        }

        let SIWEObject = new SiweMessage(req.body.message);
        const { data: message } = await SIWEObject.verify({ signature: req.body.signature, nonce: req.session.nonce });

        req.session.siwe = message;
        req.session.cookie.expires = new Date(message.expirationTime);
        req.session.save(() => res.status(200).send(true));
    } catch (e) {
        req.session.siwe = null;
        req.session.nonce = null;
        console.error(e);
        switch (e) {
            case ErrorTypes.EXPIRED_MESSAGE: {
                req.session.save(() => res.status(440).json({ message: e.message }));
                break;
            }
            case ErrorTypes.INVALID_SIGNATURE: {
                req.session.save(() => res.status(422).json({ message: e.message }));
                break;
            }
            default: {
                req.session.save(() => res.status(500).json({ message: e.message }));
                break;
            }
        }
    }
});

app.get('/personal_information', function (req, res) {
    if (!req.session.siwe) {
        res.status(401).json({ message: 'You have to first sign_in' });
        return;
    }
    console.log("User is authenticated!");
    res.setHeader('Content-Type', 'text/plain');
    res.send(`You are authenticated and your address is: ${req.session.siwe.address}`);
});

app.listen(process.env.PORT, () => {
	console.info('Atlaspad Launchpad backend ready on port', process.env.PORT);
	console.info('arbeit studio: building the next generation of the Web.');
});

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

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb conn. error:'));
db.once('open', () => {
	console.info('connected to mongodb');
});

app.get('/hello', (req, res) => {
	res.status(200).json({ message: 'Close the world, .txen eht nepO' });
});

app.use('/projects', projectRoute);

app.listen(process.env.PORT, () => {
	console.info('Atlaspad Launchpad backend ready on port', process.env.PORT);
	console.info('arbeit studio: building the next generation of the Web.');
});

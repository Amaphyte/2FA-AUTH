require('dotenv').config();
const CnnectDB = require('./configDB');
const Cors = require('cors');

const speakeasy = require('speakeasy');
const {JsonDB} = require('node-json-db');
const {Config} = require('node-json-db/dist/lib/JsonDBConfig')
const krptorian = require('./routes/kryptonianRoutes')
const image = require('./routes/imageRoutes');
const Authenticate = require('./middleware/authenticate');

const app = express();
connectDB();
const db = new JsonDB (new Config ('myDatabase', true, false, '/'))
app.use(cors());

app.use(express.json());

app.get ('api', (req, res) => res.json({message: 'welcome to 2FA Authentication'}))
app.use('/api', kryptorianRoutes)
app.use('/api', imageRoutes);
app.use('/api', express.static(path.join(_dirname, 'public', 'images')))

app.use(authenticate);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
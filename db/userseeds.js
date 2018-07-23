const mongoose = require('mongoose')
require('dotenv').config()

const User = require('../models/User')
const mongoURI = process.env.mongoURI

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch(err => {
    console.log(err)
  })

const userSeeds = [
  {
    'firstName': 'Lola',
    'lastName': 'Zhang',
    'employeeNumber': 'T10000',
    'email': 'l.zhang@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': true,
    'active': true
  },
  {
    'firstName': 'Marni',
    'lastName': 'Carter',
    'employeeNumber': 'T10001',
    'email': 'm.carter@toyta.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': true,
    'active': true
  },
  {
    'firstName': 'Vida',
    'lastName': 'Sanders',
    'employeeNumber': 'T10002',
    'email': 'v.sanders@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': true,
    'active': true
  },
  {
    'firstName': 'Angel',
    'lastName': 'Gilmore',
    'employeeNumber': 'T10003',
    'email': 'a.gilmore@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Allen',
    'lastName': 'Watts',
    'employeeNumber': 'T10004',
    'email': 'a.watts@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Coletta',
    'lastName': 'Mendez',
    'employeeNumber': 'T10005',
    'email': 'c.mendez@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Milton',
    'lastName': 'Hines',
    'employeeNumber': 'T10006',
    'email': 'm.hines.toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Hisako',
    'lastName': 'Mccarthy',
    'employeeNumber': 'T10007',
    'email': 'm.hisako@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Kristine',
    'lastName': 'Guerrero',
    'employeeNumber': 'T10008',
    'email': 'g.kristine@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Rochelle',
    'lastName': 'Cooke',
    'employeeNumber': 'T10009',
    'email': 'r,cooke@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Carolann',
    'lastName': 'Mann',
    'employeeNumber': 'T10010',
    'email': 'c.mann@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Eusebia',
    'lastName': 'Mosley',
    'employeeNumber': 'T10011',
    'email': 'e.mosley@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Marquitta',
    'lastName': 'Zhang',
    'employeeNumber': 'T10012',
    'email': 'm.zhang@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Marline',
    'lastName': 'Chung',
    'employeeNumber': 'T10013',
    'email': 'm.chung@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Lashandra',
    'lastName': 'Davila',
    'employeeNumber': 'T10014',
    'email': 'l.davila@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Tamar',
    'lastName': 'Crane',
    'employeeNumber': 'T10015',
    'email': 't.crane@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Kasie',
    'lastName': 'Cordova',
    'employeeNumber': 'T10016',
    'email': 'k.cordova@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Teodoro',
    'lastName': 'Osborne',
    'employeeNumber': 'T10017',
    'email': 't.osborne@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Tommye',
    'lastName': 'Francis',
    'employeeNumber': 'T10018',
    'email': 'f.tommye@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Ivan',
    'lastName': 'Barnes',
    'employeeNumber': 'T10019',
    'email': 'i.barnes@toyota.com.au',
    'department': 'Product Design',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Audrey',
    'lastName': 'Pennington',
    'employeeNumber': 'T10020',
    'email': 'a.pennington@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Illa',
    'lastName': 'Stanton',
    'employeeNumber': 'T10021',
    'email': 'i.stanton@toyota.com.au',
    'department': 'Product Design',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Margy',
    'lastName': 'Savage',
    'employeeNumber': 'T10022',
    'email': 'm.savage@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Sanda',
    'lastName': 'Rush',
    'employeeNumber': 'T10023',
    'email': 's.rush@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Eileen',
    'lastName': 'Ward',
    'employeeNumber': 'T10024',
    'email': 'e.ward@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Lyman',
    'lastName': 'Werner',
    'employeeNumber': 'T10025',
    'email': 'l.werner@toyota.com.au',
    'department': 'Product Design',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Rodger',
    'lastName': 'Griffin',
    'employeeNumber': 'T10026',
    'email': 'r.griffin@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Tressie',
    'lastName': 'Clements',
    'employeeNumber': 'T10027',
    'email': 't.clements@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Kathy',
    'lastName': 'Best',
    'employeeNumber': 'T10028',
    'email': 'k.best@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Francisco',
    'lastName': 'Newton',
    'employeeNumber': 'T10029',
    'email': 'f.newton@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Lillian',
    'lastName': 'Acevedo',
    'employeeNumber': 'T10030',
    'email': 'l.acevedo@toyota.com.au',
    'department': 'Product Design',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Chastity',
    'lastName': 'Parker',
    'employeeNumber': 'T10031',
    'email': 'c.parker@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Nichelle',
    'lastName': 'Camacho',
    'employeeNumber': 'T10032',
    'email': 'n.camacho@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Salvatore',
    'lastName': 'Stanton',
    'employeeNumber': 'T10033',
    'email': 's.stanton@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Josiah',
    'lastName': 'Glass',
    'employeeNumber': 'T10034',
    'email': 'j.glass@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Thuy',
    'lastName': 'Spears',
    'employeeNumber': 'T10035',
    'email': 't.spears@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Arielle',
    'lastName': 'Santana',
    'employeeNumber': 'T10036',
    'email': 'a.santana@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Ileana',
    'lastName': 'Freeman',
    'employeeNumber': 'T10037',
    'email': 'i.freeman@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Mariela',
    'lastName': 'Copeland',
    'employeeNumber': 'T10038',
    'email': 'm.copeland@toyota.com.au',
    'department': 'Technical Administration',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Kizzie',
    'lastName': 'Walker',
    'employeeNumber': 'T10039',
    'email': 'k.walker@toyota.com.au',
    'department': 'Product Design',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Gaynell',
    'lastName': 'Lawrence',
    'employeeNumber': 'T10040',
    'email': 'g.lawrence@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Avery',
    'lastName': 'Kane',
    'employeeNumber': 'T10041',
    'email': 'a.kane@toyota.com.au',
    'department': 'Connected Vehicle Services',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Brain',
    'lastName': 'Nicholson',
    'employeeNumber': 'T10042',
    'email': 'b.nicholson@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Allison',
    'lastName': 'Caldwell',
    'employeeNumber': 'T10043',
    'email': 'al.caldwell@toyota.com.au',
    'department': 'Product Planning & Pricing',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Carmina',
    'lastName': 'Walton',
    'employeeNumber': 'T10044',
    'email': 'c.walton@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Enid',
    'lastName': 'Malone',
    'employeeNumber': 'T10045',
    'email': 'e.malone@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Marion',
    'lastName': 'Schwartz',
    'employeeNumber': 'T10046',
    'email': 'm.schwartz@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Johnette',
    'lastName': 'Thomas',
    'employeeNumber': 'T10047',
    'email': 'j.thomas@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Kazuko',
    'lastName': 'Ray',
    'employeeNumber': 'T10048',
    'email': 'k.ray@toyota.com.au',
    'department': 'Vehicle Evaluation',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Colette',
    'lastName': 'Blackwell',
    'employeeNumber': 'T10049',
    'email': 'c.blackwell@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Domingo',
    'lastName': 'Burnett',
    'employeeNumber': 'T10050',
    'email': 'b.d.burnett@toyota.com.au',
    'department': 'Product Design',
    'password': 'password123',
    'administrator': false,
    'active': true
  },
  {
    'firstName': 'Devon',
    'lastName': 'Jackson',
    'employeeNumber': 'T10051',
    'email': 'd.jackson@toyota.com.au',
    'department': 'Regulations, Conversions & Accessories',
    'password': 'password123',
    'administrator': false,
    'active': true
  }
]

User.create(userSeeds)

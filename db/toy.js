const mongoose = require('mongoose')
require('dotenv').config()

const User = require('../models/User')
const Sop = require('../models/Sop')
const mongoURI = process.env.mongoURI

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch(err => {
    console.log(err)
  })

// Sop.aggregate([
//   {$project: {title: '$title'}
//       // "read": { $in: [ mongoose.Types.ObjectId("5b5410d47d093a520a2edbf6"), '$currentVersion.usersRead' ]}
//   }]).exec(function(res) {console.log(res)})

// Sop.aggregate([
//   {
//     $project: {
//       "title" : "$title",
//       "read" : {
//         $in: [ mongoose.Types.ObjectId("5b5410d47d093a520a2edbf6"), '$currentVersion.usersRead' ]
//       }
//     }
//   }
// ]).exec(function(res) {console.log(res)})

async function fake () {

  const sop = await Sop.aggregate([
    {
      $project: {
        'title': '$title',
        'version': '$currentVersion.version',
        'awsPath': '$currentVersion.awsPath',
        'department': '$department',
        'read': {
          $in: [ mongoose.Types.ObjectId('5b5410d47d093a520a2edbf6'), '$currentVersion.usersRead' ]
        }
      }
    }
  ])
  console.log(sop)
}

fake()

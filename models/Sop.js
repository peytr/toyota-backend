const mongoose = require('mongoose')

const versionSchema = new mongoose.Schema({
  version: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  awsPath: {
    type: String,
    required: true
  },
  usersRead: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: 'User' }
  ],
  usersRequired: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: 'User' }
  ]
})

const sopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
    enum: [
      'Product Planning & Pricing',
      'Product Design',
      'Regulations, Conversions & Accessories',
      'Vehicle Evaluation',
      'Connected Vehicle Services',
      'Technical Administration'
    ]
  },
  currentVersion: {
    type: versionSchema,
    required: true
  },
  previousVersions: [versionSchema]
})

const Sop = mongoose.model('Sop', sopSchema)

module.exports = Sop

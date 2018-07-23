const mongoose = require('mongoose')
const moment = require('moment')

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

// versionSchema.virtual('pieData').get(function () {
//   const read = this.usersRead.length
//   const unread = this.usersRequired.length - this.usersRead.length
//   return [
//     {title: 'Read', value: read, color: 'green'},
//     {title: 'Unread', value: unread, color: 'red'}]
// })

// versionSchema.virtual('summaryStats').get(function () {
//   const read = this.usersRead.length
//   const readPercent = Math.round(100 * this.usersRead.length / this.usersRequired.length)
//   const unread = this.usersRequired.length - this.usersRead.length
//   const unreadPercent = Math.round(100 * (this.usersRequired.length - this.usersRead.length) / this.usersRequired.length)
//   const total = this.usersRequired.length
//   return {
//     read,
//     readPercent,
//     unread,
//     unreadPercent,
//     total
//   }
// })

versionSchema.virtual('currentExpires').get(function () {
  return moment.utc(this.createdAt).add(5, 'years').format('YYYY-MM-DD')
})

versionSchema.set('toObject', { virtuals: true })

const Sop = mongoose.model('Sop', sopSchema)

module.exports = Sop

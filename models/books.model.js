const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    isbn: {
      type: String
    },
    pageCount: {
      type: Number,
      required: true,
      default: 0
    },
    publishedDate: {
      type: Date,
      required: true
    },
    thumbnailUrl: { type: String },
    shortDescription: {
      type: String
    },
    longDescription: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    authors: {
      type: [
        {
          type: String
        }
      ],
      default: []
    },
    categories: {
      type: [
        {
          type: String
        }
      ],
      default: []
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Book', bookSchema)

const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    isbn: {
      type: String,
      required: true
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
    thumbnailUrl: { type: String, required: true },
    shortDescription: {
      type: String,
      required: true
    },
    longDescription: {
      type: String,
      required: true
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

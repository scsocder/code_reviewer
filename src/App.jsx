import { useState } from 'react'
import "prismjs/themes/prism-tomorrow.css"

import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"

import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState("")

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })

      // ✅ Extract the response string from backend
      let reviewText = ""
      if (typeof response.data === "string") {
        reviewText = response.data
      } else if (response.data.response) {
        reviewText = response.data.response
      } else if (response.data.review) {
        reviewText = response.data.review
      } else {
        reviewText = JSON.stringify(response.data, null, 2)
      }

      // ✅ Replace escaped newlines and tabs with real ones
      reviewText = reviewText.replace(/\\n/g, "\n").replace(/\\t/g, "  ")

      setReview(reviewText)
    } catch (error) {
      console.error(error)
      setReview("❌ Error getting review from server")
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>

        <button onClick={reviewCode} className="review">
          Review
        </button>
      </div>

      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      </div>
    </main>
  )
}

export default App

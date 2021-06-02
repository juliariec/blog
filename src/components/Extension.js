import React from "react"
import { Link } from "gatsby"

const Extension = ({ previous, next }) => {
  return (
    <div className="flex-container extension">
      <div className="half">
        {previous && (
          <>
            <p>Previous</p>
            <Link to={previous.fields.slug}>{previous.frontmatter.title}</Link>
          </>
        )}
      </div>

      <div className="half">
        {next && (
          <>
            <p>Next</p>
            <Link to={next.fields.slug}>{next.frontmatter.title}</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Extension

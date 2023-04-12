import React from 'react'
import PropTypes from 'prop-types'

function Button({name, href}) {
  return (
    <button type="button" class="btn btn-primary" href = "/login">{name}</button>
  )
}

Button.propTypes = {
    name: PropTypes.string
}

export default Button

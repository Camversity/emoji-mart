import React from 'react'
import PropTypes from 'prop-types'

export default class Anchors extends React.PureComponent {
  constructor(props) {
    super(props)

    let defaultCategory = props.categories.filter(
      (category) => category.first,
    )[0]

    this.state = {
      selected: defaultCategory.name,
      customSelected: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleCustomClick = this.handleCustomClick.bind(this)
  }

  handleClick(e) {
    var index = e.currentTarget.getAttribute('data-index')
    var { categories, onAnchorClick } = this.props
    // deselect custom tab when clicking
    this.setState({
      customSelected: false,
    })
    onAnchorClick(categories[index], index)
  }

  handleCustomClick() {
    // select custom tab when clicking
    this.setState({
      customSelected: true,
    })
    this.props.onCustomClick()
  }

  render() {
    var { categories, color, i18n, icons, customElementDisabled } = this.props,
      { selected, customSelected } = this.state

    return (
      <nav className="emoji-mart-anchors" aria-label={i18n.categorieslabel}>
        {categories.map((category, i) => {
          var { id, name, anchor } = category,
            isSelected = !customSelected && name == selected

          // to provide a custom button (gif) as the last category
          const custom = 'GIF'
          const customColor = customElementDisabled ? '#DFDFDF' : '#858585'
          if (i === categories.length - 1)
            return (
              <button
                key={id}
                aria-label={custom}
                title={custom}
                data-index={i}
                onClick={customElementDisabled ? null : this.handleCustomClick}
                className={`emoji-mart-anchor ${
                  customSelected ? 'emoji-mart-anchor-selected' : ''
                }`}
                style={{ color: customSelected ? color : customColor }}
              >
                <div className="emoji-mart-anchor-icon">
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 'bold',
                      lineHeight: '24px',
                    }}
                  >
                    {custom}
                  </span>
                </div>
                <span
                  className="emoji-mart-anchor-bar"
                  style={{ backgroundColor: color }}
                />
              </button>
            )

          if (anchor === false) {
            return null
          }

          return (
            <button
              key={id}
              aria-label={i18n.categories[id]}
              title={i18n.categories[id]}
              data-index={i}
              onClick={this.handleClick}
              className={`emoji-mart-anchor ${
                isSelected ? 'emoji-mart-anchor-selected' : ''
              }`}
              style={{ color: isSelected ? color : null }}
            >
              <div className="emoji-mart-anchor-icon">
                {icons.categories[id]()}
              </div>
              <span
                className="emoji-mart-anchor-bar"
                style={{ backgroundColor: color }}
              />
            </button>
          )
        })}
      </nav>
    )
  }
}

Anchors.propTypes /* remove-proptypes */ = {
  categories: PropTypes.array,
  onAnchorClick: PropTypes.func,
  onCustomClick: PropTypes.func,
  icons: PropTypes.object,
  customElementDisabled: PropTypes.bool,
}

Anchors.defaultProps = {
  categories: [],
  onAnchorClick: () => {},
  onCustomClick: () => {},
  icons: {},
}

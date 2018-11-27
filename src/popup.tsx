import * as React from 'react'
import * as ReactDom from 'react-dom'

class Popup extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <div>Popup</div>
    )
  }
}

ReactDom.render(
  <Popup />,
  document.getElementById('root')
)

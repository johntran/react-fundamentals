////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make tabs a "pure component" by not managing any of its own state, instead
// add a property to tell it which tab to show, and then have it communicate
// with its owner to get rerendered with a new active tab.
//
// Why would you move that state up? you might have a workflow where they can't
// progress from one step to the next until they've completed some sort of task
// but they can go back if they'd like. If the tabs keep their own state you
// can't control them with your application logic.
//
// Already done?
//
// Make a `StatefulTabs` component that manages some state that is passes as
// props down to `Tabs` (since they should now be stateless)
////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import { render } from 'react-dom'
import styles from './lib/styles'
import data from './lib/data'

class Tabs extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTabIndex: 0
    }
  }

  handleTabClick(activeTabIndex) {
    this.setState({ activeTabIndex })
  }

  renderTabs() {
    return this.props.data.map((tab, index) => {
      const style = this.state.activeTabIndex === index ?
        styles.activeTab : styles.tab
      return (
        <div
          className="Tab"
          key={tab.name}
          style={style}
          onClick={() => this.handleTabClick(index)}
        >
          {tab.name}
        </div>
      )
    })
  }

  renderPanel() {
    const tab = this.props.data[this.state.activeTabIndex]
    return (
      <div>
        <p>{tab.description}</p>
      </div>
    )
  }

  render() {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    )
  }

}

class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Props v. State</h1>
        <Tabs ref="tabs" data={this.props.tabs} />
      </div>
    )
  }

}

render(<App tabs={data}/>, document.getElementById('app'), function () {
  require('./tests')(this)
})

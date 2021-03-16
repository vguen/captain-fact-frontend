import React from 'react'
import { connect } from 'react-redux'

import { classifyComments } from '../../state/video_debate/comments/selectors'
import StatementCard from './StatementCard'
import styled from 'styled-components'

import {
  joinCommentsChannel,
  joinCommentsTestChannel,
  leaveCommentsChannel,
} from '../../state/video_debate/comments/effects'
import {
  joinStatementsChannel,
  leaveStatementsChannel,
} from '../../state/video_debate/statements/effects'

const StatementsList = styled.div`
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  justify-content: center;
  max-width: 1300px;
  padding: 1em 0;

  // the .columns css class set the margins to negative values, this 
  // allow to override the style to force the value
  && {
    margin: 0 auto;
  }
`

@connect((state) => ({}),
  {
    joinCommentsTestChannel,
    leaveCommentsChannel,
  }
)
export class StatementsGrid extends React.PureComponent {
  componentDidMount() {
    // Join channels
    this.props.joinCommentsTestChannel()
    //this.props.joinCommentsChannel(videoId)
  }

  componentWillUnmount() {
    this.props.leaveCommentsChannel()
    //this.props.leaveStatementsChannel()
  }

  render() {
    return (
      <StatementsList className="columns is-multiline">
        {this.props.statements.map((statement) => {
          // TODO:
          // Error: Warning: Failed prop type: Invalid prop `statementID` of type `string` supplied to `CommentForm`, expected `number`.
          // this is not a good fix...
          statement.id = Number(statement.id)
          return (
            <StatementCard key={statement.id} statement={statement} />
          )
        })}
      </StatementsList>
    )
  }
}
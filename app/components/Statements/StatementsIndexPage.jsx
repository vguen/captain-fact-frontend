import React from 'react'
import { merge } from 'immutable'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import capitalize from 'voca/capitalize'
import { Helmet } from 'react-helmet'

import { toAbsoluteURL } from '../../lib/cf_routes'
import { Icon } from '../Utils'
import { commentedStatmentsFilter } from '../../state/user_preferences/reducer'
import PaginatedStatementsContainer from './PaginatedStatementsContainer'
import styled from 'styled-components'

const StatementPage = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 5vh 0.5em;
`

const StatementPageHeader = styled.section`
  min-height: 60px;
  margin-bottom: 20px;
`

// const StatementsWithCommentsFilterBar = ({ commentedStatmentsFilter }) => {
//   return (
//     <nav className="level videos-filter">
//       <FieldWithLabelAddon
//         onClick={() => commentedStatmentsFilter(true)}
//         label={t('misc.source')}>
//       </FieldWithLabelAddon>
//       <FieldWithLabelAddon onClick={() => commentedStatmentsFilter(false)} label={t('misc.languageFilter')}>
//       </FieldWithLabelAddon>
//     </nav>
//   )
// }

@connect(
  (state) => ({
    commentedStatements: state.UserPreferences.commentedStatements,
  }),
  { commentedStatmentsFilter }
)
@withNamespaces('main')
export default class StatementsIndexPage extends React.PureComponent {
  render() {
    const { t, location } = this.props
    const currentPage = parseInt(location.query.page) || 1

    return (
      <StatementPage>
        <Helmet>
          <meta property="og:url" content={toAbsoluteURL('/statements')} />
          <meta property="og:title" content="Les dernieres déclarations sur CaptainFact" />
          <meta
            property="og:description"
            content="Découvrez diverses déclarations sourcées et vérifiées par la communauté CaptainFact"
          />
        </Helmet>
        {
          // <StatementsWithCommentsFilterBar
          // />
        }
        <StatementPageHeader>
          <h2 className="title is-2">
            <Icon name="television" />
            <span> {capitalize(t('entities.lastStatements'))}</span>
          </h2>
        </StatementPageHeader>
         <PaginatedStatementsContainer
           baseURL={this.props.location.pathname}
           currentPage={currentPage}
         />
      </StatementPage>
    )
  }
}

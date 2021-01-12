import React from 'react'
import Container from '../StyledUtils/Container'
import { LoadingFrame } from '../Utils/LoadingFrame'
import { useLoggedInUser } from '../LoggedInUser/UserProvider'
import { optionsToQueryString } from '../../lib/url_utils'

const getIframeURLParams = (loggedInUser) => {
  const params = { useTheme: true }
  if (loggedInUser) {
    params.defaultEmail = loggedInUser.email
    params.defaultName = loggedInUser.name || loggedInUser.username
  }

  return optionsToQueryString(params)
}

const SupportUs = (props) => {
  const [isLoading, setLoading] = React.useState(true)
  const { loggedInUser } = useLoggedInUser()
  const iframeRef = React.useRef()

  if (props.location.query.useHelloAsso !== undefined) {
    return (
      <Container display="flex" width="100%" height="100%" justifyContent="center">
        {isLoading && <LoadingFrame />}
        <iframe
          scrolling="auto"
          src="https://www.helloasso.com/associations/tous-elus/formulaires/2/widget"
          style={{ width: '100%', height: '100%', display: isLoading ? 'none' : 'block' }}
          onLoad={() => setLoading(false)}
        />
      </Container>
    )
  } else {
    const ocDomain = 'http://localhost:3000' // TODO: Move to config
    return (
      <Container display="flex" width="100%" height="100%" justifyContent="center">
        {isLoading && <LoadingFrame />}
        <iframe
          ref={iframeRef}
          src={`${ocDomain}/embed/captainfact_io/donate${getIframeURLParams(loggedInUser)}`}
          style={{ width: '100%', height: '100%', display: isLoading ? 'none' : 'block' }}
          onLoad={() => setLoading(false)}
        />
      </Container>
    )
  }
}

SupportUs.propTypes = {}

export default SupportUs

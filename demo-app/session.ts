import S from 's-js'
import { Session, useClientMessage } from '../src'
import { renderApp } from './app'
import { renderClock } from './components/clock'
import { renderMenu } from './components/menu'
import { renderNav } from './components/nav'
import { renderHomePage } from './pages/home-page'
import { State } from './state'

export function createSession(session: Session): Session | void {
  S.root(dispose => {
    session.once('close', dispose)

    const state = new State({ url: session.request.url! })
    S.cleanup(() => state.dispose())

    session.onMessage = useClientMessage(message => {
      if (message.type === 'event') {
        const [type, ...args] = message.args
        state.events.emit(type, args)
        return
      }
      console.log(message)
    })
    // for client request
    state.events.on('resendTemplate', ([selector]: [string]) =>
      session.resendTemplate(selector),
    )

    // for Nav
    state.events.on('hash', ([hash]: [string]) => state.hash(hash))

    // for Home Page
    state.events.on('width', ([width]: [string]) => state.width(+width))
    state.events.on('bg', ([color]: [string]) => state.background(color))

    // for Booking Page
    state.events.on('booking', ([name, value]: [string, string]) => {
      const booking = S.sample(state.booking)
      Object.assign(booking, { [name]: value })
      state.booking(booking)
    })

    session.sendTemplate(renderApp(state))
    const options = { skipInitialSend: true }
    session.live(renderClock, options)
    session.live(renderMenu, options)
    session.live(() => renderNav(state), options)
    session.live(() => renderHomePage(state), options)
  })
  return session
}
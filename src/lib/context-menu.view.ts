import { Observable, ReplaySubject, Subscription } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { render, VirtualDOM } from '@youwol/flux-view'

export namespace ContextMenu {
    export type Event = 'displayed' | 'removed'

    export abstract class State {
        public readonly content$: Observable<{
            content: VirtualDOM
            event: MouseEvent
        }>
        public readonly event$ = new ReplaySubject<Event>(1)

        protected constructor(
            public readonly triggerEvent$: Observable<MouseEvent>,
        ) {
            this.content$ = triggerEvent$.pipe(
                tap((ev) => ev.preventDefault()),
                map((ev) => {
                    return { content: this.dispatch(ev), event: ev }
                }),
            )
        }

        abstract dispatch(ev: MouseEvent): VirtualDOM
    }

    export class View implements VirtualDOM {
        state: State
        subscriptions = new Array<Subscription>()

        constructor({
            state,
            zIndex,
            ...rest
        }: {
            state: State
            zIndex?: number
            [_key: string]: any
        }) {
            this.state = state
            this.subscriptions.push(
                this.state.content$.subscribe(({ content, event }) => {
                    content.style = {
                        position: 'absolute',
                        left: `${event.clientX - 10}px`,
                        top: `${event.clientY - 10}px`,
                        ...(rest.style || {}),
                    }

                    let wrapped = {
                        style: {
                            position: 'fixed',
                            top: '0px',
                            left: '0px',
                            width: '100vw',
                            height: '100vh',
                            zIndex: zIndex || 10,
                        },
                        children: [content],
                        onclick: () => {
                            this.state.event$.next('removed')
                            div.remove()
                        },
                        oncontextmenu: (ev: MouseEvent) => {
                            this.state.event$.next('removed')
                            div.remove()
                            ev.preventDefault()
                        },
                    }
                    let div = render(wrapped)

                    document.body.appendChild(div)
                    this.state.event$.next('displayed')
                }),
            )
        }
    }
}

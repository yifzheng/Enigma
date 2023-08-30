import Head from 'next/head'
import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: "Enigma",
    description: 'Discover & Share AI Prompts'
}

const RootLayout = ( { children } ) => {
    return (
        <html lang='en'>
            <Head>
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
            </Head>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        { children }
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout
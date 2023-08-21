import { DocsThemeConfig } from 'nextra-theme-docs'
import {useRouter} from "next/router";
import { useConfig } from 'nextra-theme-docs'
import Image from 'next/image'

const config: DocsThemeConfig = {
    logo: () => (
        <>
            <Image
                src="/logo.png"
                width={50}
                height={50}
                alt="Picture of the author"
            />

            <span className="nx-ml-2 nx-text-2xl nx-font-bold"> Fake Store API</span>
        </>
    ),
    project: {
        link: 'https://github.com/denisakp/fake-store-api',
    },
    chat: {
        link: 'https://github.com/denisakp/fake-store-api/discussions',
    },
    docsRepositoryBase: 'https://github.com/denisakp/fake-store-api',
    footer: {
        text: `Fake store API © ${new Date().getUTCFullYear()} - Denis AKPAGNONITE`,
    },
    sidebar: {
        defaultMenuCollapseLevel: 1,
        toggleButton: true
    },
    primaryHue: 275,
    useNextSeoProps() {
        const { asPath } = useRouter()
        if (asPath !== '/') {
            return {
                titleTemplate: '%s – Fake store API'
            }
        }
    },
    head: function useHead() {
        const { title } = useConfig()
        const { route } = useRouter()
        const socialCard =
            route === '/' || !title
                ? 'https://nextra.site/og.jpeg'
                : `https://nextra.site/api/og?title=${title}`

        return (
            <>
                <meta name="msapplication-TileColor" content="#fff" />
                <meta name="theme-color" content="#fff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Language" content="en" />
                <meta
                    name="description"
                    content="Rapid E-commerce Prototyping Made Easy for developers"
                />
                <meta
                    name="og:description"
                    content="Rapid E-commerce Prototyping Made Easy for developers"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={socialCard} />
                <meta name="twitter:site:domain" content="denisakp.me" />
                <meta name="twitter:url" content="https://denisakp.me" />
                <meta
                    name="og:title"
                    content={title ? title + ' – Fake Store API' : 'Fake Store API'}
                />
                <meta name="og:image" content={socialCard} />
                <meta name="apple-mobile-web-app-title" content="Fake Store API" />
                <link rel="icon" href="/logo.png" type="image/svg+xml" />
                <link rel="icon" href="/logo.png" type="image/png" />
            </>
        )
    },
}

export default config

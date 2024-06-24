import { useState } from 'react'

import { initialEmails, Email } from './data/emails'
import { Emails } from './Emails'

import './styles/App.css'
import Header from './Header'
import Sidebar from './Sidebar'

const getReadEmails = (emails: Array<Email>) =>
    emails.filter((email) => !email.read)

const getStarredEmails = (emails: Array<Email>) =>
    emails.filter((email) => email.starred)

export default function App() {
    const [emails, setEmails] = useState<Array<Email>>(initialEmails)
    const [hideRead, setHideRead] = useState<boolean>(false)
    const [currentTab, setCurrentTab] = useState<string>('inbox')
    const [search, setSearch] = useState<string>('')

    const unreadEmails = emails.filter((email) => !email.read)
    const starredEmails = emails.filter((email) => email.starred)

    let filteredEmails = emails

    if (hideRead) filteredEmails = getReadEmails(filteredEmails)

    if (currentTab === 'starred')
        filteredEmails = getStarredEmails(filteredEmails)

    if (search) {
        filteredEmails = filteredEmails.filter((email) =>
            email.title.toLowerCase().includes(search.toLowerCase())
        )
    }
    console.log(search)

    return (
        <div className='app'>
            <Header search={search} setSearch={setSearch} />
            <Sidebar
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                unreadEmails={unreadEmails}
                starredEmails={starredEmails}
                hideRead={hideRead}
                setHideRead={setHideRead}
            />
            <Emails emails={filteredEmails} setEmails={setEmails} />
        </div>
    )
}

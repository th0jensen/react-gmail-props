import * as data from './data/emails'

type EmailsProps = {
    emails: Array<data.Email>
    setEmails: React.Dispatch<React.SetStateAction<Array<data.Email>>>
}

type EmailProps = {
    email: data.Email
    setEmails: React.Dispatch<React.SetStateAction<Array<data.Email>>>
}

export function Emails({ emails, setEmails }: EmailsProps) {
    return (
        <main className='emails'>
            <ul>
                {emails.map((email, index) => (
                    <Email key={index} email={email} setEmails={setEmails} />
                ))}
            </ul>
        </main>
    )
}

function Email({ email, setEmails }: EmailProps) {
    const toggleStar = (targetEmail: data.Email) => {
        const updatedEmails = (emails: Array<data.Email>) =>
            emails.map((email) =>
                email.id === targetEmail.id
                    ? { ...email, starred: !email.starred }
                    : email
            )
        setEmails(updatedEmails)
    }

    const toggleRead = (targetEmail: data.Email) => {
        const updatedEmails = (emails: Array<data.Email>) =>
            emails.map((email) =>
                email.id === targetEmail.id
                    ? { ...email, read: !email.read }
                    : email
            )
        setEmails(updatedEmails)
    }

    return (
        <li className={`email ${email.read ? 'read' : 'unread'}`}>
            <div className='select'>
                <input
                    className='select-checkbox'
                    type='checkbox'
                    checked={email.read}
                    onChange={() => toggleRead(email)}
                />
            </div>
            <div className='star'>
                <input
                    className='star-checkbox'
                    type='checkbox'
                    checked={email.starred}
                    onChange={() => toggleStar(email)}
                />
            </div>
            <div className='sender'>{email.sender}</div>
            <div className='title'>{email.title}</div>
        </li>
    )
}

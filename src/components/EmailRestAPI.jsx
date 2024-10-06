import axios from 'axios';
import React, { useState } from 'react';


const EmailRestAPI = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serviceId = 'service_l1jet6g';
        const templatedId = 'template_uir39r4';
        const publicKey = 'd1E3IXBAglfehQH7j';

        const data = {
            service_id : serviceId,
            template_id: templatedId,
            user_id: publicKey,
            template_params: {
                from_name: name,
                from_email: email,
                to_name: 'Web Wizard',
                message: message,
            }
        };

        try {
            const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
            console.log(res.data);
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='emailForm'>
            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            >
            </textarea>
            <button type="submit">Send Email</button>
        </form>
    </div>
  )
}

export default EmailRestAPI
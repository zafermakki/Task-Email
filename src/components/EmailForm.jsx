import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import { TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';
import Clock from "./Clock"

const EmailForm = () => {
  const [name, setName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendTime, setSendTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_l1jet6g';
    const templatedId = 'template_uir39r4';
    const publicKey = 'd1E3IXBAglfehQH7j';

    const templateParams = {
      from_name: name,
      to_email: toEmail,
      message: message,
    };

    const currentTime = new Date();
    const specifiedTime = new Date(sendTime);

    if (specifiedTime <= currentTime) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The specified time is in the past. Please choose a future time.",
      });
      return;
    }

    const timeDifference = specifiedTime - currentTime;

    Swal.fire({
      icon: "info",
      title: `Email will be sent at ${specifiedTime.toLocaleTimeString()}`,
      showConfirmButton: false,
      timer: 3000
    });

    setTimeout(() => {
      emailjs.send(serviceId, templatedId, templateParams, publicKey)
        .then((response) => {
          console.log("Email sent successfully!", response);
          setName('');
          setToEmail('');
          setMessage('');
          setSendTime('');
          Swal.fire({
            icon: "success",
            title: "Email sent successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((error) => {
          console.log('Error sending email:', error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }, timeDifference);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='emailForm'>
          <TextField
            label="From"
            variant="outlined"
            margin="normal"
            type="text"
            placeholder="from"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="To Email"
            variant="outlined"
            margin="normal"
            type="email"
            placeholder="to Email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            margin="normal"
            cols="30"
            rows="10"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Clock/>
          <TextField
            label="Send Time"
            variant="outlined"
            margin="normal"
            type="datetime-local"
            value={sendTime}
            onChange={(e) => setSendTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant='contained' type="submit">Schedule Email</Button>
      </form>
    </div>

  );
};

export default EmailForm;

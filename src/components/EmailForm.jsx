import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Swal from 'sweetalert2';
import Clock from "./Clock"

const EmailForm = () => {
  const [name, setName] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [timeOption, setTimeOption] = useState('specific'); // 'specific' or 'timer'

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

    if (timeOption === 'specific') {
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
        sendEmail(templateParams);
      }, timeDifference);

    } else if (timeOption === 'timer') {
      // Timer logic including milliseconds
      const totalMilliseconds = 
        (hours * 60 * 60 * 1000) + 
        (minutes * 60 * 1000) + 
        (seconds * 1000) + 
        milliseconds;

      if (totalMilliseconds <= 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please set a valid time for the timer.",
        });
        return;
      }

      Swal.fire({
        icon: "info",
        title: `Email will be sent in ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`,
        showConfirmButton: false,
        timer: 3000
      });

      setTimeout(() => {
        sendEmail(templateParams);
      }, totalMilliseconds);
    }
  };

  const sendEmail = (templateParams) => {
    emailjs.send('service_l1jet6g', 'template_uir39r4', templateParams, 'd1E3IXBAglfehQH7j')
      .then((response) => {
        console.log("Email sent successfully!", response);
        resetForm();
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
  };

  const resetForm = () => {
    setName('');
    setToEmail('');
    setMessage('');
    setSendTime('');
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  // Handle conversion of milliseconds to seconds
  const handleMillisecondsChange = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 1000) {
      const extraSeconds = Math.floor(value / 1000);
      setSeconds(seconds + extraSeconds);
      value = value % 1000;
    }
    setMilliseconds(value);
  };

  // Handle conversion of seconds to minutes and minutes to hours
  const handleMinutesChange = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 60) {
      const extraHours = Math.floor(value / 60);
      setHours(hours + extraHours);
      value = value % 60;
    }
    setMinutes(value);
  };

  const handleSecondsChange = (e) => {
    let value = parseInt(e.target.value);
    if (value >= 60) {
      const extraMinutes = Math.floor(value / 60);
      setMinutes(minutes + extraMinutes);
      value = value % 60;
    }
    setSeconds(value);
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

        {/* Option to choose either a specific time or a timer */}
        <RadioGroup
          row
          value={timeOption}
          onChange={(e) => setTimeOption(e.target.value)}
        >
          <FormControlLabel value="specific" control={<Radio />} label="Specific Time" />
          <FormControlLabel value="timer" control={<Radio />} label="Timer" />
        </RadioGroup>

        {timeOption === 'specific' ? (
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
        ) : (
          <div>
            <TextField
              label="Hours"
              variant="outlined"
              margin="normal"
              type="number"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Minutes"
              variant="outlined"
              margin="normal"
              type="number"
              value={minutes}
              onChange={handleMinutesChange} // Custom logic to handle minutes
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Seconds"
              variant="outlined"
              margin="normal"
              type="number"
              value={seconds}
              onChange={handleSecondsChange} // Custom logic to handle seconds
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Milliseconds"
              variant="outlined"
              margin="normal"
              type="number"
              value={milliseconds}
              onChange={handleMillisecondsChange} // Custom logic to handle milliseconds
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        )}
        <Button variant='contained' type="submit">Schedule Email</Button>
      </form>
    </div>
  );
};

export default EmailForm;

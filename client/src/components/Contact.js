import React from 'react'
const Contact = () => {
  return (
    <>
    <div className="contact-container">
      <div className="contact-info">
        <div className="contact-items">
          <div className="contact-details">
          <i class="zmdi zmdi-phone"></i>
          <div>
          <p>Phone</p>
          <p>+91028373782</p>
          </div>
          </div>
          <div className="contact-details">
          <i class="zmdi zmdi-email"></i>
            <div>
          <p>Email</p>
          <p>saketh1177@gmail.com</p>
          </div>
          </div>
          <div className="contact-details">
          <i class="zmdi zmdi-google-maps"></i>
           <div>
          <p>Phone</p>
          <p>Uppal Hyderabad</p>
          </div>
          </div>
        </div>
      </div>
      <div className="contact-context">
        <h2>Get In Touch</h2>
        <form id="contact-form">
        <input type="text" placeholder='Your name' />
        <input type="text" placeholder='Your Email' />
        <input type="text" placeholder='Your Phone Number' />
        <textarea name="" id="" cols="30" rows="10" placeholder='message'></textarea>
        <button type="submit" className='contact-btn'>Send Message</button>
      </form>
      </div>
    </div>
    </>
  )
}

export default Contact
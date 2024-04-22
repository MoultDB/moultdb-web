import React, { useState } from 'react';
import './get-in-touch.css';

function GetInTouch() {
  // State management for the form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Update form state whenever an input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you might send the data to a server or API endpoint
    console.log(formData);
    alert('Form submitted. Check the console for the form data.');
  };

  return (
    <section className="form5 cid-u64l9crwwN" id="contact-form-3-u64l9crwwN">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 content-head">
            <div className="mbr-section-head mb-5">
              <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Get in Touch with MoultDB</strong>
              </h3>                    
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8 mx-auto mbr-form" data-form-type="formoid">
            <form onSubmit={handleSubmit} className="mbr-form form-with-styler" data-form-title="Form Name">
              <div className="dragArea row">
                <div className="col-md col-sm-12 form-group mb-3">
                  <input type="text" name="name" placeholder="Name" data-form-field="name" className="form-control" value={formData.name} onChange={handleChange} />
                </div>
                <div className="col-md col-sm-12 form-group mb-3">
                  <input type="email" name="email" placeholder="Email" data-form-field="email" className="form-control" value={formData.email} onChange={handleChange} />
                </div>
                <div className="col-12 form-group mb-3">
                  <input type="url" name="phone" placeholder="Phone" data-form-field="url" className="form-control" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="col-12 form-group mb-3">
                  <textarea name="message" placeholder="Message" data-form-field="textarea" className="form-control" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 align-center mbr-section-btn">
                  <button type="submit" className="btn btn-primary display-7">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetInTouch;

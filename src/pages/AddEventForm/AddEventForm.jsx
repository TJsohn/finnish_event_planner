import {useState} from 'react';
import { useNavigate } from "react-router";
import useAxios from "./../../hooks/useAxios";
import styles from "./AddEventForm.module.css";

const AddEventForm = ({onAddEvent}) => {
  const { post } = useAxios();
  const today = new Date().toISOString().split('T')[0];
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    date: today,
    address: '',
    postalCode: '',
    location: 'Helsinki',
    description: '',
    category: 'culture',
    startTime: '',
    endTime: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.date < today) {
      alert("Please select today or a future date.");
      return;
    }

    for (const key in formData) {
      if (!formData[key]) {
        alert(`Please fill in all fields.`);
        return;
      }
    }

    const newEvent = {...formData};

    try {
      const res = await post('http://localhost:3001/events', newEvent);
      onAddEvent(res.data);
      setSuccessMessage('Event added successfully!');
      setTimeout(() => {
        navigate('/events');
      }, 2500); 
    } catch (err) {
      console.error("Error adding event:", err);
    }

    };

  return (
    <>
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.row}>
          <label htmlFor="title">Title</label>
          <input className={styles.inputMedium} type="text" placeholder="Enter event title" value={formData.title} onChange={handleChange} id="title" name="title" required />
        </div>

        <div className={styles.row}>
          <label htmlFor="category">Category</label>
          <select className={styles.inputSmall} value={formData.category} onChange={handleChange} id="category" name="category" required>
            <option value="culture">Culture</option>
            <option value="education">Education</option>
            <option value="sport">Sport</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div className={styles.row}>
          <label htmlFor="startDate">Start Date</label>
          <input className={styles.inputSmall} type="date" value={formData.startDate} onChange={handleChange} id="startDate" name="startDate" required />
          <label htmlFor="endDate">End Date</label>
          <input className={styles.inputSmall} type="date" value={formData.endDate} onChange={handleChange} id="endDate" name="endDate" min={formData.startDate} required />
        </div>

        <div className={styles.row}>
          <label htmlFor="startTime">Start Time</label>
          <input className={styles.inputSmall} type="time" value={formData.startTime} onChange={handleChange} id="startTime" name="startTime" required />
          <label htmlFor="endTime">End Time</label>
          <input className={styles.inputSmall} type="time" value={formData.endTime} onChange={handleChange} id="endTime" name="endTime" required />
        </div>

        <div className={styles.row}>
          <label htmlFor="address">Address</label>
          <input className={styles.inputMedium} type="text" placeholder='Enter street address (e.g., Mannerheimintie 20)' value={formData.address} onChange={handleChange} id="address" name="address" required/>
        </div>

        <div className={styles.row}>
          <label htmlFor="postalCode">Postal Code</label>
          <input className={styles.inputSmall} type="text" placeholder='Enter postal code (e.g., 00100)' value={formData.postalCode} onChange={handleChange} id="postalCode" name="postalCode" required />
        </div>

        <div className={styles.row}>
          <label htmlFor="location">City</label>
          <select className={styles.inputSmall} value={formData.location} onChange={handleChange} id="location" name="location" required>
            <option value="Helsinki">Helsinki</option>
            <option value="Espoo">Espoo</option>
            <option value="Vantaa">Vantaa</option>
          </select>
        </div>

        <div className={styles.row}>
          <label htmlFor="description">Description</label>
          <textarea className={styles.inputLarge} type="text" placeholder="Enter description of event" rows={30} value={formData.description} onChange={handleChange} id="description" name="description" required />
        </div>

          <label htmlFor="imageUrl">Event Image</label>
          <input className={styles.inputMedium} type="url" placeholder='Enter image URL (e.g., https://example.com/image.jpg)' value={formData.imageUrl} onChange={handleChange} id="imageUrl" name="imageUrl" />
          
          <button className={styles.submitBtn}>Add Event</button>
          {successMessage && (
            <div className={styles.successMessage}>{successMessage}</div>
          )}
      </form>
        </div>
    </>
  );
};

export default AddEventForm;
